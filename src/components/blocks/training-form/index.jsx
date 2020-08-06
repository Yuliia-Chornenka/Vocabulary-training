import React, { Component } from 'react';
import './index.scss';
import { Container } from '../../shared-ui/container';
import { Input } from '../../shared-ui/input';
import { ProgressBar } from "../../shared-ui/progress-bar";

export class TrainingForm extends Component {
    render() {
        const { label, handleChange,  value } = this.props;
        return (
            <Container>
                <p className='search__title'> {label} </p>
                <Input
                    type='text'
                    placeholder='type here...'
                    onChange={handleChange}
                    value={value}
                />
                <ProgressBar
                    className='progress-bar__big'
                />
            </Container>
        )
    }
}
