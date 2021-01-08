import { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { DropZone } from '../DropZone/DropZone';
import { useSnackbar } from 'notistack';
import axios from 'axios';
import Fade from '../../utils/Fade';

import { ReactComponent as FileIcon } from '../../assets/icons/file.svg';
import './InputArea.scss';
import { CircularProgress } from '@material-ui/core';

export const InputArea = () => {
    const input = useRef(null);
    const { enqueueSnackbar } = useSnackbar();
    const [isLoading, setLoading] = useState(false);

    const handleClick = () => {
        input.current.click();
    };

    const handleChange = (e) => handleFileUpload(e.target.files[0]);

    const handleFileUpload = async (file) => {
        const formData = new FormData();
        formData.append('target', file);

        try {
            setLoading(true);
            const response = await axios.post('/file/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setLoading(false);
        } catch (error) {
            const message = error.response.data.message;
            enqueueSnackbar(message, { variant: 'error' });
            setLoading(false);
        }
    };

    useEffect(() => {
        window.addEventListener('paste', (e) => {
            const file = e.clipboardData.files[0];
            if (file) {
                handleFileUpload(file);
            }
        });
    }, []);

    return (
        <div className="input-area">
            <h3 className="input-area__heading">Upload file</h3>
            <DropZone handleFileUpload={handleFileUpload} />
            <div className="input-area__divider">or</div>
            <input
                ref={input}
                type="file"
                style={{ display: 'none' }}
                onChange={handleChange}></input>
            <button className="input-area__file-input" onClick={handleClick}>
                Choose file from computer
                <FileIcon />
            </button>
            <Fade in={isLoading}>
                <div className="input-area__loading-overlay">
                    <CircularProgress className="input-area__loading-icon" />
                </div>
            </Fade>
        </div>
    );
};
