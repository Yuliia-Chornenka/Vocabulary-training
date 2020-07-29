import React from 'react';
import { Link } from 'react-router-dom';
import './index.scss';

function Header() {
    return (
        <Link to='/'>
            <h1 className='title'>Lexico</h1>
        </Link>
    );
}

export default Header;
