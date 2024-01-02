export function usePagination<T>(
  items: T[],
  itemsPerPage: number,
  pageNumber: number
) {
  const startIndex = (pageNumber - 1) * itemsPerPage;
  const endIndex = pageNumber * itemsPerPage;

  let currentPageItems: T[] = items.slice(startIndex, endIndex);
  let totalItems = items.length;
  let totalPages = Math.ceil(totalItems / itemsPerPage);

  return { currentPageItems, totalPages, totalItems };
}
