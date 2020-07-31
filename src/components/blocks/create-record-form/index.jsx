import React, { Component } from 'react';
import './index.scss';
import { Container } from '../../shared-ui/container';
import { Input } from '../../shared-ui/input';
import { Button } from "../../shared-ui/button";

export class CreateRecordForm extends Component {
    render() {
        const { handleChangeFirstSide, valueFirstSide, handleChangeSecondSide,
            valueSecondSide, createNewRecord, cancelCreationRecord } = this.props;
        const isCreateError = !valueFirstSide.length || !valueSecondSide.length;
        return (
            <Container>
                <p className='create__title'> create record </p>
                <p>First side</p>
                <Input
                    type='text'
                    placeholder='type here...'
                    onChange={handleChangeFirstSide}
                    value={valueFirstSide}
                />
                <p>Second side</p>
                <Input
                    type='text'
                    placeholder='type here...'
                    onChange={handleChangeSecondSide}
                    value={valueSecondSide}
                />
                <Button
                    name='Create record'
                    className='btn__main btn__margin'
                    onClick={createNewRecord}
                    disabled={isCreateError}
                />
                <Button
                    name='Cancel'
                    className='btn__danger btn__margin--top'
                    onClick={cancelCreationRecord}
                />
                {isCreateError && (
                    <p className='create__error'> enter first and second side </p>
                )}
            </Container>
        )
    }
}
