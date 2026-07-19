import type { Message, MessageId } from '../types';

export type DraftMessage = {
  to: string;
  subject: string;
  body: string;
};

export type ReadStateById = Partial<Record<MessageId, boolean>>;

export type InteractionState = {
  messages: Message[];
  selectedMessageId: MessageId | null;
  draft: DraftMessage;
};

export type InteractionSnapshot = InteractionState & {
  selectedMessage: Message | null;
  unreadCount: number;
};

export type InteractionStore = {
  getSnapshot: () => InteractionSnapshot;
  subscribe: (listener: () => void) => () => void;
  selectMessage: (messageId: MessageId) => void;
  clearSelection: () => void;
  markMessageRead: (messageId: MessageId, read?: boolean) => void;
  toggleMessageRead: (messageId: MessageId) => void;
  updateDraft: (draft: Partial<DraftMessage>) => void;
  replaceDraft: (draft: DraftMessage) => void;
  clearDraft: () => void;
};
