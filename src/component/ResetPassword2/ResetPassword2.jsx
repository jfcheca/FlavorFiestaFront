import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import './ResetPassword2.css';
import passwordImage from '../../assets/logoo.png'; // Asegúrate de tener una imagen en esta ruta o ajustar la ruta.

const ResetPassword2 = () => {
  const { usuarioId, token } = useParams();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [message, setMessage] = useState('');

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage('Las contraseñas no coinciden');
      return;
    }

    try {
      const response = await fetch(`http://localhost:8080/usuarios/forgotPassword/${usuarioId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ password }),
      });

      if (response.ok) {
        setMessage('Contraseña restablecida exitosamente');
      } else {
        const data = await response.json();
        setMessage(data.message || 'Error al restablecer la contraseña');
      }
    } catch (error) {
      setMessage('Error al conectar con el servidor');
    }
  };

  return (
    <div className="reset-password-container2">
      <img src={passwordImage} alt="Password Reset" className="password-image" />
      <h2>Establecer una nueva contraseña</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label htmlFor="new-password">Nueva contraseña</label>
          <div className="password-input-container">
            <input
              type={showPassword ? 'text' : 'password'}
              id="new-password"
              placeholder="Nueva contraseña"
              className="resetpassword2-input"
              value={password}
              onChange={handlePasswordChange}
            />
            <FontAwesomeIcon
              icon={showPassword ? faEyeSlash : faEye}
              onClick={togglePasswordVisibility}
              className="password-icon"
            />
          </div>
        </div>
        <div className="input-container">
          <label htmlFor="confirm-password">Confirma contraseña</label>
          <div className="password-input-container">
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              id="confirm-password"
              placeholder="Confirma contraseña"
              className="resetpassword2-input"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
            />
            <FontAwesomeIcon
              icon={showConfirmPassword ? faEyeSlash : faEye}
              onClick={toggleConfirmPasswordVisibility}
              className="password-icon"
            />
          </div>
        </div>
        <button type="submit" className="reset-button2">Restablecer nueva contraseña</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ResetPassword2;
