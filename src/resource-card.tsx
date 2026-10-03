import type { AnchorHTMLAttributes, ReactNode } from "react";
import { Building, FileText, Map as MapIcon, Scale } from "lucide-react";
import { SURFACE, TEXT_LINK } from "./classes";

/** Icons landing uses for these ids in `resourcesData.ts`; FileText otherwise. */
export function LibraryIcon({ slug, size = 24 }: { slug?: string; size?: number }) {
  const props = { size, "aria-hidden": true } as const;
  switch (slug) {
    case "visa-pathways":
      return <Scale {...props} />;
    case "entity-selection":
      return <Building {...props} />;
    case "austin-ecosystem-map":
      return <MapIcon {...props} />;
    default:
      return <FileText {...props} />;
  }
}

export type ResourceCardProps = {
  title: ReactNode;
  description: ReactNode;
  /** Pills in the top-right (use `PILL_NEUTRAL` / `PILL_ON` / `PILL_OFF`). */
  pills?: ReactNode;
  /** Icon inside the icon box, e.g. `<Rocket size={24} aria-hidden />`. Wins over `slug`. */
  icon?: ReactNode;
  /** Picks a default icon via `LibraryIcon` when `icon` is not passed. */
  slug?: string;
  /** Sits before the icon box (e.g. an Admin select checkbox). */
  leading?: ReactNode;
  /** Rings the card in ink. */
  selected?: boolean;
  /** Landing public teaser download. */
  teaserCta?: ReactNode;
  /** Landing full PDF download. */
  fullCta?: ReactNode;
  /** Members library download, or landing's "Full guide for members" pointer. */
  memberCta?: ReactNode;
  /** Escape hatch under the CTA row: status line, notes, anything else. */
  footer?: ReactNode;
  /** Extra body content between the description and the footer. */
  children?: ReactNode;
  /** Root element. `li` by default: render cards inside a `<ul>`. */
  as?: "li" | "div" | "article";
  /** Title heading level. Members uses h2, landing uses h3. */
  titleAs?: "h2" | "h3" | "h4";
  /** Appended to the root classes (no class merging is done). */
  className?: string;
};

/**
 * Resources card anatomy: icon box + pills, bold title, muted description, body,
 * then a hairline footer holding the CTA slots in a wrapping row followed by `footer`.
 * Only slots that are passed render; with nothing to show, the footer is omitted.
 */
export function ResourceCard({
  title,
  description,
  pills,
  icon,
  slug,
  leading,
  selected = false,
  teaserCta,
  fullCta,
  memberCta,
  footer,
  children,
  as: Root = "li",
  titleAs: Title = "h2",
  className,
}: ResourceCardProps) {
  const ctas = [teaserCta, fullCta, memberCta].filter(isPresent);
  const hasFooter = ctas.length > 0 || isPresent(footer);

  return (
    <Root
      className={[
        `flex flex-col rounded-2xl border ${SURFACE} p-6 transition-shadow duration-300 hover:shadow-lg`,
        selected ? "border-[var(--ink)] ring-2 ring-[var(--ink)]" : "border-[var(--ink-muted)]/20",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="mb-6 flex items-start justify-between gap-4">
        <div className="flex shrink-0 items-center gap-3">
          {leading}
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[var(--ink-muted)]/20 bg-[var(--paper-deep)] text-[var(--ink)]">
            {icon ?? <LibraryIcon slug={slug} />}
          </span>
        </div>
        {isPresent(pills) ? <div className="flex flex-wrap justify-end gap-2">{pills}</div> : null}
      </div>

      <Title className="mb-2 text-lg font-bold text-pretty text-[var(--ink)]">
        {keepLastWordsTogether(title)}
      </Title>
      <p className="mb-6 flex-1 text-sm leading-relaxed text-[var(--ink-muted)]">{description}</p>

      {children}

      {hasFooter ? (
        <div className="border-t border-[var(--ink-muted)]/20 pt-4">
          {ctas.length > 0 ? (
            <div className="flex flex-wrap gap-x-6">
              {teaserCta}
              {fullCta}
              {memberCta}
            </div>
          ) : null}
          {footer}
        </div>
      ) : null}
    </Root>
  );
}

export type ResourceCtaLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  /** Trailing icon, e.g. `<Download size={16} aria-hidden />`. */
  icon?: ReactNode;
  /** Opens in a new tab with `noopener noreferrer` and an sr-only note. */
  external?: boolean;
};

/**
 * A plain anchor dressed as a card-footer `TEXT_LINK`. For router links, render the
 * app's own `Link` with `className={TEXT_LINK}` instead.
 */
export function ResourceCtaLink({
  href,
  icon,
  external = false,
  className,
  children,
  ...rest
}: ResourceCtaLinkProps) {
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      {...rest}
      className={className ? `${TEXT_LINK} ${className}` : TEXT_LINK}
    >
      {children}
      {icon}
      {external ? <span className="sr-only">(opens in a new tab)</span> : null}
    </a>
  );
}

/**
 * Joins the last two words of a 3+ word string title with a non-breaking space so a
 * short last word never sits alone. Non-string titles pass through untouched.
 */
function keepLastWordsTogether(title: ReactNode): ReactNode {
  if (typeof title !== "string") return title;
  const trimmed = title.trim();
  if (trimmed.split(/\s+/).length < 3) return title;
  return trimmed.replace(/\s+(?=\S+$)/, " ");
}

function isPresent(node: ReactNode): boolean {
  return node !== undefined && node !== null && node !== false && node !== "";
}
