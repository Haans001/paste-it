/* eslint-disable no-unreachable */
import { useRef, useEffect, useState } from 'react';
import { DropZone } from '../DropZone/DropZone';
import { useSnackbar } from 'notistack';
import axios from 'axios';
import { ReactComponent as FileIcon } from '../../assets/icons/file.svg';
import { CircularProgress, Fade } from '@material-ui/core';
import { useParams } from 'react-router-dom';

import './InputArea.scss';
export const InputArea = ({ onUpload, ...props }) => {
    const input = useRef(null);
    const [isLoading, setLoading] = useState(false);
    const { enqueueSnackbar } = useSnackbar();
    const { roomID } = useParams();

    const handleClick = () => {
        input.current.click();
    };

    const handleChange = (e) => handleFileUpload(e.target.files[0]);

    const handleFileUpload = async (file) => {
        const formData = new FormData();
        formData.append('target', file);

        if (roomID) {
            formData.append('room_id', roomID);
        }

        try {
            setLoading(true);
            const response = await axios.post('/file/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setLoading(false);
            onUpload(response);
        } catch (error) {
            const message = error.response.data.message || 'Server Error';
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
        <div className="input-area__content" {...props}>
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
