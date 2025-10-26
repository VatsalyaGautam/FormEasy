import { useRef } from "react";

export default function useDebounce<T extends (...args: any[]) => void>(
  callback: T,
  delay = 300
) {
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  return (...args: Parameters<T>) => {
    if (timer.current) {
      clearTimeout(timer.current);
    }

    timer.current = setTimeout(() => {
      callback(...args);
    }, delay);
  };
}