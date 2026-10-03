# @ifn/ui

Shared React UI for IFN apps. v0 ships the Resources library pieces used by
[landing](https://github.com/International-Founders-Network/ifn.community-landing-page)
and [members](https://github.com/International-Founders-Network/ifn-members): the resource
card and the search and filter row. It is extracted from members
`src/components/library/resource-ui.tsx`, which was itself ported from landing
`Resources.tsx`, so it matches the look both apps already have. It adds no new visual design.

## Install

```json
"dependencies": {
  "@ifn/ui": "github:International-Founders-Network/ifn-ui#main"
}
```

`dist/` is not committed. npm runs this package's `prepare` script (`tsup`) when it installs
from git. For reproducible builds, pin a commit: `#<sha>`.

Peer dependencies: `react` and `react-dom` 18 or later, and `lucide-react`.

## Styling contract

Components render Tailwind utility class strings whose colors all come from CSS variables.
No Tailwind theme or CSS file ships with the package. Consumers need two things.

### 1. Let Tailwind scan the package

Tailwind v4 skips `node_modules` by default, so add a `@source` line next to
`@import "tailwindcss"`. The path is relative to the CSS file:

```css
/* members: src/app/globals.css */
@source "../../node_modules/@ifn/ui/dist";

/* landing: src/index.css */
@source "../node_modules/@ifn/ui/dist";
```

On Tailwind v3, add `"./node_modules/@ifn/ui/dist/**/*.{js,cjs}"` to `content`.

### 2. Define the CSS variables

| Variable        | Role                                                         | Members         | Landing                 |
| --------------- | ------------------------------------------------------------ | --------------- | ----------------------- |
| `--ink`         | Type, selected fill, focus ring                              | defined         | defined                 |
| `--paper`       | Page ground, text on ink fills, focus ring offset            | defined         | defined                 |
| `--paper-deep`  | Recessed fill: icon box, tag pill, count badge               | defined         | `var(--band)`           |
| `--ink-muted`   | Secondary text; hairlines at 20 to 40% alpha                 | defined         | `var(--muted)`          |
| `--crimson`     | Link and button hover accent (`#A81B36`)                     | defined         | `var(--accent)`         |
| `--ifn-surface` | Optional. Card, input and off-chip fill. Defaults to `#fff`  | leave unset     | `var(--paper)`          |

Landing mapping, added once to `:root` (dark mode follows because the targets swap):

```css
:root {
  --paper-deep: var(--band);
  --ink-muted: var(--muted);
  --crimson: var(--accent);
  --ifn-surface: var(--paper);
}
```

## Exports

Components

- `ResourceCard`: icon box and pills, title, description, body, CTA footer.
- `ResourceCtaLink`: an `<a>` styled as a card-footer link, with optional `external`.
- `ResourceFilters`: `LibrarySearch`, optional `FilterChips`, `children`, optional `ResultCount`, stacked.
- `LibrarySearch`, `FilterChips`, `ResultCount`: the pieces, for custom layouts.
- `NoMatch`: empty state with "Clear search and filters".
- `LibraryIcon`: default icon per library slug (FileText fallback).

Class tokens: `SELECTION`, `toggleClasses(isSelected, shape)`, `TEXT_LINK`, `OUTLINE_BUTTON`,
`STATUS_TEXT`, `PILL_NEUTRAL`, `PILL_ON`, `PILL_OFF`, `SURFACE`.

Helpers: `matchesLibraryQuery(item, query)` (title, slug, description) and
`toggleInList(list, value)` (multi-select).

Every component is controlled and stateless. Apps own data, fetching, URLs, flags and
filter state. There are no hooks, so no `"use client"` directive. In Next.js, render the
interactive pieces (filters, `NoMatch`) from a client component.

## ResourceCard

```tsx
<ResourceCard
  title="Visa pathways"
  description="..."
  slug="visa-pathways"        // default icon; or icon={<Rocket size={24} aria-hidden />}
  pills={<span className={PILL_NEUTRAL}>Guide</span>}
  leading={adminCheckbox}      // optional, before the icon box
  selected={isSelected}        // optional ink ring
  teaserCta={...}
  fullCta={...}
  memberCta={...}
  footer={...}
>
  {optionalBody}
</ResourceCard>
```

- The root is an `<li>` by default, so wrap cards in `<ul className="grid list-none gap-6 p-0 md:grid-cols-2">`.
  Use `as="div"` or `as="article"` otherwise.
- The title is an `h2` by default (members). Landing uses `titleAs="h3"`.
- Only the slots you pass render. CTAs render in the order teaser, full, member, in one
  wrapping row. `footer` renders under that row. With no CTA and no footer, the hairline footer
  is omitted entirely.
- `className` is appended to the root. Classes are not merged.

### Landing: public teaser, full PDF, member pointer

```tsx
import { Download, ArrowRight, Clock } from "lucide-react";
import { ResourceCard, ResourceCtaLink, PILL_NEUTRAL, PILL_ON, STATUS_TEXT } from "@ifn/ui";

<ResourceCard
  titleAs="h3"
  title={resource.title}
  description={resource.description}
  icon={<resource.icon size={24} aria-hidden="true" />}
  pills={<span className={PILL_NEUTRAL}>{resource.tag}</span>}
  teaserCta={
    isTeaserPublic(catalog, id) && (
      <ResourceCtaLink external href={teaserDownloadUrl(origin, id)} icon={<Download size={16} aria-hidden="true" />}>
        Download teaser PDF
      </ResourceCtaLink>
    )
  }
  fullCta={
    isLandingFull(catalog, id) && (
      <ResourceCtaLink external href={fullDownloadUrl(origin, id)} icon={<Download size={16} aria-hidden="true" />}>
        Download full PDF
      </ResourceCtaLink>
    )
  }
  memberCta={
    !isLandingFull(catalog, id) && asset?.memberDownloadable === true && (
      <ResourceCtaLink external href={MEMBERS_LIBRARY_URL} icon={<ArrowRight size={16} aria-hidden="true" />}>
        Full guide for members
      </ResourceCtaLink>
    )
  }
  footer={
    !hasAnyLink && (
      <p className={STATUS_TEXT}>
        <Clock size={16} aria-hidden="true" />
        Being written
      </p>
    )
  }
/>
```

### Members: member download

```tsx
<ResourceCard
  slug={item.slug}
  title={item.title}
  description={item.description}
  pills={
    <>
      <span className={PILL_NEUTRAL}>{item.tag}</span>
      {item.canDownload && (
        <span className={PILL_ON}>
          <Download size={12} aria-hidden="true" />
          Ready
        </span>
      )}
    </>
  }
  memberCta={
    entitled && item.canDownload && (
      <ResourceCtaLink href={`/api/library/${item.slug}/download`} icon={<Download size={16} aria-hidden="true" />}>
        Download PDF
      </ResourceCtaLink>
    )
  }
  footer={!entitled ? lockedNotice : !item.canDownload ? unavailableNotice : null}
/>
```

For router links (`next/link`, `react-router` `Link`), pass the app's own element with
`className={TEXT_LINK}` into any slot.

## ResourceFilters

```tsx
<ResourceFilters
  search={{
    id: "library-search",
    label: "Search the library",
    placeholder: "Search Pack A guides",
    value: query,
    onChange: setQuery,
  }}
  chips={
    entitled
      ? { label: "Filter by availability", options, value: filter, onChange: setFilter }
      : undefined
  }
  count={{ shown: visible.length, isFiltered, noun: "guide" }}
/>
```

`options` is `Array<{ id, label, count? }>`. The count badge renders only when `count` is set.
Extra controls, such as landing's content-type trigger, go in `children` and render between
the chips and the count. For multi-select, build the trigger with
`toggleClasses(active.length > 0, shape)` and update state with `toggleInList`.

Empty state:

```tsx
<NoMatch
  query={query}
  filterLabel={filter === "all" ? null : activeLabel}
  onClear={() => { setQuery(""); setFilter("all"); }}
  extraAction={<a href="mailto:hello@ifn.community" className={TEXT_LINK}>Tell us what you need</a>}
  noun="guide"          // "...to see every guide again."
  description={custom}  // optional: replaces the default sentence
/>
```

## Library browse chrome

Persona tabs and the stage sidebar from landing `Resources.tsx`. Same controlled contract:
the app owns the active persona and stage, and URLs.

```tsx
import { Rocket } from "lucide-react";
import { LIBRARY_PERSONAS, LibraryBrowseLayout, PersonaTabs, StageSidebar, getLibraryPersona } from "@ifn/ui";

const persona = getLibraryPersona(personaId) ?? LIBRARY_PERSONAS[0];

<LibraryBrowseLayout
  personas={
    <PersonaTabs
      options={LIBRARY_PERSONAS.map((p) => ({ id: p.id, label: p.name, icon: icons[p.id] }))}
      value={persona.id}
      onChange={(id) => { setPersonaId(id); setStageId(getLibraryPersona(id)!.stages[0].id); }}
    />
  }
  sidebar={<StageSidebar stages={persona.stages} value={stageId} onChange={setStageId} />}
>
  {stageHeaderFiltersAndCards}
</LibraryBrowseLayout>
```

- `LIBRARY_PERSONAS`: ids, names and stages (`id`, `name`, `description`) copied from landing
  `resourcesData.ts`. Taxonomy only, no resources. International Expansion is
  `global_expansion` to match landing; r2 maps may key it as `global-expansion`, so map that in
  the app. `getLibraryPersona(id)` looks one up.
- `PersonaTabs`: `role="group"`, label "Choose who you are", `aria-pressed` chips. `icon` is an
  optional `ReactNode` per option.
- `StageSidebar`: heading and group label "Choose a stage". Full-width stage buttons with the
  name, and from `lg` up the description and a chevron on the active stage.
- `LibraryBrowseLayout`: personas above a rounded panel, sidebar `lg:w-80` beside the main slot.
  Optional; use the pieces directly for other layouts.

## Development

```sh
npm install
npm run build      # tsup -> dist/index.{js,cjs,d.ts,d.cts}
npm run typecheck  # tsc --noEmit
```

See [AGENTS.md](./AGENTS.md) for copy and brand rules.
