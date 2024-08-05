import { useEffect } from "react";

export const useClickOutside = (ref, isActive, setIsActive) => {
  const handleClick = (e) => {
    if (ref.current && !ref.current.contains(e.target)) {
      if (isActive) setTimeout(() => setIsActive(false), 100);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClick);

    return () => {
      document.removeEventListener('mousedown', handleClick);
    }
  })
}