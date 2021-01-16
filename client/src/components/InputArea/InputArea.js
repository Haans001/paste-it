import { useRef } from 'react';
import PropTypes from 'prop-types';
import { DropZone } from '../DropZone/DropZone';
import { ReactComponent as FileIcon } from '../../assets/icons/file.svg';
import { CircularProgress, Fade } from '@material-ui/core';

import './InputArea.scss';
import useFileUpload from '../../hooks/useFileUpload';
export const InputArea = ({ onUpload, ...props }) => {
    const input = useRef(null);
    const [handleFileUpload, isLoading] = useFileUpload(onUpload);

    const handleClick = () => {
        input.current.click();
    };

    const handleChange = (e) => handleFileUpload(e.target.files[0]);

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

InputArea.propTypes = {
    onUpload: PropTypes.func
};
