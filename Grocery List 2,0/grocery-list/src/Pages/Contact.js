import React from 'react';
import '../Styles/Contact.css';
import NavBar from '../Components/NavBar';

const Contact = () => {
    return (
        <div className = "contact">
            <NavBar/>
            <h1>Contact Us</h1>
            <p>For any queries, please contact us at:</p>
            <p>Email: <a href = "mailto:arthur.quinellato@gmail.com">arthur.quinellato@gmail.com</a></p>
            <p>Phone: +55 (21) 96523-6252</p>
        </div>
    );
}

export default Contact;