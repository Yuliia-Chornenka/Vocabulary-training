import React from 'react';
import './index.scss';
import { Container } from '../../shared-ui/container';

export const TrainingFinished = () => {
        return (
            <Container>
                <p className='finish'>
                    Congratulations! Training finished
                    <span role="img" aria-label="trophy"> 🏆 </span>
                </p>
            </Container>
        )
};
