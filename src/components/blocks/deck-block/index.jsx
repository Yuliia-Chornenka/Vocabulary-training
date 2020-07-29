import React, { Component, Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import './index.scss';
import { Container } from '../../shared-ui/container';
import { ContainerTitle } from '../../shared-ui/container-title';
import { ProgressBar } from '../../shared-ui/progress-bar';
import { Button } from '../../shared-ui/button';
import { NotFoundValue } from '../not-found-value';

class DeckBlock extends Component {
    constructor(props) {
        super(props);
        this.state = { isDeckExist: true };
    }

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
    }

    searchedDecks = () => {
        const { decksArray, searchValue } = this.props;
        const searchedDecks = decksArray.filter((deck) => deck.title.indexOf(searchValue) > -1);
        this.setState({ isDeckExist: !!searchedDecks.length });
    };

    render() {
        const { backBtn, history, searchValue, decksArray } = this.props;
        const { isDeckExist } = this.state;
        return (
            <Fragment>
                {isDeckExist ? (
                    <Fragment>
                        {decksArray.filter((deck) => deck.title.indexOf(searchValue) > -1)
                            .map((deck, i) => (
                                <Container key={deck.id}>
                                    <ContainerTitle name={deck.title} />
                                    <ProgressBar />
                                    <p>{deck.learnedRecordsIds.length}/{deck.recordsIds.length} records
                                        learned</p>
                                    <p>Learning in progress</p>
                                    <div className='btn__container'>
                                        {backBtn
                                            ? <Button name='Back' className='btn__main'
                                                      onClick={history.goBack} />
                                            : <Link to={`/deck/${deck.id}`}>
                                                <Button name='See deck' className='btn__main' />
                                            </Link>}
                                        <Button name='Delete' className='btn__danger' />
                                    </div>
                                </Container>
                            ))
                        }
                    </Fragment>
                ) : (
                    <NotFoundValue
                        searchValue={searchValue}
                        blockName='deck'
                    />
                )}
            </Fragment>
        );
    }
}

export default withRouter(DeckBlock);
