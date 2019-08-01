import { useEffect } from 'react';

function useOnClickOutside(ref: React.MutableRefObject<HTMLElement>, callback: Function): void {
    const clickHandler = (event: Event): void => {
        if (ref.current && !ref.current.contains(event.target as Element)) {
            callback();
        }
    };

    useEffect((): (() => void) => {
        document.addEventListener('mousedown', clickHandler);
        return (): void => document.removeEventListener('mousedown', clickHandler);
    }, []);
}

export default useOnClickOutside;
