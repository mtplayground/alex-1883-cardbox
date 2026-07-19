import { describe, expect, it } from 'vitest';

import { themeColorChannels, themeCssVariables, themeTokens } from './tokens';

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

describe('design tokens', () => {
  it('keeps accent references routed through the token layer', () => {
    expect(themeTokens.colors.accent).toBe(`var(${themeCssVariables.accent})`);
    expect(themeTokens.classNames).toEqual({
      unreadIndicator: 'accent-unread-indicator',
      composeAction: 'accent-compose-action',
      senderHighlight: 'accent-sender-highlight',
    });
  });

  it('keeps basic AA contrast for accent and neutral text pairings', () => {
    expect(
      contrastRatio(
        themeColorChannels.accent,
        themeColorChannels.neutralSurface,
      ),
    ).toBeGreaterThanOrEqual(4.5);
    expect(
      contrastRatio(themeColorChannels.accent, themeColorChannels.neutralBase),
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
  });
});
