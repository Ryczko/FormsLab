import React from 'react';
import { useEffect } from 'react';

export function useCloseComponent(
  ref: React.RefObject<HTMLElement>,
  cb: () => void
) {
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        cb();
      }
    }

    function handleClickEsc(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        cb();
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleClickEsc);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleClickEsc);
    };
  }, [ref, cb]);
}
