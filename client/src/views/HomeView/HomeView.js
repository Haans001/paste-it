/* eslint-disable jsx-a11y/mouse-events-have-key-events */
import React from 'react';
import { InputArea } from '../../components/InputArea/InputArea';
import { useHistory } from 'react-router-dom';
import usePasteEvent from '../../hooks/usePasteEvent';

import './HomeView.scss';

const MainPage = () => {
    const history = useHistory();

    const handleUpload = (response) => {
        const roomID = response.data.id;
        history.push('/' + roomID);
    };

    usePasteEvent(handleUpload);

    return (
        <div className="input-area-container">
            <InputArea onUpload={handleUpload} />
        </div>
    );
};

export default MainPage;
