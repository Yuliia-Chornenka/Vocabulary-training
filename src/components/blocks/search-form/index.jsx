import React, { Component } from 'react';
import './index.scss';
import { Container } from '../../shared-ui/container';
import { Input } from '../../shared-ui/input';

export class SearchForm extends Component {
    render() {
        const { label, handleChange, isMoreLetters } = this.props;
        return (
            <Container>
                <p className='search__title'> {label} </p>
                <Input
                    type='text'
                    placeholder='type here...'
                    onChange={handleChange}
                />
                {isMoreLetters && (
                    <p className='search__more-letters'> need more letters </p>
                )}
            </Container>
        )
    }
}
