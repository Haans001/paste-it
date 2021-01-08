import { Helmet } from 'react-helmet';
import { Header } from './components/Header/Header';
import { InputArea } from './components/InputArea/InputArea';

import './App.scss';

function App() {
    return (
        <div className="App">
            <Helmet />
            <Header />
            <div className="container wrapper">
                <div>
                    <InputArea />
                </div>
            </div>
        </div>
    );
}

export default App;
