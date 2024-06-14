import React from 'react';
import ContactForm from './ContactForm';
import './Contact.css';
import logoo from '../../assets/logoo.png';
import drink from '../../assets/drink.jpg';
import tel from '../../assets/tel.png';
import sobre from '../../assets/sobre.png';
import casa from '../../assets/casa.png';

const Contact = () => {
    return (
        <div className="container">
            <div className="form-section">
            <img src={logoo} alt="Flavor Fiesta" id="logo" />
                <ContactForm />
                <div className="contact-info">
                   <div className='info'> <img src={tel} alt="Phone icon" /> <div> <h6> PHONE </h6> <p> 602 4588887</p> </div> </div>
                   <div className='info'> <img src={sobre} alt="Email icon" /> <div> <h6> CORREO </h6> <p> info@flavorfiesta.com</p> </div> </div>
                   <div className='info'> <img src={casa} alt="Love icon" /> <div> <h6> HECHO CON AMOR </h6> <p> EN COLOMBIA</p> </div> </div>
                </div>
            </div>
            <div className="image-section">
                <img src={drink} alt="Bebida Flavor Fiesta" />
            </div>
        </div>
    );
};

export default Contact;
