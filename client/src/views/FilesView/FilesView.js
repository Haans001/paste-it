import axios from 'axios';
import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import FileList from '../../components/FileList/FileList';
import { ReactComponent as AddIcon } from '../../assets/icons/add-icon.svg';
import Fade from '@material-ui/core/Fade';
import Backdrop from '@material-ui/core/Backdrop';
import { Modal, makeStyles, CircularProgress } from '@material-ui/core';
import { InputArea } from '../../components/InputArea/InputArea';

import './FilesView.scss';

const useStyles = makeStyles(() => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    }
}));

const FilesView = () => {
    const classes = useStyles();
    const { roomID } = useParams();
    const { enqueueSnackbar } = useSnackbar();
    const [data, setData] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);

    const handleClose = () => {
        setModalOpen(false);
    };

    const handleOpen = () => {
        setModalOpen(true);
    };

    const handleUpload = async () => {
        await getData();
        handleClose();
    };

    const getData = async () => {
        try {
            const response = await axios.get(`/file/get/${roomID}`);
            const data = response.data.data;
            setData(data);
        } catch (error) {
            const message = error.response.data.message || 'Server Error';
            enqueueSnackbar(message, { variant: 'error' });
        }
    };

    useEffect(() => getData(), []);

    return (
        <div className="files-view">
            <h1 style={{ color: 'white' }}>Hello in room {roomID}</h1>
            {data ? (
                <>
                    <FileList data={data} />
                    <Fade timeout={1000} in={true}>
                        <button className="files-view__add-file-button" onClick={handleOpen}>
                            <AddIcon />
                        </button>
                    </Fade>
                </>
            ) : (
                <Fade in={true}>
                    <div className="files-view__loading">
                        <CircularProgress style={{ width: '100px', height: '100px' }} />
                    </div>
                </Fade>
            )}

            <Modal
                open={modalOpen}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                closeAfterTransition
                className={classes.modal}
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: { enter: 500, exit: 500 }
                }}>
                <Fade in={modalOpen}>
                    <InputArea onUpload={handleUpload} />
                </Fade>
            </Modal>
        </div>
    );
};

export default FilesView;
