import { ReactComponent as DownloadIcon } from '../../assets/icons/download-icon.svg';

import './Video.scss';

const Video = ({ url, fileName }) => {
    return (
        <div className="video">
            <div className="video__content-wrapper">
                <video controls className="video__content">
                    <source src={url} />
                    <track kind="captions" />
                </video>
                <a className="video__download-button" href={url} download>
                    <DownloadIcon className="video__download-icon" />
                </a>
            </div>
        </div>
    );
};

export default Video;
