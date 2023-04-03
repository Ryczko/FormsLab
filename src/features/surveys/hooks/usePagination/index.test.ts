import { renderHook, act } from '@testing-library/react';
import usePagination from '.';

const defaults = {
  items: Array.from({ length: 110 }, (_, i) => i),
  size: 20,
  // calculated from length of items and size
  numOfPages: 6
};

describe('usePagination', () => {
  it('should work as expected for first page', () => {
    const { result } = renderHook(() => usePagination(defaults.items, {
      size: defaults.size
    }));

    expect(result.current.canGoNext).toBe(true);
    expect(result.current.canGoPrev).toBe(false);
    expect(result.current.pageIndex).toBe(0);
    expect(result.current.items.length).toBe(defaults.size);
    expect(result.current.size).toBe(defaults.size);
    expect(result.current.numOfPages).toBe(defaults.numOfPages);
  });

  it('should be able to go next if there is a next page', () => {
    const { result } = renderHook(() => usePagination(defaults.items, {
      size: defaults.size
    }));

    expect(result.current.pageIndex).toBe(0);
    expect(result.current.canGoNext).toBe(true);

    act(() => {
      result.current.goNext();
    });

    expect(result.current.pageIndex).toBe(1);
  });

  it('should not be able to go next if it is the last page', () => {
    const { result } = renderHook(() => usePagination(defaults.items, {pageIndex: defaults.numOfPages - 1, size: defaults.size}));

    expect(result.current.pageIndex).toBe(defaults.numOfPages - 1);
    expect(result.current.canGoNext).toBe(false);

    act(() => {
      result.current.goNext();
    });

    // should not change
    expect(result.current.pageIndex).toBe(defaults.numOfPages - 1);
  });

  it('should be able to go prev if it is not first page', () => {
    const { result } = renderHook(() => usePagination(defaults.items, {pageIndex: defaults.numOfPages - 1, size: defaults.size}));

    expect(result.current.pageIndex).toBe(defaults.numOfPages - 1);
    expect(result.current.canGoPrev).toBe(true);

    act(() => {
      result.current.goPrev();
    });

    expect(result.current.pageIndex).toBe(defaults.numOfPages - 2);
  });

  it('should not be able to go prev if it is the first page', () => {
    const { result } = renderHook(() => usePagination(defaults.items, {pageIndex: 0, size: defaults.size}));

    expect(result.current.pageIndex).toBe(0);
    expect(result.current.canGoPrev).toBe(false);

    act(() => {
      result.current.goPrev();
    });

    // should not change
    expect(result.current.pageIndex).toBe(0);
  });

  it('should be able to reset', () => {
    const { result } = renderHook(() => usePagination(defaults.items, {pageIndex: defaults.numOfPages - 1, size: defaults.size}));

    expect(result.current.pageIndex).toBe(defaults.numOfPages - 1);

    act(() => {
      result.current.reset();
    });

    expect(result.current.pageIndex).toBe(0);
  });
});
