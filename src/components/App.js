import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './blocks/header';
import { MainPage } from './pages/main-page';
import DeckPage from './pages/deck-page';
import LexicoService from '../services/lexico-service';


class App extends Component {
    lexicoService = new LexicoService();

    componentDidMount() {
        this.lexicoService.setInitialVocabulary();
    }

    render() {
        return (
            <Fragment>
                <Router>
                    <Header />
                    <Switch>
                        <Route path='/' exact component={MainPage} />
                        <Route path='/deck/:id' exact component={DeckPage} />
                        <Route render={() => <h2 className='not-found'>Page not found</h2>} />
                    </Switch>
                </Router>
            </Fragment>
        )
    };
}

export default App;
