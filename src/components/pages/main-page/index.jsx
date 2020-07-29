import React, { Component, Fragment } from 'react';
import { AppBlock } from '../../blocks/app-block';
import { SearchForm } from '../../blocks/search-form';
import DeckBlock from '../../blocks/deck-block';
import { NotFoundValue } from '../../blocks/not-found-value';
import LexicoService from '../../../services/lexico-service';

export class MainPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isVocabulary: false,
            searchValue: '',
            isMoreLetters: false,
            decksArray: []
        };
    }

    lexicoService = new LexicoService();

    componentDidMount() {
        const vocabulary = this.lexicoService.getVocabulary();
        this.setState({
            isVocabulary: !!vocabulary,
            decksArray: vocabulary ? vocabulary.decks : []
        });
    }

    loadVocabulary = () => {
        this.reader = new FileReader();
        this.reader.onload = (event) => {
            const { result } = event.target;
            this.lexicoService.importVocabulary(result).then(
                result => {
                    this.setState({
                        isVocabulary: true,
                        decksArray: result.decks,
                    });
                },
            );
        };
    };

    onFileChange = (event) => {
        const { files } = event.target;
        if (files.length > 0) {
            this.reader.readAsText(files[0]);
        }
    };

    resetVocabulary = () => {
        this.lexicoService.deleteVocabulary().then(
            () => this.setState({ isVocabulary: false })
        )
    };

    handleChange = (e) => {
        this.setState({
            searchValue: e.target.value.length > 1 ? e.target.value : '',
            isMoreLetters: e.target.value.length === 1
        });
    };

    render() {
        const { isVocabulary, isMoreLetters, searchValue, decksArray } = this.state;
        return (
            <Fragment>
                <AppBlock
                    isVocabulary={isVocabulary}
                    loadVocabulary={this.loadVocabulary}
                    onFileChange={this.onFileChange}
                    resetVocabulary={this.resetVocabulary}
                />
                <SearchForm
                    label='to search or create decks'
                    handleChange={this.handleChange}
                    value={searchValue}
                    isMoreLetters={isMoreLetters}
                />
                {isVocabulary && (
                    <DeckBlock
                        backBtn={false}
                        searchValue={searchValue}
                        decksArray={decksArray}
                        isDeckPage={false}
                    />
                )}
                {(!isVocabulary && searchValue) && (
                    <NotFoundValue
                        searchValue={searchValue}
                        blockName='deck'
                    />
                )}
            </Fragment>
        )
    };
}
