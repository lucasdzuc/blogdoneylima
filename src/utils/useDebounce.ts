import { useRef } from 'react';

export default function useDebounce() {
  
  const timeoutRef = useRef<NodeJS.Timeout>();
  
  function debounce(func: any, timeout?: 300) {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      func();
    }, timeout);
  }
  return { debounce };
}