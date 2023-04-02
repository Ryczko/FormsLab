import { useEffect, useState } from 'react';

function useLocalStorage<T>(defaultValue: T, key: string) {
  const [value, setValue] = useState(defaultValue);

  useEffect(() => {
    if (defaultValue === value) {
      return;
    }
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [defaultValue, key, value]);

  useEffect(() => {
    const storageValue = window.localStorage.getItem(key);
    setValue(storageValue != null ? JSON.parse(storageValue) : defaultValue);
  }, [defaultValue, key]);

  return [value, setValue] as const;
}

export default useLocalStorage;
