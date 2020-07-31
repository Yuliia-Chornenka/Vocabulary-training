import React from 'react';
import './index.scss';
import { Button } from '../../shared-ui/button';
import { Container } from "../../shared-ui/container";

export const NotFoundValue = ({ searchValue, blockName, createNewDeck, openNewRecordForm }) => {
    return (
        <Container>
            <p className='text'>
                oops, no {`'${searchValue}'-containing ${blockName}s found`}
            </p>
            <Button
                name={`Create '${searchValue}' ${blockName}`}
                className='btn__main'
                onClick={blockName === 'deck' ? createNewDeck : openNewRecordForm}
            />
        </Container>
    );
};
