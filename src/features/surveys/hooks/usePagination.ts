import { useState } from 'react';

type Options = {
  /**
   * The number of items to show per page
   * @default 20
   */
  size?: number;
};

export default function usePagination<T>(
  items: T[],
  { size = 20 }: Options = {}
) {
  const [pageIndex, setPageIndex] = useState(0);

  const paginatedItems = items.slice(pageIndex * size, (pageIndex + 1) * size);

  const canGoPrev = pageIndex > 0;

  const canGoNext = items.length > (pageIndex + 1) * size;

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
    reset
  };
}
