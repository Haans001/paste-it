import { File } from '../File/File';
import Image from '../Image/Image';

const FileList = ({ data }) => {
    const isImage = (fileType) => fileType && fileType.split('/')[0] === 'image';

    return data.map((file) => {
        if (isImage(file.fileType)) {
            return <Image />;
        }

        return <File fileName={file.name} url={file.url} key={file.key} />;
    });
};

export default FileList;
