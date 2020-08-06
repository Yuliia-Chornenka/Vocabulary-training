import React, { Component, Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import './index.scss';
import { Container } from '../../shared-ui/container';
import { ContainerTitle } from '../../shared-ui/container-title';
import { ProgressBar } from '../../shared-ui/progress-bar';
import { Button } from '../../shared-ui/button';
import { NotFoundValue } from '../not-found-value';
import LexicoService from '../../../services/lexico-service';

class DeckBlock extends Component {
    constructor(props) {
        super(props);
        this.state = { isDeckExist: true };
    }

    lexicoService = new LexicoService();

    componentDidMount() {
        this.searchedDecks();
        const { isDeckPage } = this.props;
        if (isDeckPage) {
            this.setState({ isDeckExist: true });
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.searchValue !== prevProps.searchValue) {
            this.searchedDecks();
        }

        if (this.props.decksArray.length !== prevProps.decksArray.length) {
            this.render()
        }
    }

    searchedDecks = () => {
        const { decksArray, searchValue } = this.props;
        const valueStartSearch = searchValue.length > 1 ? searchValue : '';
        const searchedDecks = decksArray.filter((deck) => deck.title.indexOf(valueStartSearch) > -1);
        this.setState({ isDeckExist: !!searchedDecks.length });
    };

    deleteDeck = (id) => {
        const { history } = this.props;
        this.lexicoService.deleteDeck(id);
        history.push('/');
    };

    render() {
        const { backBtn, deleteBtn, history, searchValue, decksArray, createNewDeck, deleteDeck } = this.props;
        const { isDeckExist } = this.state;
        const valueStartSearch = searchValue.length > 1 ? searchValue : '';
        return (
            <Fragment>
                {isDeckExist ? (
                    <Fragment>
                        {decksArray.filter((deck) => deck.title.indexOf(valueStartSearch) > -1)
                            .map((deck) => (
                                <Container key={deck.id}>
                                    <ContainerTitle name={deck.title} />
                                    <ProgressBar className='progress-bar' />
                                    <p>
                                        {deck.learnedRecordsIds.length}/{deck.recordsIds.length} records learned
                                    </p>
                                    {deleteBtn && <p>Learning in progress</p>}
                                    <div className='btn__container'>
                                        {backBtn ?
                                            <Fragment>
                                                <Button
                                                    name='Back'
                                                    className='btn__main'
                                                    onClick={history.goBack}
                                                />
                                                {deleteBtn && <Button
                                                    name='Delete'
                                                    className='btn__danger'
                                                    onClick={() => this.deleteDeck(deck.id)}
                                                />}
                                            </Fragment>
                                            :
                                            <Fragment>
                                                <Link to={`/deck/${deck.id}`}>
                                                    <Button name='See deck' className='btn__main' />
                                                </Link>
                                                <Button
                                                    name='Delete'
                                                    className='btn__danger'
                                                    onClick={() => deleteDeck(deck.id)}
                                                />
                                            </Fragment>
                                        }
                                    </div>
                                </Container>
                            ))
                        }
                    </Fragment>
                ) : (
                    <NotFoundValue
                        searchValue={searchValue}
                        blockName='deck'
                        createNewDeck={createNewDeck}
                    />
                )}
            </Fragment>
        );
    }
}

export default withRouter(DeckBlock);
