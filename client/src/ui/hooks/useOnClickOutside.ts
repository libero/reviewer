import { useEffect } from 'react';

function useOnClickOutside(ref: React.MutableRefObject<HTMLElement>, callback: Function) {
  const clickHandler = (event: Event): void => {
    if (ref.current && !ref.current.contains(event.target as Element)) {
      callback()
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', clickHandler);
    return () => document.removeEventListener('mousedown', clickHandler);
  },[])
}

export default useOnClickOutside;