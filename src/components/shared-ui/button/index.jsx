import React from 'react';
import './index.scss';

export const Button = ({ name, className, onClick, ...restProps }) => {
    return (
        <button
            {...restProps}
            className={`btn ${className}`}
            onClick={onClick}>
            { name }
        </button>
    );
};
