import React, { Component, Fragment } from 'react';
import './index.scss';
import { ProgressBar } from '../../shared-ui/progress-bar';
import { Button } from '../../shared-ui/button';
import { Container } from "../../shared-ui/container";
import NotFoundValue from '../not-found-value';
import  { CreateRecordForm}  from '../create-record-form';
import LexicoService from "../../../services/lexico-service";

export class RecordsList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isRecordExist: true,
            isNewRecordForm: false,
        };
    }
    lexicoService = new LexicoService();

    componentDidUpdate(prevProps) {
        if (this.props.searchValue !== prevProps.searchValue) {
            this.searchRecords();
        }
    }

    searchRecords = () => {
        const { list, searchValue } = this.props;
        const valueStartSearch = searchValue.length > 1 ? searchValue : '';
        const searchedRecords = list.filter((record) => record.firstSide.indexOf(valueStartSearch) > -1
            || record.secondSide.indexOf(valueStartSearch) > -1);
        this.setState({ isRecordExist: !!searchedRecords.length });
    };

    render() {
        const { list, searchValue, handleChange, openNewRecordForm, isNewRecordForm, handleChangeSecondSide,
            valueSecondSide, createNewRecord, cancelCreationRecord, deleteRecord } = this.props;
        const { isRecordExist } = this.state;
        const valueStartSearch = searchValue.length > 1 ? searchValue : '';
        return (
            <Fragment>
                {(isRecordExist && !!list.length) &&
                <Container>
                    <ul className='list'>
                        {list.filter((record) => record.firstSide.indexOf(valueStartSearch) > -1
                            || record.secondSide.indexOf(valueStartSearch) > -1)
                            .map((record, i) => (
                                <li
                                    key={record.id}
                                    className='list__item'
                                >
                                    <div className='list__item-container'>
                                        <p className='list__item-name list__item-name--bold'>{record.firstSide}</p>
                                        <ProgressBar
                                            height='2px'
                                            marginTop='0'
                                            percent={ (record.iteration / 5) * 100}
                                            colored={false}
                                        />
                                        <p className='list__item-name list__item-name--italic'>{record.secondSide}</p>
                                    </div>
                                    <Button
                                        name='Delete'
                                        className='btn__danger'
                                        onClick={()=>deleteRecord(record.id)}
                                    />
                                </li>
                            ))}
                    </ul>
                </Container>}

                {(!isRecordExist && !isNewRecordForm) &&
                <NotFoundValue
                    searchValue={searchValue}
                    blockName='record'
                    openNewRecordForm={openNewRecordForm}
                />}
                {isNewRecordForm &&
                <CreateRecordForm
                    handleChangeFirstSide={handleChange}
                    valueFirstSide={searchValue}
                    handleChangeSecondSide={handleChangeSecondSide}
                    valueSecondSide={valueSecondSide}
                    createNewRecord={createNewRecord}
                    cancelCreationRecord={cancelCreationRecord}
                />}
            </Fragment>
        );
    }
}
