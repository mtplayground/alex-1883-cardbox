import { themeTokens } from '../styles/tokens';

type ComposeActionButtonProps = {
  expanded: boolean;
  onClick: () => void;
};

export function ComposeActionButton({
  expanded,
  onClick,
}: ComposeActionButtonProps) {
  return (
    <button
      aria-controls="compose-panel"
      aria-expanded={expanded}
      className={`compose-action ${themeTokens.classNames.composeAction}`}
      type="button"
      onClick={onClick}
    >
      Compose
    </button>
  );
}
