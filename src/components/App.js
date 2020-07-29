import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './blocks/header';
import { MainPage } from './pages/main-page';
import  DeckPage  from './pages/deck-page';

function App() {
    return (
        <Fragment>
            <Router>
                <Header />
                <Switch>
                    <Route path='/' exact component={MainPage}/>
                    <Route path='/deck/:id' exact component={DeckPage}/>
                    <Route render={() => <h2 className='not-found'>Page not found</h2>} />
                </Switch>
            </Router>
        </Fragment>
    );
}

export default App;
