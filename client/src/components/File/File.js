import React from 'react';
import PropTypes from 'prop-types';
import { ReactComponent as DownloadIcon } from '../../assets/icons/download-icon.svg';

import './File.scss';
import { Fade } from '@material-ui/core';

const File = ({ url, fileName, ...props }) => {
    return (
        <Fade in={true} timeout={500}>
            <div className="file" {...props}>
                <div className="file__content">
                    <p className="content__title">{fileName}</p>
                    <a href={url} download className="content__download-link">
                        <DownloadIcon className="content__icon content__icon--download" />
                    </a>
                </div>
            </div>
        </Fade>
    );
};

File.propTypes = {
    url: PropTypes.string.isRequired,
    fileName: PropTypes.string.isRequired
};

export default File;
