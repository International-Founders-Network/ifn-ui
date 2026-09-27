import type { ReactNode } from "react";
import { Search } from "lucide-react";
import { SURFACE, toggleClasses } from "./classes";

export type LibrarySearchProps = {
  id: string;
  /** Visually hidden label. */
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
};

/** Search field with a leading icon. Controlled. */
export function LibrarySearch({ id, label, placeholder, value, onChange }: LibrarySearchProps) {
  return (
    <div className="w-full">
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-[var(--ink-muted)]">
          <Search size={20} aria-hidden="true" />
        </div>
        <input
          id={id}
          type="search"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`w-full rounded-lg border border-[var(--ink-muted)]/40 ${SURFACE} py-3.5 pl-12 pr-4 text-[var(--ink)] placeholder:text-[var(--ink-muted)] transition-colors focus:border-[var(--ink)] focus:outline-none focus:ring-2 focus:ring-[var(--ink)] focus:ring-offset-2 focus:ring-offset-[var(--paper)]`}
        />
      </div>
    </div>
  );
}

export type FilterChipOption<T extends string> = {
  id: T;
  label: string;
  /** Live count badge; omitted when undefined. */
  count?: number;
};

export type FilterChipsProps<T extends string> = {
  /** Accessible group label. */
  label: string;
  options: Array<FilterChipOption<T>>;
  value: T;
  onChange: (value: T) => void;
};

/** Single-select chips (`aria-pressed`), with optional live counts so the row scales. */
export function FilterChips<T extends string>({ label, options, value, onChange }: FilterChipsProps<T>) {
  return (
    <div role="group" aria-label={label} className="flex flex-wrap gap-2">
      {options.map((option) => {
        const isActive = option.id === value;
        return (
          <button
            key={option.id}
            type="button"
            aria-pressed={isActive}
            onClick={() => onChange(option.id)}
            className={toggleClasses(
              isActive,
              "inline-flex min-h-11 items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold",
            )}
          >
            <span>{option.label}</span>
            {option.count !== undefined ? (
              <span
                className={`rounded-full px-2 text-xs ${
                  isActive
                    ? "bg-[var(--paper)]/20 text-[var(--paper)]"
                    : "bg-[var(--paper-deep)] text-[var(--ink-muted)]"
                }`}
              >
                {option.count}
              </span>
            ) : null}
          </button>
        );
      })}
    </div>
  );
}

export type ResultCountProps = {
  shown: number;
  isFiltered: boolean;
  /** Singular noun, e.g. "guide" or "resource". */
  noun?: string;
  /** Plural noun when it is not `noun + "s"`. */
  pluralNoun?: string;
};

/** Polite live region: "3 guides shown for your search." */
export function ResultCount({ shown, isFiltered, noun = "file", pluralNoun }: ResultCountProps) {
  const plural = pluralNoun ?? `${noun}s`;
  return (
    <p aria-live="polite" aria-atomic="true" className="text-sm font-medium text-[var(--ink-muted)]">
      {shown === 0
        ? `No ${plural} match your search.`
        : `${shown} ${shown === 1 ? noun : plural} shown${isFiltered ? " for your search" : ""}.`}
    </p>
  );
}

export type ResourceFiltersProps<T extends string> = {
  search: LibrarySearchProps;
  /** Omit to hide the chip row (members does this for unlinked accounts). */
  chips?: FilterChipsProps<T>;
  /** Omit to hide the live result count. */
  count?: ResultCountProps;
  /** Extra controls rendered after the chips, e.g. landing's content-type trigger. */
  children?: ReactNode;
  className?: string;
};

/**
 * Search, chip row and result count stacked the way members lays them out. Fully
 * controlled: the app owns query, filter state and the filtering itself.
 */
export function ResourceFilters<T extends string>({
  search,
  chips,
  count,
  children,
  className,
}: ResourceFiltersProps<T>) {
  return (
    <div className={className ? `space-y-4 ${className}` : "space-y-4"}>
      <LibrarySearch {...search} />
      {chips ? <FilterChips {...chips} /> : null}
      {children}
      {count ? <ResultCount {...count} /> : null}
    </div>
  );
}
