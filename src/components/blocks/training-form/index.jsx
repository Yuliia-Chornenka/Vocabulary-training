import React from 'react';
import './index.scss';
import { Container } from '../../shared-ui/container';
import { Input } from '../../shared-ui/input';
import { ProgressBar } from "../../shared-ui/progress-bar";

export const TrainingForm = ({ label, handleChange, value, progressPercent }) => {
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
                    height='5px'
                    marginTop='20px'
                    percent={progressPercent}
                    colored={true}
                />
            </Container>
        )
};
