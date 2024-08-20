import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import HamburgerMenuButton from './HamburgerMenuButton';
import '../Styles/NavBar.css';

const NavBar = () => {
    const [show, setShow] = useState(false);

    const toggleMenu = () => {
        setShow(!show);
    }

    return (
        <header>
            <div className = 'nav-container'>
                <h1 className = 'nav-brand'>Grocery List</h1>
                <nav className = 'in-header'>
                    <ul>
                        <li>
                            <NavLink className = 'nav-link' to = '/items'>Items</NavLink>
                        </li>
                        <li>
                            <NavLink className = 'nav-link' to = '/contact'>Contact</NavLink>
                        </li>
                        <li>
                            <NavLink className = 'nav-link' to = '/profile'>Profile</NavLink>
                        </li>
                        <li>
                            <NavLink className = 'nav-link' to = '/logout'>Log Out</NavLink>
                        </li>
                    </ul>
                </nav>
                <div className = 'menu-btn' onClick = {toggleMenu}>
                    <HamburgerMenuButton/>
                </div>
            </div>
            <nav className = {show ? 'show' : 'hide'} id = 'hidden-nav'>
                <ul>
                    <li>
                        <NavLink className = 'nav-link' to = '/items'>Items</NavLink>
                    </li>
                    <li>
                        <NavLink className = 'nav-link' to = '/contact'>Contact</NavLink>
                    </li>
                    <li>
                        <NavLink className = 'nav-link' to = '/profile'>Profile</NavLink>
                    </li>
                    <li>
                        <NavLink className = 'nav-link' to = '/logout'>Log Out</NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    );
}

export default NavBar;