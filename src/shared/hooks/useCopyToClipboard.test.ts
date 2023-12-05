import useCopyToClipboard from 'shared/hooks/useCopyToClipboard';
import { act, renderHook } from '@testing-library/react';

test('should copy text to clipboard unsuccessfully', async () => {
  const { result } = renderHook(() => useCopyToClipboard());
  const textToCopy = 'Hello, world!';

  await act(async () => {
    const success = await result.current.copy(textToCopy, false);
    expect(success).toBe(false);
  });
});

test('should handle copying error', async () => {
  const { result } = renderHook(() => useCopyToClipboard());
  const textToCopy = 'Hello, world!';

  // Mocking clipboard API to simulate an error
  Object.defineProperty(navigator, 'clipboard', {
    value: {
      writeText: async () => {
        throw new Error('Mocked error');
      },
    },
    writable: true,
  });

  await act(async () => {
    const success = await result.current.copy(textToCopy, true);
    expect(success).toBe(false);
    expect(result.current.copiedText).toBeNull();
  });
});

test('should handle copying when clipboard is not supported', async () => {
  const { result } = renderHook(() => useCopyToClipboard());
  const textToCopy = 'Hello, world!';

  // Mocking clipboard not supported
  Object.defineProperty(navigator, 'clipboard', {
    value: undefined,
    writable: true,
  });

  await act(async () => {
    const success = await result.current.copy(textToCopy, true);
    expect(success).toBe(false);
    expect(result.current.copiedText).toBeNull();
  });
});
