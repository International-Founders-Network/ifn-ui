import type { ReactNode } from "react";
import { Search } from "lucide-react";
import { OUTLINE_BUTTON, SURFACE } from "./classes";

export type NoMatchProps = {
  query: string;
  /** Active filter label, or null when showing all. */
  filterLabel: string | null;
  onClear: () => void;
  /** Sits beside the clear button, e.g. a "Tell us what you need" link. */
  extraAction?: ReactNode;
  /** Replaces the default explanation paragraph. */
  description?: ReactNode;
  /** Singular noun in the default explanation: "see every file again". */
  noun?: string;
  titleAs?: "h2" | "h3" | "h4";
};

/** Empty state for a search or filter that matched nothing. */
export function NoMatch({
  query,
  filterLabel,
  onClear,
  extraAction,
  description,
  noun = "file",
  titleAs: Title = "h2",
}: NoMatchProps) {
  const q = query.trim();
  return (
    <div
      className={`flex flex-col items-center justify-center rounded-2xl border border-[var(--ink-muted)]/20 ${SURFACE} px-6 py-12 text-center`}
    >
      <span className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[var(--paper-deep)] text-[var(--ink-muted)]">
        <Search size={32} aria-hidden="true" />
      </span>
      <Title className="mb-2 text-lg font-bold text-[var(--ink)]">Nothing here matches yet</Title>
      <p className="mb-8 max-w-md leading-relaxed text-[var(--ink-muted)]">
        {description ?? (
          <>
            {q ? <>Nothing matches &ldquo;{q}&rdquo;</> : <>Nothing matches</>}
            {filterLabel ? (
              <>
                {" "}under <span className="font-semibold text-[var(--ink)]">{filterLabel}</span>
              </>
            ) : null}
            . Clear what you have set to see every {noun} again.
          </>
        )}
      </p>
      <div className="flex flex-col items-center gap-4 sm:flex-row">
        <button type="button" onClick={onClear} disabled={!q && !filterLabel} className={OUTLINE_BUTTON}>
          Clear search and filters
        </button>
        {extraAction}
      </div>
    </div>
  );
}
