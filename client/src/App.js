import { Helmet } from 'react-helmet';
import { Header } from './components/Header/Header';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import FilesView from './views/FilesView/FilesView';
import HomeView from './views/HomeView/HomeView';
import SnackbarProvider from './context/SnackbarProvider/SnackbarProvider';

function App() {
    return (
        <Router>
            <SnackbarProvider>
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
            </SnackbarProvider>
        </Router>
    );
}

export default App;
