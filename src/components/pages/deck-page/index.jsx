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
            isNewRecordForm: false,
            valueSecondSide: ''
        };
    }

    lexicoService = new LexicoService();

    componentDidMount() {
        this.getRecordsList();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.state.recordsList.length !== prevState.recordsList.length) {
            this.getRecordsList();
            this.setState({
                isNewRecordForm: false,
                searchValue: '',
            });
        }
    }

    getRecordsList = () => {
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
    };

    handleChange = (e) => {
        this.setState({
            searchValue: e.target.value,
            isMoreLetters: e.target.value.length === 1
        });
    };

    handleChangeSecondSide = (e) => {
        this.setState({ valueSecondSide: e.target.value });
    };

    openNewRecordForm = () => {
        this.setState({ isNewRecordForm: true });
    };

    createNewRecord = () => {
        const { searchValue, valueSecondSide } = this.state;
        const { match } = this.props;
        const { id } = match.params;
        this.lexicoService.createRecord(searchValue, valueSecondSide, id).then(
            result => {
                this.setState({
                    recordsList: result.records,
                    valueSecondSide: ''
                });
            },
        );
    };

    cancelCreationRecord = () => {
        this.setState({
            isNewRecordForm: false,
            searchValue: '',
        })
    };

    deleteRecord = (recordId) => {
        const { match } = this.props;
        const { id } = match.params;
        this.lexicoService.deleteRecord(recordId, id).then(
            result => {
                this.setState({ recordsList: result.records });
            },
        );
    };

    render() {
        const { decksArray, recordsList, isMoreLetters, searchValue, isNewRecordForm, valueSecondSide } = this.state;
        return (
            <Fragment>
                <DeckBlock
                    backBtn={true}
                    decksArray={decksArray}
                    searchValue=''
                    isDeckPage={true}
                />
                <Link to='/deck/train'>
                    <Button
                        name='Train'
                        className='btn__second btn__big'
                        disabled={!recordsList.length}
                    />
                </Link>
                {!isNewRecordForm &&
                <SearchForm
                    label='to search or create records'
                    handleChange={this.handleChange}
                    value={searchValue}
                    isMoreLetters={isMoreLetters}
                />}
                <RecordsList
                    list={recordsList}
                    searchValue={searchValue}
                    handleChange={this.handleChange}
                    openNewRecordForm={this.openNewRecordForm}
                    handleChangeSecondSide={this.handleChangeSecondSide}
                    valueSecondSide={valueSecondSide}
                    isNewRecordForm={isNewRecordForm}
                    createNewRecord={this.createNewRecord}
                    cancelCreationRecord={this.cancelCreationRecord}
                    deleteRecord={this.deleteRecord}
                />
            </Fragment>
        )
    }
}

export default withRouter(DeckPage);
