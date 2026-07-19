import { themeTokens } from '../styles/tokens';

type UnreadIndicatorProps = {
  read: boolean;
};

export function UnreadIndicator({ read }: UnreadIndicatorProps) {
  return (
    <span
      aria-hidden="true"
      className={[
        'message-card__unread-indicator',
        read
          ? 'message-card__unread-indicator--read'
          : themeTokens.classNames.unreadIndicator,
      ]
        .filter(Boolean)
        .join(' ')}
    />
  );
}
