import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedinIn, faXTwitter, faInstagram, faGithub } from '@fortawesome/free-brands-svg-icons';
import '../Styles/SocialIcons.css';

const SocialIcons = () => {
    return (
        <div className = "social-icons-container">
            <div className = "wrapper">
                <a href = 'https://www.linkedin.com/in/arthur-quinellato/' target = '_blank' className = "button">
                    <div className = "icon">
                        <div className = "i"><FontAwesomeIcon icon = {faLinkedinIn} /></div>
                    </div>
                    <span className = 'social-text'>LinkedIn</span>
                </a>
                <a href = 'https://github.com/Arthur1802' target = '_blank' className = "button">
                    <div className = "icon">
                        <div className = "i"><FontAwesomeIcon icon = {faGithub} /></div>
                    </div>
                    <span className = 'social-text'>GitHub</span>
                </a>
                <a href = 'https://www.instagram.com/arthur_qob' target = '_blank' className = "button">
                    <div className = "icon">
                        <div className = "i"><FontAwesomeIcon icon = {faInstagram} /></div>
                    </div>
                    <span className = 'social-text'>Instagram</span>
                </a>
                <a href = 'https://x.com/arthur_qob' target = '_blank' className = "button">
                    <div className = "icon">
                        <div className = "i"><FontAwesomeIcon icon = {faXTwitter} /></div>
                    </div>
                    <span className = 'social-text'>Twitter</span>
                </a>
            </div>
        </div>
    );
};

export default SocialIcons;