import React, { useEffect, useRef, useState } from 'react';
import './ResetPassword.css'; // Archivo CSS para estilos específicos del componente
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import API_BASE_URL from "../../config";
import passwordImage from '../../assets/logoo.png'; // Ruta a la imagen del logo (ajusta según tu estructura de archivos)

const ResetPassword = () => {
  const paragraphRef = useRef(null); // Referencia para el párrafo que contiene el texto de introducción
  const [elementWidth, setElementWidth] = useState(0); // Estado para almacenar el ancho del párrafo
  const [email, setEmail] = useState(''); // Estado para el correo electrónico introducido en el input
  const [showAlert, setShowAlert] = useState(false); // Estado para controlar la visibilidad de la alerta
  const [error, setError] = useState(''); // Estado para almacenar el mensaje de error

  useEffect(() => {
    // Efecto de useEffect para calcular el ancho del párrafo una vez que se monta el componente
    if (paragraphRef.current) {
      setElementWidth(paragraphRef.current.offsetWidth); // Obtiene el ancho real del párrafo y lo establece en el estado
    }
  }, []);

  const handleResetPassword = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/forgotPassword`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setShowAlert(true); // Mostrar la alerta 
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Hubo un problema al procesar tu solicitud.');
      }
    } catch (error) {
      setError('Hubo un error al enviar la solicitud. Por favor, inténtalo de nuevo.');
      console.error('Error al enviar la solicitud:', error);
    }
  };

  const handleInputChange = (event) => {
    setEmail(event.target.value); // Actualiza el estado del correo electrónico al cambiar el input
    setError(''); // Limpiar el error al cambiar el input
  };

  return (
    <div className="reset-password-container">
      <img src={passwordImage} alt="Password Reset" className="password-image" />
      <h2>¡Olvidé mi contraseña!</h2>
      <p ref={paragraphRef} className="resetpassword-paragraph">
        Por favor introduzca su dirección de correo electrónico <br /> para recibir un enlace de restablecimiento de contraseña
      </p>
      <div className="input-group" style={{ width: elementWidth }}>
        <label htmlFor="email" className="resetpassword-label">Correo</label>
        <input
          id="email"
          type="email"
          placeholder="Email"
          className="resetpassword-input"
          value={email}
          onChange={handleInputChange}
          disabled={showAlert} // Deshabilitar input si showAlert es true
        />
        {error && <div className="error-alert">{error}</div>}
      </div>
      <button
        className="reset-button"
        style={{ width: elementWidth }}
        onClick={handleResetPassword}
        disabled={showAlert} // Deshabilitar botón si showAlert es true
      >
        Restablecer mi contraseña
      </button>

      {showAlert && (
        <div className="custom-alert">
          <div className="alert-icon">
            <FontAwesomeIcon icon={faEnvelope} size="2x" /> {/* Icono de correo electrónico de FontAwesome */}
          </div>
          <h3>solo queda un paso, verifica tu correo</h3>
          <p>Hemos enviado un correo a <strong>{email}</strong> con las instrucciones para que puedas restablecer tu contraseña.</p>
          <p>Por favor, revisa tu bandeja de entrada y la carpeta de spam. Ten en cuenta que el enlace de restablecimiento de contraseña será válido por 24 horas.</p>
        </div>
      )}
    </div>
  );
};

export default ResetPassword;
