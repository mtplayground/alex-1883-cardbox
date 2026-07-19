import type { ReactNode } from 'react';

type AppShellProps = {
  children: ReactNode;
};

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="app-shell">
      <header className="app-header" aria-label="Application header">
        <div>
          <p className="app-kicker">Inbox workspace</p>
          <h1>alex-1883-cardbox</h1>
        </div>
      </header>
      <main className="app-main">{children}</main>
    </div>
  );
}
