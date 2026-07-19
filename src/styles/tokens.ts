export const themeColorChannels = {
  neutralBase: [239, 246, 255],
  neutralSurface: [255, 253, 248],
  neutralBorder: [221, 215, 205],
  neutralMuted: [107, 98, 87],
  neutralInk: [30, 28, 24],
  accent: [31, 111, 97],
  accentForeground: [255, 255, 255],
  gradientPlum: [147, 92, 246],
  gradientCyan: [34, 211, 238],
  gradientCoral: [251, 113, 133],
  gradientGold: [250, 204, 21],
  gradientAzure: [37, 99, 235],
  backgroundScrim: [255, 253, 248],
} as const;

export const appBackgroundGradient = {
  scrimOpacity: 0.84,
  meshStops: [
    themeColorChannels.gradientPlum,
    themeColorChannels.gradientCyan,
    themeColorChannels.gradientCoral,
    themeColorChannels.gradientGold,
    themeColorChannels.gradientAzure,
  ],
} as const;

export const themeCssVariables = {
  neutralBase: '--color-neutral-base',
  neutralSurface: '--color-neutral-surface',
  neutralBorder: '--color-neutral-border',
  neutralMuted: '--color-neutral-muted',
  neutralInk: '--color-neutral-ink',
  accent: '--color-accent',
  accentForeground: '--color-accent-foreground',
  gradientPlum: '--color-gradient-plum',
  gradientCyan: '--color-gradient-cyan',
  gradientCoral: '--color-gradient-coral',
  gradientGold: '--color-gradient-gold',
  gradientAzure: '--color-gradient-azure',
  backgroundScrim: '--color-background-scrim',
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
    gradientPlum: `var(${themeCssVariables.gradientPlum})`,
    gradientCyan: `var(${themeCssVariables.gradientCyan})`,
    gradientCoral: `var(${themeCssVariables.gradientCoral})`,
    gradientGold: `var(${themeCssVariables.gradientGold})`,
    gradientAzure: `var(${themeCssVariables.gradientAzure})`,
    backgroundScrim: `var(${themeCssVariables.backgroundScrim})`,
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
