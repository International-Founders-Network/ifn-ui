/**
 * Class-string tokens shared by landing `Resources.tsx` and members `resource-ui.tsx`.
 * Colors come from CSS variables the consuming app defines (see README):
 * `--ink`, `--paper`, `--paper-deep`, `--ink-muted`, `--crimson`, and optionally
 * `--ifn-surface` (card, input and off-chip fill; defaults to white).
 *
 * Every class below is a complete literal so Tailwind can find it when the app
 * scans `node_modules/@ifn/ui/dist`.
 */

/** Card, input and off-state fill. White unless the app sets `--ifn-surface`. */
export const SURFACE = "bg-[var(--ifn-surface,#fff)]";

/**
 * Selection language from landing: `--ink` fill when chosen, surface over a hairline
 * when not. State is also carried by `aria-pressed` / `aria-checked`.
 */
export const SELECTION = {
  on: "border-[var(--ink)] bg-[var(--ink)] text-[var(--paper)]",
  off:
    "border-[var(--ink-muted)]/30 bg-[var(--ifn-surface,#fff)] text-[var(--ink)] hover:border-[var(--ink-muted)]/70",
  focus:
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ink)] " +
    "focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--paper)]",
} as const;

/** One shape for every two-state control, so chips, stage lists and triggers cannot drift. */
export function toggleClasses(isSelected: boolean, shape: string): string {
  return [
    "border transition-colors",
    SELECTION.focus,
    shape,
    isSelected ? SELECTION.on : SELECTION.off,
  ].join(" ");
}

/** Card-footer links that read as links: ink, underlined, never a button. */
export const TEXT_LINK =
  "inline-flex min-h-11 items-center gap-2 rounded px-1 text-sm font-semibold text-[var(--ink)] " +
  "underline underline-offset-4 transition-colors hover:text-[var(--crimson)] " +
  SELECTION.focus;

export const OUTLINE_BUTTON =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-[var(--ink)]/20 " +
  "px-4 py-2 text-sm font-medium text-[var(--ink)] hover:border-[var(--crimson)] " +
  "disabled:cursor-not-allowed disabled:opacity-50 " +
  SELECTION.focus;

/** Muted status line for a card footer with no action ("Being written", "Download unavailable"). */
export const STATUS_TEXT =
  "inline-flex min-h-11 items-center gap-2 text-sm font-medium text-[var(--ink-muted)]";

const PILL = "rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide";
/** Tag pill ("Guide", "Checklist"). */
export const PILL_NEUTRAL = `${PILL} border border-[var(--ink-muted)]/25 bg-[var(--paper-deep)] text-[var(--ink)]`;
/** Filled state pill ("Members", "Ready"); put a 12px icon inside. */
export const PILL_ON = `${PILL} inline-flex items-center gap-1 bg-[var(--ink)] text-[var(--paper)]`;
/** Dashed "off" pill. */
export const PILL_OFF = `${PILL} border border-dashed border-[var(--ink-muted)]/40 text-[var(--ink-muted)]`;
