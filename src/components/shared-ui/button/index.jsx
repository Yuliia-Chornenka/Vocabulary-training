import React from 'react';
import './index.scss';

export const Button = ({ name, className, onClick }) => {
    return (
        <button className={`btn ${className}`} onClick={onClick}> { name } </button>
    );
};
