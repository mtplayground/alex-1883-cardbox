import type { Message } from '../types';

export const seedMessages = [
  {
    id: 'msg-001',
    sender: {
      name: 'Mara Chen',
      email: 'mara.chen@example.com',
    },
    subject: 'Design review notes for the card list',
    snippet:
      'I tightened the spacing notes and called out the empty-state copy for the inbox pass.',
    body: [
      'I tightened the spacing notes and called out the empty-state copy for the inbox pass.',
      'The main thing to keep intact is the calm card rhythm: clear sender, readable subject, short supporting text, and an unread mark that feels intentional instead of noisy.',
      'If the list gets long, the timestamp can stay compact. The sender line should still be the fastest thing to scan.',
    ].join('\n\n'),
    timestamp: '2026-07-18T14:35:00.000Z',
    read: false,
  },
  {
    id: 'msg-002',
    sender: {
      name: 'Owen Patel',
      email: 'owen.patel@example.com',
    },
    subject: 'Local-only compose behavior',
    snippet:
      'Confirmed that sent messages can stay in browser state for the first release.',
    body: [
      'Confirmed that sent messages can stay in browser state for the first release.',
      'There is no mail transport behind this project, so the compose flow should feel complete without pretending to send anything externally. Filing the item into local state is enough for the concept.',
      'Draft recovery matters more than delivery simulation here. Losing half-written content would be the roughest edge.',
    ].join('\n\n'),
    timestamp: '2026-07-18T11:12:00.000Z',
    read: true,
  },
  {
    id: 'msg-003',
    sender: {
      name: 'Nina Alvarez',
      email: 'nina.alvarez@example.com',
    },
    subject: 'Fixture tone pass',
    snippet:
      'The seed inbox should feel self-contained, practical, and specific enough to test reader layouts.',
    body: [
      'The seed inbox should feel self-contained, practical, and specific enough to test reader layouts.',
      'A mix of unread and read messages will make the first pass of the card UI easier to judge. At least one longer body is useful for the reader view so we can see line height and max width under real content.',
      'None of the fixtures need to map to a live service. They just need stable ids and believable timestamps.',
    ].join('\n\n'),
    timestamp: '2026-07-17T20:48:00.000Z',
    read: false,
  },
  {
    id: 'msg-004',
    sender: {
      name: 'Theo Martin',
      email: 'theo.martin@example.com',
    },
    subject: 'Persistence edge cases',
    snippet:
      'Malformed local-storage payloads should fall back to these fixtures without breaking the app shell.',
    body: [
      'Malformed local-storage payloads should fall back to these fixtures without breaking the app shell.',
      'When the store lands, the hydrate path should treat fixtures as the source of truth for initial content and only layer user interaction state on top. That keeps seed content updates from being blocked by old browser data.',
      'This fixture set should be stable enough for unit tests and the later end-to-end flow.',
    ].join('\n\n'),
    timestamp: '2026-07-16T16:05:00.000Z',
    read: true,
  },
] satisfies Message[];

export type { Message };
