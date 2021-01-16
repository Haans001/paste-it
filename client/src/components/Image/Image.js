import PropTypes from 'prop-types';
import { ReactComponent as DownloadIcon } from '../../assets/icons/download-icon.svg';

import './Image.scss';

const Image = ({ url, fileName }) => {
    return (
        <div className="image">
            <img src={url} alt={fileName} className="image__content" />
            <a className="image__download-button" href={url} download>
                <DownloadIcon className="image__download-icon" />
            </a>
        </div>
    );
};

Image.propTypes = {
    url: PropTypes.string.isRequired,
    fileName: PropTypes.string.isRequired
};

export default Image;
