export const themeTokens = {
  colors: {
    neutralBase: 'var(--color-neutral-base)',
    neutralSurface: 'var(--color-neutral-surface)',
    neutralBorder: 'var(--color-neutral-border)',
    neutralMuted: 'var(--color-neutral-muted)',
    neutralInk: 'var(--color-neutral-ink)',
    accent: 'var(--color-accent)',
    accentForeground: 'var(--color-accent-foreground)',
  },
  classNames: {
    unreadIndicator: 'accent-unread-indicator',
    composeAction: 'accent-compose-action',
    senderHighlight: 'accent-sender-highlight',
  },
} as const;

export type ThemeTokenName = keyof typeof themeTokens.colors;
export type ThemeClassName = keyof typeof themeTokens.classNames;
