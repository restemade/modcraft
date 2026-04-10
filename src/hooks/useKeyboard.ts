import { useEffect, useRef } from 'react';

export function useKeyboard() {
  const pressed = useRef<Set<string>>(new Set());

  useEffect(() => {
    const down = (e: KeyboardEvent) => pressed.current.add(e.code);
    const up = (e: KeyboardEvent) => pressed.current.delete(e.code);
    window.addEventListener('keydown', down);
    window.addEventListener('keyup', up);
    return () => {
      window.removeEventListener('keydown', down);
      window.removeEventListener('keyup', up);
    };
  }, []);

  return pressed;
}
