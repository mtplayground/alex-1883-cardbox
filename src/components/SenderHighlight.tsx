import { themeTokens } from '../styles/tokens';
import type { MessageSender } from '../types';

type SenderHighlightProps = {
  sender: MessageSender;
  unread: boolean;
};

export function SenderHighlight({ sender, unread }: SenderHighlightProps) {
  return (
    <span
      className={[
        'message-card__sender',
        unread ? themeTokens.classNames.senderHighlight : '',
      ]
        .filter(Boolean)
        .join(' ')}
      title={sender.email}
    >
      {sender.name}
    </span>
  );
}
