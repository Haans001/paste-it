import { useState, useEffect } from 'react';

const CTRL_KEY = 'Control';
const V_KEY = 'v';

const useKeyboardPaste = () => {
    const [isCtrlDown, setCtrlDown] = useState(false);
    const [isVDown, setVDown] = useState(false);
    const [isPasting, setPasting] = useState(false);

    const handleKeyDown = (e) => {
        if (e.key === CTRL_KEY) setCtrlDown(true);
        if (e.key === V_KEY) setVDown(true);
    };

    const handleKeyUp = (e) => {
        if (e.key === CTRL_KEY) setCtrlDown(false);
        if (e.key === V_KEY) setVDown(false);
    };

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);
        document.addEventListener('keyup', handleKeyUp);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.removeEventListener('keyup', handleKeyUp);
        };
    }, []);

    useEffect(() => {
        if (isCtrlDown && isVDown) {
            setPasting(true);
        } else {
            setPasting(false);
        }
    }, [isCtrlDown, isVDown]);

    return isPasting;
};

export default useKeyboardPaste;
