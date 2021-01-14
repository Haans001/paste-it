import { Helmet } from 'react-helmet';
import { Header } from './components/Header/Header';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import FilesView from './views/FilesView/FilesView';

import './App.scss';
import HomeView from './views/HomeView/HomeView';

function App() {
    return (
        <Router>
            <div className="App">
                <Helmet />
                <Header />
                <div className="container wrapper">
                    <Switch>
                        <Route exact path="/">
                            <HomeView />
                        </Route>
                        <Route path="/:roomID">
                            <FilesView />
                        </Route>
                    </Switch>
                </div>
            </div>
        </Router>
    );
}

export default App;
