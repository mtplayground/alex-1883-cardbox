import { describe, expect, it } from 'vitest';

import {
  appBackgroundGradient,
  themeColorChannels,
  themeCssVariables,
  themeTokens,
} from './tokens';

type RgbTuple = readonly [number, number, number];

function relativeLuminance([red, green, blue]: RgbTuple): number {
  const [r, g, b] = [red, green, blue].map((channel) => {
    const normalized = channel / 255;

    return normalized <= 0.03928
      ? normalized / 12.92
      : ((normalized + 0.055) / 1.055) ** 2.4;
  });

  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function contrastRatio(foreground: RgbTuple, background: RgbTuple): number {
  const foregroundLuminance = relativeLuminance(foreground);
  const backgroundLuminance = relativeLuminance(background);
  const lighter = Math.max(foregroundLuminance, backgroundLuminance);
  const darker = Math.min(foregroundLuminance, backgroundLuminance);

  return (lighter + 0.05) / (darker + 0.05);
}

function blendRgb(
  foreground: RgbTuple,
  background: RgbTuple,
  alpha: number,
): RgbTuple {
  return foreground.map((channel, index) =>
    Math.round(channel * alpha + background[index] * (1 - alpha)),
  ) as [number, number, number];
}

describe('design tokens', () => {
  it('keeps accent references routed through the token layer', () => {
    expect(themeTokens.colors.accent).toBe(`var(${themeCssVariables.accent})`);
    expect(themeTokens.classNames).toEqual({
      unreadIndicator: 'accent-unread-indicator',
      composeAction: 'accent-compose-action',
      senderHighlight: 'accent-sender-highlight',
    });
  });

  it('defines the app background as a bold multi-color mesh', () => {
    expect(appBackgroundGradient.meshStops).toHaveLength(5);
    expect(
      new Set(appBackgroundGradient.meshStops.map((stop) => stop.join(',')))
        .size,
    ).toBe(appBackgroundGradient.meshStops.length);
    expect(themeTokens.colors.gradientPlum).toBe(
      `var(${themeCssVariables.gradientPlum})`,
    );
    expect(themeTokens.colors.gradientCyan).toBe(
      `var(${themeCssVariables.gradientCyan})`,
    );
    expect(themeTokens.colors.gradientCoral).toBe(
      `var(${themeCssVariables.gradientCoral})`,
    );
    expect(themeTokens.colors.gradientGold).toBe(
      `var(${themeCssVariables.gradientGold})`,
    );
    expect(themeTokens.colors.gradientAzure).toBe(
      `var(${themeCssVariables.gradientAzure})`,
    );
  });

  it('keeps basic AA contrast for accent and neutral text pairings', () => {
    expect(
      contrastRatio(
        themeColorChannels.accent,
        themeColorChannels.neutralSurface,
      ),
    ).toBeGreaterThanOrEqual(4.5);
    expect(
      contrastRatio(
        themeColorChannels.accentForeground,
        themeColorChannels.accent,
      ),
    ).toBeGreaterThanOrEqual(4.5);
    expect(
      contrastRatio(
        themeColorChannels.neutralMuted,
        themeColorChannels.neutralSurface,
      ),
    ).toBeGreaterThanOrEqual(4.5);
    expect(
      contrastRatio(
        themeColorChannels.neutralInk,
        themeColorChannels.neutralSurface,
      ),
    ).toBeGreaterThanOrEqual(4.5);
  });

  it('keeps app text and accent readable over the gradient scrim', () => {
    for (const meshStop of appBackgroundGradient.meshStops) {
      const scrimmedStop = blendRgb(
        themeColorChannels.backgroundScrim,
        meshStop,
        appBackgroundGradient.scrimOpacity,
      );

      expect(
        contrastRatio(themeColorChannels.neutralInk, scrimmedStop),
      ).toBeGreaterThanOrEqual(4.5);
      expect(
        contrastRatio(themeColorChannels.accent, scrimmedStop),
      ).toBeGreaterThanOrEqual(4.5);
    }
  });
});
