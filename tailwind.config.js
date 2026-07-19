/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  safelist: [
    'bg-neutral-base',
    'bg-neutral-surface',
    'border-neutral-border',
    'text-neutral-ink',
    'text-neutral-muted',
    'bg-accent',
    'text-accent',
    'text-accent-foreground',
    'hover:bg-accent/90',
    'focus-visible:outline-accent',
  ],
  theme: {
    extend: {
      colors: {
        neutral: {
          base: 'rgb(var(--color-neutral-base) / <alpha-value>)',
          surface: 'rgb(var(--color-neutral-surface) / <alpha-value>)',
          border: 'rgb(var(--color-neutral-border) / <alpha-value>)',
          muted: 'rgb(var(--color-neutral-muted) / <alpha-value>)',
          ink: 'rgb(var(--color-neutral-ink) / <alpha-value>)',
        },
        accent: {
          DEFAULT: 'rgb(var(--color-accent) / <alpha-value>)',
          foreground: 'rgb(var(--color-accent-foreground) / <alpha-value>)',
        },
      },
      boxShadow: {
        surface: '0 18px 48px rgb(var(--color-neutral-ink) / 0.08)',
      },
    },
  },
  plugins: [],
};
