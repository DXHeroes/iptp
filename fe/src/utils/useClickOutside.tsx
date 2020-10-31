import { useEffect } from 'react';

const useClickOutside = (ref: any, func: (e: any) => void) => {
  useEffect(() => {
    const handleClickOutside = (e: any) => {
      if (!ref.current || ref.current.contains(e.target)) return
      func(e);
    };

    document.addEventListener("click", handleClickOutside, true);

    return () => document.removeEventListener("click", handleClickOutside, true)
  }, [ref, func])
};

export default useClickOutside;