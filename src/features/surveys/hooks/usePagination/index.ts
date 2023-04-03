import { useState } from 'react';

type Options = {
  /**
   * The number of items to show per page
   * @default 20
   */
  size?: number;

  /**
   * The current page index
   * @default 0
   */
  pageIndex?: number;
};

export default function usePagination<T>(
  items: T[],
  { size = 20, pageIndex: initialPageIndex = 0 }: Options = {}
) {
  const [pageIndex, setPageIndex] = useState(initialPageIndex);

  const numOfPages = Math.ceil(items.length / size);

  const paginatedItems = items.slice(pageIndex * size, (pageIndex + 1) * size);

  const canGoPrev = pageIndex > 0;

  const canGoNext = pageIndex < numOfPages - 1;

  const goNext = () => {
    if (!canGoNext) return;

    setPageIndex(pageIndex + 1);
  };

  const goPrev = () => {
    if (!canGoPrev) return;

    setPageIndex(pageIndex - 1);
  };

  const reset = () => {
    setPageIndex(0);
  };

  return {
    items: paginatedItems,
    canGoNext,
    canGoPrev,
    goNext,
    goPrev,
    pageIndex,
    reset,
    size,
    numOfPages
  };
}
