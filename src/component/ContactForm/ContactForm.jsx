import React, { useState } from 'react';
import './ContactForm.css';

const ContactForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        comment: '',
        how: ''
    });

    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const { name, email, comment, how } = formData;
        if (name && email && comment && how) {
            if (validateEmail(email)) {
                setMessage('Mensaje enviado correctamente');
                // Aquí va el código para enviar los datos al servidor
            } else {
                setMessage('Por favor, ingresa un correo electrónico válido');
            }
        } else {
            setMessage('Por favor, completa todos los campos');
        }
    };

    return (
        <div className="contact-form-container">
            <h2>¡Descubre la frescura y la diversión en cada lata!</h2>
            <p>Para cualquier consulta o comentario, no dudes en contactarnos. ¡Estamos aquí para tí! Para ayudarte y mejorar continuamente tu experiencia con nuestras bebidas.</p>
            <form onSubmit={handleSubmit} className="contact-form">
                <label htmlFor="name">Nombre</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Nombre *"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
                <label htmlFor="email">Correo</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Email *"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                <label htmlFor="comment">Déjanos tu comentario</label>
                <textarea
                    id="comment"
                    name="comment"
                    rows="4"
                    placeholder="Escribe aquí"
                    value={formData.comment}
                    onChange={handleChange}
                    required
                ></textarea>
                <br/>
                <select
                    id="how"
                    name="how"
                    value={formData.how}
                    onChange={handleChange}
                    required
                >
                    <option value="">¿Cómo nos encontraste?</option>
                    <option value="amigo">Recomendación de un amigo</option>
                    <option value="redes">Redes sociales</option>
                    <option value="google">Búsqueda en Google</option>
                </select>
                <button type="submit">ENVIAR MENSAJE</button>
            </form>
            {message && <p className="message">{message}</p>}
        </div>
    );
};

export default ContactForm;

