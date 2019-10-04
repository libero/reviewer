import React, { useState , useEffect, useRef } from 'react'

interface returnObject {
    elementRef: React.Ref<HTMLDivElement>;
    size: Size;
    handleResize: Function;
}

interface Size {
    width: number;
    height: number;
}
const useElementSize = (): returnObject => {
    const elementRef = useRef(null);
    const [size, setSize] = useState<Size>({width: 0, height: 0});
    
    function handleResize() {        
        const width = elementRef.current ? elementRef.current.offsetWidth : 0
        const height = elementRef.current ? elementRef.current.offsetHeight - Number.parseInt(window.getComputedStyle(elementRef.current).paddingBottom) : 0
        setSize({height, width});
    }

    useEffect(() => {
        window.addEventListener('resize', handleResize);        
        return () => {            
            window.removeEventListener('resize', handleResize);            
        }
    }, [])
    
    return { elementRef, size, handleResize };
}

export default useElementSize;