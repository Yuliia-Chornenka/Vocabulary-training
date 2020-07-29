import React, { Component, Fragment } from 'react';
import './index.scss';
import { ProgressBar } from '../../shared-ui/progress-bar';
import { Button } from '../../shared-ui/button';
import { Container } from "../../shared-ui/container";
import { NotFoundValue } from '../not-found-value';

export class RecordsList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isRecordExist: true,
        };
    }

    componentDidUpdate(prevProps) {
        if (this.props.searchValue !== prevProps.searchValue) {
            this.searchedDecks();
        }
    }

    searchedDecks = () => {
        const { list, searchValue } = this.props;
        const searchedRecords = list.filter((record) => record.firstSide.indexOf(searchValue) > -1
            || record.secondSide.indexOf(searchValue) > -1);
        this.setState({
            isRecordExist: !!searchedRecords.length,
        });
    };


    render() {
        const { list, searchValue } = this.props;
        const { isRecordExist } = this.state;
        return (
            <Fragment>
                {isRecordExist ? (
                    <Container>
                        <ul className='list'>
                            {list.filter((record) => record.firstSide.indexOf(searchValue) > -1
                                || record.secondSide.indexOf(searchValue) > -1)
                                .map((record, i) => (
                                    <li
                                        key={record.id}
                                        className='list__item'
                                    >
                                        <div className='list__item-container'>
                                            <p className='list__item-name list__item-name--bold'>{record.firstSide}</p>
                                            <ProgressBar />
                                            <p className='list__item-name list__item-name--italic'>{record.secondSide}</p>
                                        </div>
                                        <Button name='Delete' className='btn__danger' />
                                    </li>
                                ))}
                        </ul>
                    </Container>
                ) : (
                    <NotFoundValue
                        searchValue={searchValue}
                        blockName='record'
                    />
                )}
            </Fragment>
        );
    }
}
