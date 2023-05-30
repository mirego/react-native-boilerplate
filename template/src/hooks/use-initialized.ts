import { useEffect, useRef } from 'react';

export default function useInitialized() {
  const initialized = useRef(false);

  useEffect(() => {
    initialized.current = true;
  }, []);

  function ifInitialized<T>(value: T) {
    return initialized.current ? value : undefined;
  }

  return { initialized: initialized.current, ifInitialized };
}
