import { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Header } from './components/Header/Header';
import { InputArea } from './components/InputArea/InputArea';
import axios from 'axios';

import './App.scss';

function App() {
    // const isPasting = useKeyboardPaste();

    const handleFileUpload = async (file) => {
        // const reader = new FileReader();
        // reader.readAsDataURL(file);

        const formData = new FormData();
        formData.append('target', file);

        try {
            const response = await axios.post('/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log(response);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        window.addEventListener('paste', (e) => {
            const file = e.clipboardData.files[0];
            if (file) {
                handleFileUpload(file);
            }
        });
    }, []);

    return (
        <div className="App">
            <Helmet />
            <Header />
            <div className="container wrapper">
                <div>
                    <InputArea handleFileUpload={handleFileUpload} />
                </div>
            </div>
        </div>
    );
}

export default App;
