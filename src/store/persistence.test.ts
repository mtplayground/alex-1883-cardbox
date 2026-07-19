import { describe, expect, it } from 'vitest';

import {
  INTERACTION_STORAGE_KEY,
  loadInteractionState,
  saveInteractionState,
} from './persistence';
import { MemoryStorage } from './storageTestUtils';

describe('interaction persistence', () => {
  it('saves and restores draft state', () => {
    const storage = new MemoryStorage();
    const draft = {
      to: 'mara.chen@example.com',
      subject: 'Draft subject',
      body: 'Draft body',
    };

    saveInteractionState(
      {
        readById: {},
        draft,
        localMessages: [],
      },
      storage,
    );

    expect(loadInteractionState(storage)?.draft).toEqual(draft);
  });

  it('falls back when stored JSON is malformed', () => {
    const storage = new MemoryStorage();

    storage.setItem(INTERACTION_STORAGE_KEY, '{bad json');

    expect(loadInteractionState(storage)).toBeNull();
  });

  it('falls back when the storage schema is invalid', () => {
    const storage = new MemoryStorage();

    storage.setItem(
      INTERACTION_STORAGE_KEY,
      JSON.stringify({
        version: 1,
        readById: { 'msg-001': 'yes' },
        draft: { to: 'a', subject: 'b', body: 'c' },
      }),
    );

    expect(loadInteractionState(storage)).toBeNull();
  });
});
