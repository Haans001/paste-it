import React from 'react';
import { Link } from 'react-router-dom';
import './Header.scss';

export const Header = () => {
    return (
        <header className="header">
            <Link to="/">Paste.com</Link>
        </header>
    );
};
