import { afterEach, describe, expect, it, vi } from 'vitest';

import { seedMessages } from '../fixtures';
import {
  INTERACTION_STORAGE_KEY,
  type PersistedInteractionState,
} from './persistence';
import { MemoryStorage } from './storageTestUtils';

async function loadStore(storage: MemoryStorage) {
  vi.resetModules();
  vi.stubGlobal('window', { localStorage: storage });

  return import('./index');
}

function parseStoredState(storage: MemoryStorage): PersistedInteractionState {
  const storedValue = storage.getItem(INTERACTION_STORAGE_KEY);

  if (!storedValue) {
    throw new Error('Expected interaction state to be persisted.');
  }

  return JSON.parse(storedValue) as PersistedInteractionState;
}

describe('interaction store', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
    vi.resetModules();
  });

  it('toggles read and unread state and persists the change', async () => {
    const storage = new MemoryStorage();
    const { interactionStore } = await loadStore(storage);
    const messageId = seedMessages[0].id;

    expect(
      interactionStore
        .getSnapshot()
        .messages.find((message) => message.id === messageId)?.read,
    ).toBe(false);

    interactionStore.toggleMessageRead(messageId);

    expect(
      interactionStore
        .getSnapshot()
        .messages.find((message) => message.id === messageId)?.read,
    ).toBe(true);
    expect(parseStoredState(storage).readById[messageId]).toBe(true);

    interactionStore.toggleMessageRead(messageId);

    expect(
      interactionStore
        .getSnapshot()
        .messages.find((message) => message.id === messageId)?.read,
    ).toBe(false);
    expect(parseStoredState(storage).readById[messageId]).toBe(false);
  });

  it('hydrates read state and draft from local storage', async () => {
    const storage = new MemoryStorage();
    const messageId = seedMessages[0].id;
    const draft = {
      to: 'nina.alvarez@example.com',
      subject: 'Hydrated draft',
      body: 'This draft was restored from storage.',
    };

    storage.setItem(
      INTERACTION_STORAGE_KEY,
      JSON.stringify({
        version: 1,
        readById: { [messageId]: true },
        draft,
        localMessages: [],
      }),
    );

    const { interactionStore } = await loadStore(storage);
    const snapshot = interactionStore.getSnapshot();

    expect(
      snapshot.messages.find((message) => message.id === messageId)?.read,
    ).toBe(true);
    expect(snapshot.draft).toEqual(draft);
  });

  it('falls back to seed messages and an empty draft when hydration fails', async () => {
    const storage = new MemoryStorage();
    const messageId = seedMessages[0].id;

    storage.setItem(INTERACTION_STORAGE_KEY, '{bad json');

    const { interactionStore } = await loadStore(storage);
    const snapshot = interactionStore.getSnapshot();

    expect(
      snapshot.messages.find((message) => message.id === messageId)?.read,
    ).toBe(seedMessages[0].read);
    expect(snapshot.draft).toEqual({
      to: '',
      subject: '',
      body: '',
    });
  });
});
