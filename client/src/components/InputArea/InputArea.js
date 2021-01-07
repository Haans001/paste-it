import { useRef } from 'react';
import PropTypes from 'prop-types';
import { DropZone } from '../DropZone/DropZone';

import { ReactComponent as FileIcon } from '../../assets/icons/file.svg';
import './InputArea.scss';

export const InputArea = ({ handleFileUpload }) => {
    const input = useRef(null);

    const handleClick = () => {
        input.current.click();
    };

    const handleChange = (e) => handleFileUpload(e.target.files[0]);

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
        </div>
    );
};

InputArea.propTypes = {
    handleFileUpload: PropTypes.func.isRequired
};
