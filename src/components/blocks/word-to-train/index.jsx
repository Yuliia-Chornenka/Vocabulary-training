import React from 'react';
import './index.scss';
import { Container } from '../../shared-ui/container';

export const WordToTrain = ({ wordFirstSide }) => {
        return (
            <Container>
                <p className='train-word'>
                    { wordFirstSide }
                </p>
            </Container>
        )
};
