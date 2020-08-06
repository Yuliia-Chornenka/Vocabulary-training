import React, { Component } from 'react';
import './index.scss';
import { Container } from '../../shared-ui/container';

export class WordToTrain extends Component {
    render() {
        const { wordFirstSide } = this.props;
        return (
            <Container>
                <p className='train-word'>
                    { wordFirstSide }
                </p>
            </Container>
        )
    }
}
