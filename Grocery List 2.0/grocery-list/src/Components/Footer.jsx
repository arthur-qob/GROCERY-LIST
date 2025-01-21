import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import SocialIcons from "./SocialIcons";
import '../Styles/Footer.css';

const Footer = () => {
    useEffect(() => {
        const footerContainer = document.querySelector('.footer-container');
        const footerForm = document.querySelector('.footer-form');
        const group1 = document.querySelector('.group1');
        
        if (!footerContainer || !footerForm || !group1) {
            console.error('One or more elements not found');
            return;
        }

        const footerWidth = footerContainer.offsetWidth;
        const padding = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--footer-padding')) || 0;
        const footerContentWidth = (footerWidth - padding) / 2;

        footerForm.style.width = `${footerContentWidth}px`;
        group1.style.width = `${footerContentWidth}px`;
    }, []);

    return (
        <footer>
            <div className = "footer-container">
                <div className = "group1">
                    <SocialIcons />
                </div>
                <form className = 'footer-form' action = 'mailto:arthur.quinellato@gmail.com' method = 'POST'>
                    <table className = 'footer-table'>
                        <tbody>
                            <tr>
                                <td>
                                    <input
                                        type = 'text'
                                        placeholder = 'First Name'
                                        className = 'footer-inputs'
                                    />
                                </td>
                                <td>
                                    <input
                                        type = 'text'
                                        placeholder = 'Last Name'
                                        className = 'footer-inputs'
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td colSpan = {2}>
                                    <input
                                        type = 'email'
                                        placeholder = 'Email'
                                        className = 'footer-inputs email'
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td colSpan = {2}>
                                    <input
                                        type = 'text'
                                        placeholder = 'Topic of your message'
                                        className = 'footer-inputs topic'
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td colSpan = {2}>
                                    <textarea
                                    placeholder = 'Your message'
                                        className = 'footer-textarea'
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <button type = 'submit' className = 'footer-btns'>Send</button>
                                </td>
                                <td>
                                    <button type = 'reset' className = 'footer-btns'>Reset</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </form>
            </div>
            <p className = 'footer-text'>©{new Date().getFullYear()} Grocery List - by <a className = 'footer-text-link' href = ''>Arthur Quinellato</a></p>
        </footer>
    );
}

export default Footer;