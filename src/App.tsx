import { AppShell } from './components/AppShell';
import { useInteractionStore } from './store';
import { InboxView, ReaderView } from './views';

export default function App() {
  const { selectedMessage } = useInteractionStore();

  return (
    <AppShell>{selectedMessage ? <ReaderView /> : <InboxView />}</AppShell>
  );
}
