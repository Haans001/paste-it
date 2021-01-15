/* eslint-disable no-unreachable */
import { useEffect } from 'react';
import useFileUpload from './useFileUpload';
import nanoid from '../utils/nanoid';

const usePasteEvent = (onUpload) => {
    const [handleFileUpload] = useFileUpload(onUpload);

    const handlePasteEvent = (e) => {
        const file = e.clipboardData.files[0];

        console.log(new Date());

        if (file) {
            const fileNameSplitted = file.name.split('.');
            const fileExtension = fileNameSplitted[fileNameSplitted.length - 1];
            const fileName = `${nanoid()}.${fileExtension}`;

            var blob = file.slice(0, file.size, file.type);
            const newFile = new File([blob], fileName, { type: file.type });

            handleFileUpload(newFile);
        }
    };

    useEffect(() => {
        window.removeEventListener('paste', handlePasteEvent);
        window.addEventListener('paste', handlePasteEvent);

        return () => {
            window.removeEventListener('paste', handlePasteEvent);
        };
    }, [handleFileUpload]);
};

export default usePasteEvent;
