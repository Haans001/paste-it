import React from 'react';
import PropTypes from 'prop-types';
import { ReactComponent as UploadIcon } from '../../assets/icons/upload.svg';

import './DropZone.scss';

export const DropZone = ({ handleFileUpload }) => {
    const dragOver = (e) => {
        e.preventDefault();
    };

    const dragEnter = (e) => {
        e.preventDefault();
    };

    const dragLeave = (e) => {
        e.preventDefault();
    };

    const fileDrop = (e) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];

        handleFileUpload(file);
    };

    return (
        <div
            className="drop-zone"
            onDragOver={dragOver}
            onDragEnter={dragEnter}
            onDragLeave={dragLeave}
            onDrop={fileDrop}>
            <UploadIcon />
            <p>Drag your file here</p>
        </div>
    );
};

DropZone.propTypes = {
    handleFileUpload: PropTypes.func.isRequired
};
