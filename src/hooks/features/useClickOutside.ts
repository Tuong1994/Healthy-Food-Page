import { RefObject, Dispatch, SetStateAction, useEffect } from "react";

const useClickOutside = (ref: RefObject<any>, setTrigger: Dispatch<SetStateAction<boolean>>) => {
  if (typeof window === "undefined") return;

  const handleClickOutside = (e: Event) => {
    if (ref.current && !ref.current.contains(e.target)) {
      setTrigger(false);
    }
  };

  useEffect(() => {
    window.addEventListener("mousedown", handleClickOutside);
    return () => window.removeEventListener("mousedown", handleClickOutside);
  }, []);
};

export default useClickOutside;
