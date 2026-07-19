import { useSyncExternalStore } from 'react';

import { seedMessages } from '../fixtures';
import type { Message } from '../types';
import {
  emptyDraft,
  loadInteractionState,
  saveInteractionState,
} from './persistence';
import type {
  DraftMessage,
  InteractionSnapshot,
  InteractionState,
  InteractionStore,
  LocalMessage,
  ReadStateById,
} from './types';

function createInitialState(): InteractionState {
  const persistedState = loadInteractionState();
  const readById = persistedState?.readById ?? {};

  return {
    messages: applyReadState(seedMessages, readById),
    selectedMessageId: null,
    draft: persistedState?.draft ?? emptyDraft,
    localMessages: persistedState?.localMessages ?? [],
  };
}

function applyReadState(
  messages: Message[],
  readById: ReadStateById,
): Message[] {
  return messages.map((message) => ({
    ...message,
    read: readById[message.id] ?? message.read,
  }));
}

function getReadStateById(messages: Message[]): ReadStateById {
  return Object.fromEntries(
    messages.map((message) => [message.id, message.read]),
  ) satisfies ReadStateById;
}

function createSnapshot(state: InteractionState): InteractionSnapshot {
  const selectedMessage =
    state.messages.find((message) => message.id === state.selectedMessageId) ??
    null;

  return {
    ...state,
    selectedMessage,
    unreadCount: state.messages.filter((message) => !message.read).length,
  };
}

function persistState(state: InteractionState): void {
  saveInteractionState({
    readById: getReadStateById(state.messages),
    draft: state.draft,
    localMessages: state.localMessages,
  });
}

function createLocalMessage(draft: DraftMessage): LocalMessage | null {
  const to = draft.to.trim();
  const subject = draft.subject.trim();
  const body = draft.body.trim();

  if (!to || !subject || !body) {
    return null;
  }

  return {
    id: createLocalMessageId(),
    to,
    subject,
    body,
    snippet: body.length > 140 ? `${body.slice(0, 137).trim()}...` : body,
    timestamp: new Date().toISOString(),
  };
}

function createLocalMessageId(): string {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return `local-${crypto.randomUUID()}`;
  }

  return `local-${Date.now().toString(36)}-${Math.random()
    .toString(36)
    .slice(2)}`;
}

function createInteractionStore(): InteractionStore {
  let state = createInitialState();
  let snapshot = createSnapshot(state);
  const listeners = new Set<() => void>();

  function emit(nextState: InteractionState, persist = false): void {
    state = nextState;
    snapshot = createSnapshot(state);

    if (persist) {
      persistState(state);
    }

    listeners.forEach((listener) => listener());
  }

  return {
    getSnapshot: () => snapshot,
    subscribe: (listener) => {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
    selectMessage: (messageId) => {
      if (!state.messages.some((message) => message.id === messageId)) {
        return;
      }

      emit({
        ...state,
        selectedMessageId: messageId,
      });
    },
    clearSelection: () => {
      emit({
        ...state,
        selectedMessageId: null,
      });
    },
    markMessageRead: (messageId, read = true) => {
      if (!state.messages.some((message) => message.id === messageId)) {
        return;
      }

      emit(
        {
          ...state,
          messages: state.messages.map((message) =>
            message.id === messageId ? { ...message, read } : message,
          ),
        },
        true,
      );
    },
    toggleMessageRead: (messageId) => {
      const targetMessage = state.messages.find(
        (message) => message.id === messageId,
      );

      if (!targetMessage) {
        return;
      }

      emit(
        {
          ...state,
          messages: state.messages.map((message) =>
            message.id === messageId
              ? { ...message, read: !targetMessage.read }
              : message,
          ),
        },
        true,
      );
    },
    updateDraft: (draft) => {
      emit(
        {
          ...state,
          draft: {
            ...state.draft,
            ...draft,
          },
        },
        true,
      );
    },
    replaceDraft: (draft) => {
      emit(
        {
          ...state,
          draft,
        },
        true,
      );
    },
    clearDraft: () => {
      emit(
        {
          ...state,
          draft: emptyDraft,
        },
        true,
      );
    },
    fileDraft: () => {
      const localMessage = createLocalMessage(state.draft);

      if (!localMessage) {
        return null;
      }

      emit(
        {
          ...state,
          draft: emptyDraft,
          localMessages: [localMessage, ...state.localMessages],
        },
        true,
      );

      return localMessage;
    },
  };
}

export const interactionStore = createInteractionStore();

export function useInteractionStore(): InteractionSnapshot {
  return useSyncExternalStore(
    interactionStore.subscribe,
    interactionStore.getSnapshot,
    interactionStore.getSnapshot,
  );
}

export type {
  DraftMessage,
  InteractionSnapshot,
  InteractionState,
  InteractionStore,
  LocalMessage,
};
