import React from 'react';
import './index.scss';

export const ContainerTitle = (props) => {
    return (
        <h2 className='container__title'>
            {props.name}
        </h2>
    )
};
