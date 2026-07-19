import { formatMessageTimestamp } from '../components';
import { interactionStore, useInteractionStore } from '../store';

export function ReaderView() {
  const { selectedMessage } = useInteractionStore();

  if (!selectedMessage) {
    return null;
  }

  const bodyParagraphs = selectedMessage.body
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);

  return (
    <article className="reader-view" aria-labelledby="reader-title">
      <button
        className="reader-back-button"
        type="button"
        onClick={interactionStore.clearSelection}
      >
        Back to inbox
      </button>

      <div className="reader-panel">
        <header className="reader-header">
          <div>
            <p className="reader-eyebrow">From {selectedMessage.sender.name}</p>
            <h2 id="reader-title" className="reader-title">
              {selectedMessage.subject}
            </h2>
          </div>
          <time className="reader-time" dateTime={selectedMessage.timestamp}>
            {formatMessageTimestamp(selectedMessage.timestamp)}
          </time>
        </header>

        <p className="reader-address">{selectedMessage.sender.email}</p>

        <div className="reader-body">
          {bodyParagraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </div>
    </article>
  );
}
