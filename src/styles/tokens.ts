export const themeColorChannels = {
  neutralBase: [247, 245, 240],
  neutralSurface: [255, 253, 248],
  neutralBorder: [221, 215, 205],
  neutralMuted: [107, 98, 87],
  neutralInk: [30, 28, 24],
  accent: [31, 111, 97],
  accentForeground: [255, 255, 255],
} as const;

export const themeCssVariables = {
  neutralBase: '--color-neutral-base',
  neutralSurface: '--color-neutral-surface',
  neutralBorder: '--color-neutral-border',
  neutralMuted: '--color-neutral-muted',
  neutralInk: '--color-neutral-ink',
  accent: '--color-accent',
  accentForeground: '--color-accent-foreground',
} as const;

export const themeTokens = {
  colors: {
    neutralBase: `var(${themeCssVariables.neutralBase})`,
    neutralSurface: `var(${themeCssVariables.neutralSurface})`,
    neutralBorder: `var(${themeCssVariables.neutralBorder})`,
    neutralMuted: `var(${themeCssVariables.neutralMuted})`,
    neutralInk: `var(${themeCssVariables.neutralInk})`,
    accent: `var(${themeCssVariables.accent})`,
    accentForeground: `var(${themeCssVariables.accentForeground})`,
  },
  classNames: {
    unreadIndicator: 'accent-unread-indicator',
    composeAction: 'accent-compose-action',
    senderHighlight: 'accent-sender-highlight',
  },
} as const;

export type ThemeColorName = keyof typeof themeColorChannels;
export type ThemeTokenName = keyof typeof themeTokens.colors;
export type ThemeClassName = keyof typeof themeTokens.classNames;
