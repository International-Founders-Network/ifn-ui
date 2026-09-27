/** Case-insensitive match on title, slug and description (Resources search). */
export function matchesLibraryQuery(
  item: { slug: string; title: string; description: string },
  query: string,
): boolean {
  const q = query.trim().toLowerCase();
  if (!q) return true;
  return (
    item.title.toLowerCase().includes(q) ||
    item.slug.toLowerCase().includes(q) ||
    item.description.toLowerCase().includes(q)
  );
}

/** Add or remove `value` from a multi-select list (landing's content-type filter). */
export function toggleInList<T>(list: readonly T[], value: T): T[] {
  return list.includes(value) ? list.filter((v) => v !== value) : [...list, value];
}
