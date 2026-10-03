import type { ReactNode } from "react";
import { ChevronRight } from "lucide-react";
import { toggleClasses } from "./classes";

export type PersonaTabOption<T extends string> = {
  id: T;
  label: string;
  /** Leading icon, e.g. `<Rocket size={18} aria-hidden="true" className="shrink-0" />`. */
  icon?: ReactNode;
};

export type PersonaTabsProps<T extends string> = {
  options: Array<PersonaTabOption<T>>;
  value: T;
  onChange: (value: T) => void;
  /** Accessible group label. Defaults to "Choose who you are". */
  label?: string;
};

/** Persona chip row from landing `Resources.tsx`. Single-select, `aria-pressed`. Controlled. */
export function PersonaTabs<T extends string>({
  options,
  value,
  onChange,
  label = "Choose who you are",
}: PersonaTabsProps<T>) {
  return (
    <div role="group" aria-label={label} className="flex flex-wrap justify-center gap-3">
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
              "inline-flex min-h-11 items-center gap-2 rounded-lg px-5 py-3 font-semibold",
            )}
          >
            {option.icon}
            <span>{option.label}</span>
          </button>
        );
      })}
    </div>
  );
}

export type StageOption<T extends string> = {
  id: T;
  name: string;
  /** Short subtitle under the name. */
  description?: string;
};

export type StageSidebarProps<T extends string> = {
  stages: ReadonlyArray<StageOption<T>>;
  value: T;
  onChange: (value: T) => void;
  /** Visible heading and group label. Defaults to "Choose a stage". */
  heading?: string;
};

/**
 * Stage list from landing `Resources.tsx`: name, a chevron on the active stage and the
 * description underneath (both from `lg` up). Single-select, `aria-pressed`. Controlled.
 */
export function StageSidebar<T extends string>({
  stages,
  value,
  onChange,
  heading = "Choose a stage",
}: StageSidebarProps<T>) {
  return (
    <div className="p-8">
      <h2 className="mb-6 text-xs font-bold uppercase tracking-widest text-[var(--ink-muted)]">{heading}</h2>
      <div role="group" aria-label={heading} className="flex flex-wrap gap-2 lg:flex-col">
        {stages.map((stage) => {
          const isActive = stage.id === value;
          return (
            <button
              key={stage.id}
              type="button"
              aria-pressed={isActive}
              onClick={() => onChange(stage.id)}
              className={toggleClasses(isActive, "min-h-11 w-full max-w-full rounded-lg p-4 text-left")}
            >
              <span className="flex items-center justify-between gap-4 font-semibold">
                <span>{stage.name}</span>
                {isActive ? (
                  <ChevronRight size={18} aria-hidden="true" className="hidden shrink-0 lg:block" />
                ) : null}
              </span>
              {stage.description ? (
                <span
                  className={`mt-1 hidden text-xs leading-relaxed lg:block ${
                    isActive ? "text-[var(--paper)]" : "text-[var(--ink-muted)]"
                  }`}
                >
                  {stage.description}
                </span>
              ) : null}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export type LibraryBrowseLayoutProps = {
  /** Usually `<PersonaTabs>`, plus search if the app has it. Rendered above the panel. */
  personas: ReactNode;
  /** Usually `<StageSidebar>`. */
  sidebar: ReactNode;
  /** Stage header, filters and cards. */
  children: ReactNode;
};

/** Landing layout: personas on top, then a panel with the stage sidebar beside the results. */
export function LibraryBrowseLayout({ personas, sidebar, children }: LibraryBrowseLayoutProps) {
  return (
    <div>
      <div className="mb-12 flex flex-col gap-8">{personas}</div>
      <div className="overflow-hidden rounded-3xl border border-[var(--ink-muted)]/20 bg-[var(--paper)]">
        <div className="flex flex-col lg:flex-row">
          <div className="shrink-0 border-b border-[var(--ink-muted)]/20 bg-[var(--paper-deep)] lg:w-80 lg:border-b-0 lg:border-r">
            {sidebar}
          </div>
          <div className="flex flex-1 flex-col p-8 lg:p-12">{children}</div>
        </div>
      </div>
    </div>
  );
}
