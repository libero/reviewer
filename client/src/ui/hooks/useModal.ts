import { useState } from 'react';

interface HookReturn {
    isShowing: boolean;
    toggle: Function;
}

const useModal = (): HookReturn => {
    const [isShowing, setIsShowing] = useState(false);

    const toggle = (): void => {
        setIsShowing(!isShowing);
    };

    return {
        isShowing,
        toggle,
    };
};

export default useModal;
