import React from 'react';
import './index.scss';
import { Container } from '../../shared-ui/container';
import { Input } from '../../shared-ui/input';

export const SearchForm = ({ label, handleChange, isMoreLetters, value }) => {
    return (
        <Container>
            <p className='search__title'> {label} </p>
            <Input
                type='text'
                placeholder='type here...'
                onChange={handleChange}
                value={value}
            />
            {isMoreLetters && (
                <p className='search__more-letters'> need more letters </p>
            )}
        </Container>
    )
};
