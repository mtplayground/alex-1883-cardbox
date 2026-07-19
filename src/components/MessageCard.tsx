import type { KeyboardEvent } from 'react';

import type { Message, MessageId } from '../types';
import { formatMessageTimestamp } from './messageFormatting';
import { SenderHighlight } from './SenderHighlight';
import { UnreadIndicator } from './UnreadIndicator';

type MessageCardProps = {
  message: Message;
  selected?: boolean;
  onSelect?: (messageId: MessageId) => void;
};

export function MessageCard({
  message,
  selected = false,
  onSelect,
}: MessageCardProps) {
  const unread = !message.read;
  const isInteractive = Boolean(onSelect);

  function handleSelect() {
    onSelect?.(message.id);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLElement>) {
    if (!isInteractive) {
      return;
    }

    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleSelect();
    }
  }

  return (
    <article
      aria-current={selected ? 'true' : undefined}
      className={[
        'message-card',
        unread ? 'message-card--unread' : '',
        selected ? 'message-card--selected' : '',
        isInteractive ? 'message-card--interactive' : '',
      ]
        .filter(Boolean)
        .join(' ')}
      onClick={isInteractive ? handleSelect : undefined}
      onKeyDown={handleKeyDown}
      role={isInteractive ? 'button' : undefined}
      tabIndex={isInteractive ? 0 : undefined}
    >
      <UnreadIndicator read={message.read} />
      <div className="message-card__content">
        <div className="message-card__meta">
          <SenderHighlight sender={message.sender} unread={unread} />
          <time className="message-card__time" dateTime={message.timestamp}>
            {formatMessageTimestamp(message.timestamp)}
          </time>
        </div>
        <h2 className="message-card__subject">{message.subject}</h2>
        <p className="message-card__snippet">{message.snippet}</p>
      </div>
    </article>
  );
}
