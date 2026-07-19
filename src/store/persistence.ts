import type { DraftMessage, ReadStateById } from './types';

type BrowserStorage = Pick<Storage, 'getItem' | 'setItem' | 'removeItem'>;

const STORAGE_KEY = 'interaction-store:v1';
const STORAGE_VERSION = 1;

export const emptyDraft: DraftMessage = {
  to: '',
  subject: '',
  body: '',
};

export type PersistedInteractionState = {
  version: typeof STORAGE_VERSION;
  readById: ReadStateById;
  draft: DraftMessage;
};

export function getBrowserStorage(): BrowserStorage | null {
  if (typeof window === 'undefined') {
    return null;
  }

  try {
    return window.localStorage;
  } catch {
    return null;
  }
}

export function loadInteractionState(
  storage: BrowserStorage | null = getBrowserStorage(),
): PersistedInteractionState | null {
  if (!storage) {
    return null;
  }

  try {
    const rawValue = storage.getItem(STORAGE_KEY);

    if (!rawValue) {
      return null;
    }

    const parsedValue: unknown = JSON.parse(rawValue);

    if (!isPersistedInteractionState(parsedValue)) {
      return null;
    }

    return parsedValue;
  } catch {
    return null;
  }
}

export function saveInteractionState(
  state: Omit<PersistedInteractionState, 'version'>,
  storage: BrowserStorage | null = getBrowserStorage(),
): void {
  if (!storage) {
    return;
  }

  try {
    storage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        version: STORAGE_VERSION,
        readById: state.readById,
        draft: state.draft,
      }),
    );
  } catch {
    return;
  }
}

export function clearInteractionState(
  storage: BrowserStorage | null = getBrowserStorage(),
): void {
  if (!storage) {
    return;
  }

  try {
    storage.removeItem(STORAGE_KEY);
  } catch {
    return;
  }
}

function isPersistedInteractionState(
  value: unknown,
): value is PersistedInteractionState {
  if (!isObjectRecord(value)) {
    return false;
  }

  return (
    value.version === STORAGE_VERSION &&
    isReadStateById(value.readById) &&
    isDraftMessage(value.draft)
  );
}

function isReadStateById(value: unknown): value is ReadStateById {
  if (!isObjectRecord(value)) {
    return false;
  }

  return Object.values(value).every(
    (readState) => typeof readState === 'boolean',
  );
}

function isDraftMessage(value: unknown): value is DraftMessage {
  return (
    isObjectRecord(value) &&
    typeof value.to === 'string' &&
    typeof value.subject === 'string' &&
    typeof value.body === 'string'
  );
}

function isObjectRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}
