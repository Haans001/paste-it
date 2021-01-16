/* eslint-disable no-unreachable */
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useSnackbar } from 'notistack';

const useFileUpload = (onUpload, onError) => {
    const { roomID } = useParams();
    const [isLoading, setLoading] = useState(false);
    const { enqueueSnackbar } = useSnackbar();

    const handleFileUpload = async (file) => {
        const formData = new FormData();
        formData.append('target', file);
        formData.append('date', new Date().toUTCString());

        if (roomID) {
            formData.append('room_id', roomID);
        }

        try {
            setLoading(true);
            const response = await axios.post('/file/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'access-control-allow-origin': '*'
                }
            });
            setLoading(false);

            if (onUpload) onUpload(response);

            return response;
        } catch (error) {
            const message = error.response ? error.response.data.message : 'Server Error';
            console.log(error.response);
            enqueueSnackbar(message, { variant: 'error' });
            setLoading(false);
            if (onError) onError(error);
        }
    };

    return [handleFileUpload, isLoading];
};

export default useFileUpload;
