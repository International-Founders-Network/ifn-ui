# AGENTS.md

Rules for anyone (human or agent) changing `@ifn/ui`.

## Copy

- No em dashes in default UI copy, docs examples or comments. Use a period, comma or colon.
- Reuse existing strings verbatim where they already ship in landing or members
  ("Nothing here matches yet", "Clear search and filters", "Download teaser PDF",
  "Download full PDF", "Full guide for members").
- Plain, direct IFN voice. No hype.

## Brand and look

- Do not invent a third look. Every visual here is extracted from members
  `src/components/library/resource-ui.tsx` (ported from landing `Resources.tsx`).
  Change the source apps' design first, then port it.
- Colors come only from CSS variables: `--ink`, `--paper`, `--paper-deep`, `--ink-muted`,
  `--crimson`, optional `--ifn-surface`. Never hardcode hex values in class strings (the
  `#fff` fallback for `--ifn-surface` is the only exception). Brand source of truth:
  `ifn-brand/tokens/tokens.json` (accent `#A81B36`).
- A new variable is a breaking change for consumers. Add it to the README table and give it a
  fallback.
- Class strings must be complete literals (no `bg-${x}`) so consumer Tailwind can scan `dist`.
- Keep `aria-pressed`, visible focus rings and 44px (`min-h-11`) targets.

## Package

- Components stay stateless and controlled. Apps own data, fetching, URLs and flags.
- Keep the export surface small. Anything new is exported from `src/index.ts` and listed in
  the README.
- `npm run build` and `npm run typecheck` must pass before pushing to `main`.
