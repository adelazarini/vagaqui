import React from 'react';
import './header.css';

const Header = () => {
    return (
        <header className="responsive-header">
            <div className="container">
                <nav className="header-nav">
                    <div className="logo">VagaQui</div>
                    <div className="menu-toggle">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                    <ul className="nav-links">
                        <li><a href="/vagas">Vagas</a></li>
                        <li><a href="/login">Login</a></li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;
