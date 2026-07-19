export type MessageId = string;

export type MessageSender = {
  name: string;
  email: string;
};

export type Message = {
  id: MessageId;
  sender: MessageSender;
  subject: string;
  snippet: string;
  body: string;
  timestamp: string;
  read: boolean;
};
