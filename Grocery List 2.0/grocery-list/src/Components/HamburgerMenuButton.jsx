import React, { useState } from "react";
import '../Styles/HamburgerMenuButton.css';

const HamburgerMenuButton = ({ onClick , className }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    }

    return (
        <button className = {`nav-menu-btn ${isOpen ? 'open' : ''}`} onClick = {toggleMenu}>
            <svg id = 'menu-btn' viewBox = '0 0 100 100' fill = 'none' xmlns = 'http://www.w3.org/2000/svg'>
                <rect id = 'icon-bg' width = '100' height = '100'/>
                <g id = 'Frame 1'>
                    <rect width = '100' height = '100'/>
                    <rect className = 'bars' id = 'bar1' x = '10' y = '10' width = '80' height = '10' rx = '7.5'/>
                    <rect className = 'bars' id = 'bar2' x = '10' y = '45' width = '80' height = '10' rx = '7.5'/>
                    <rect className = 'bars' id = 'bar3' x = '10' y = '80' width = '80' height = '10' rx = '7.5'/>
                </g>
            </svg>
        </button>
    );
}

export default HamburgerMenuButton;