import React, { Component, Fragment } from 'react';
import { SearchForm } from '../../blocks/search-form';
import DeckBlock from '../../blocks/deck-block';
import { Link, withRouter } from "react-router-dom";
import { Button } from "../../shared-ui/button";
import { RecordsList } from "../../blocks/records-list";
import LexicoService from "../../../services/lexico-service";

class DeckPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            decksArray: [],
            recordsList: [],
            searchValue: '',
            isMoreLetters: false,
        };
    }

    lexicoService = new LexicoService();

    componentDidMount() {
        const { match } = this.props;
        const { id } = match.params;
        const deck = this.lexicoService.getDeck(id);
        const recordsList = [];
        deck.recordsIds.forEach((recordId) => {
            const record = this.lexicoService.getRecord(recordId);
            recordsList.push(record);
        });
        this.setState({
            decksArray: [ deck ],
            recordsList: recordsList
        });
    }

    handleChange = (e) => {
        this.setState({
            searchValue: e.target.value.length > 1 ? e.target.value : '',
            isMoreLetters: e.target.value.length === 1
        });
    };

    render() {
        const { decksArray, recordsList, isMoreLetters, searchValue, } = this.state;
        return (
            <Fragment>
                <DeckBlock
                    backBtn={true}
                    decksArray={decksArray}
                    searchValue=''
                    isDeckPage={true}
                />
                <Link to='/deck/train'>
                    <Button name='Train' className='btn__second btn__big' />
                </Link>
                <SearchForm
                    label='to search or create records'
                    handleChange={this.handleChange}
                    value={searchValue}
                    isMoreLetters={isMoreLetters}
                />
                <RecordsList
                    list={recordsList}
                    searchValue={searchValue}
                />
            </Fragment>
        )
    }
}

export default withRouter(DeckPage);
