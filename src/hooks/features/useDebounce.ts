import { useState, useRef, useEffect } from "react";

const useDebounce = (value: string) => {
  const [debounce, setDebounce] = useState<string>("");

  const typingRef = useRef<any>();

  useEffect(() => {
    if (typingRef.current) clearTimeout(typingRef.current);
    typingRef.current = setTimeout(() => setDebounce(value), 1000);
  }, [value]);

  return debounce;
};

export default useDebounce;
