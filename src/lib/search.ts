type BuildSearchUrlParams = {
  currentSearch: string;
  pathname: string;
  query: string;
};

export function buildProductSearchUrl({
  currentSearch,
  pathname,
  query,
}: BuildSearchUrlParams) {
  const nextSearch = query.trim();

  if (nextSearch === currentSearch.trim()) {
    return null;
  }

  return nextSearch
    ? `${pathname}?search=${encodeURIComponent(nextSearch)}`
    : pathname;
}
