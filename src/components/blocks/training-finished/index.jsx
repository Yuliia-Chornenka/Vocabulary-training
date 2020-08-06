import React, { Component } from 'react';
import './index.scss';
import { Container } from '../../shared-ui/container';

export class TrainingFinished extends Component {
    render() {
        return (
            <Container>
                <p className='finish'>
                    Congratulations! Training finished 🏆
                </p>
            </Container>
        )
    }
}
