import React from 'react';
import PropTypes from 'prop-types';

import './Image.scss';

const Image = ({ url, fileName }) => {
    return (
        <div className="image">
            <img src={url} alt={fileName} className="image__content" />
        </div>
    );
};

Image.propTypes = {
    url: PropTypes.string.isRequired,
    fileName: PropTypes.string.isRequired
};

export default Image;
