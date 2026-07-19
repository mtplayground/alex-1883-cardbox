import type { ChangeEvent, FormEvent } from 'react';
import { useState } from 'react';

import { interactionStore, useInteractionStore } from '../store';
import type { DraftMessage } from '../store';

type ComposePanelProps = {
  onClose: () => void;
};

type DraftFieldName = keyof DraftMessage;

export function ComposePanel({ onClose }: ComposePanelProps) {
  const { draft, localMessages } = useInteractionStore();
  const [filedSubject, setFiledSubject] = useState<string | null>(null);

  function handleDraftChange(
    fieldName: DraftFieldName,
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    interactionStore.updateDraft({
      [fieldName]: event.target.value,
    });
    setFiledSubject(null);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const filedMessage = interactionStore.fileDraft();

    if (filedMessage) {
      setFiledSubject(filedMessage.subject);
    }
  }

  return (
    <section
      className="compose-panel"
      id="compose-panel"
      aria-labelledby="compose-title"
    >
      <div className="compose-panel__header">
        <div>
          <p className="compose-panel__eyebrow">Local draft</p>
          <h3 id="compose-title" className="compose-panel__title">
            Compose message
          </h3>
        </div>
        <button
          className="compose-panel__close"
          type="button"
          onClick={onClose}
        >
          Close
        </button>
      </div>

      <form className="compose-form" onSubmit={handleSubmit}>
        <label className="compose-field">
          <span>To</span>
          <input
            name="to"
            type="text"
            value={draft.to}
            onChange={(event) => handleDraftChange('to', event)}
            required
          />
        </label>

        <label className="compose-field">
          <span>Subject</span>
          <input
            name="subject"
            type="text"
            value={draft.subject}
            onChange={(event) => handleDraftChange('subject', event)}
            required
          />
        </label>

        <label className="compose-field">
          <span>Body</span>
          <textarea
            name="body"
            rows={7}
            value={draft.body}
            onChange={(event) => handleDraftChange('body', event)}
            required
          />
        </label>

        <div className="compose-form__footer">
          <p className="compose-form__status" role="status">
            {filedSubject
              ? `Filed locally: ${filedSubject}`
              : `${localMessages.length} filed locally`}
          </p>
          <button className="compose-form__submit" type="submit">
            File locally
          </button>
        </div>
      </form>
    </section>
  );
}
