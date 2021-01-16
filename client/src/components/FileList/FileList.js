import File from '../File/File';
import Image from '../Image/Image';
import Video from '../Video/Video';

import './FileList.scss';

const IMAGE = 'image';
const VIDEO = 'video';

const FileList = ({ data }) => {
    const isImage = (fileType) => fileType && fileType.split('/')[0] === 'image' && IMAGE;
    const isVideo = (fileType) => fileType && fileType.split('/')[0] === 'video' && VIDEO;

    const fileRenderSwitch = (file) => {
        if (isImage(file.type)) return <Image url={file.url} fileName={file.name} />;
        if (isVideo(file.type)) return <Video url={file.url} fileName={file.name} />;
        return <File fileName={file.name} url={file.url} />;
    };

    return data.map((file) => {
        return (
            <div key={file.key} className="file-container">
                <p className="file__author">
                    Posted by <span>Anonymous</span>
                </p>
                {fileRenderSwitch(file)}
            </div>
        );
    });
};

export default FileList;
