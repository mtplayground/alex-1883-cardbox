import { MessageCard } from '../components';
import { interactionStore, useInteractionStore } from '../store';
import type { MessageId } from '../types';

export function InboxView() {
  const { messages, selectedMessageId, unreadCount } = useInteractionStore();
  const totalCount = messages.length;

  function handleOpenMessage(messageId: MessageId) {
    interactionStore.markMessageRead(messageId, true);
    interactionStore.selectMessage(messageId);
  }

  return (
    <section className="inbox-view" aria-labelledby="inbox-title">
      <div className="inbox-view__header">
        <div>
          <p className="inbox-view__eyebrow">Inbox</p>
          <h2 id="inbox-title" className="inbox-view__title">
            Messages
          </h2>
        </div>
        <div className="inbox-view__summary" aria-label="Inbox summary">
          <span className="inbox-count-pill">{totalCount} total</span>
          <span className="inbox-count-pill">{unreadCount} unread</span>
        </div>
      </div>

      {totalCount === 0 ? (
        <div className="inbox-state" role="status">
          <h3>No messages</h3>
          <p>
            New messages will appear here when local inbox data is available.
          </p>
        </div>
      ) : (
        <>
          {unreadCount === 0 ? (
            <div className="inbox-state inbox-state--compact" role="status">
              <p>All messages are read.</p>
            </div>
          ) : null}

          <div className="inbox-list" role="list" aria-label="Inbox messages">
            {messages.map((message) => (
              <div key={message.id} role="listitem">
                <MessageCard
                  message={message}
                  selected={message.id === selectedMessageId}
                  onSelect={handleOpenMessage}
                />
              </div>
            ))}
          </div>
        </>
      )}
    </section>
  );
}
