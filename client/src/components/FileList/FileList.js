import File from '../File/File';
import Image from '../Image/Image';

import './FileList.scss';

const FileList = ({ data }) => {
    const isImage = (fileType) => fileType && fileType.split('/')[0] === 'image';

    return data.map((file) => {
        return (
            <>
                <div key={file.key} className="file-container">
                    <p className="file__author">
                        Posted by <span>Anonymous</span>
                    </p>
                    {isImage(file.type) ? (
                        <Image url={file.url} file={file.name} />
                    ) : (
                        <File fileName={file.name} url={file.url} />
                    )}
                </div>
            </>
        );
    });
};

export default FileList;
