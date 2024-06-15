// src/ResetPassword.js

import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import './ResetPassword2.css';
import passwordImage from '../../assets/logoo.png'; // Asegúrate de tener una imagen en esta ruta o ajustar la ruta.

const ResetPassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className="reset-password-container">
      <img src={passwordImage} alt="Password Reset" className="password-image" />
      <h2>Establecer una nueva contraseña</h2>
      <div className="input-container">
        <label htmlFor="new-password">Nueva contraseña</label>
        <div className="password-input-container">
          <input
            type={showPassword ? 'text' : 'password'}
            id="new-password"
            placeholder="Nueva contraseña"
            className="resetpassword2-input"
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
          />
          <FontAwesomeIcon
            icon={showConfirmPassword ? faEyeSlash : faEye}
            onClick={toggleConfirmPasswordVisibility}
            className="password-icon"
          />
        </div>
      </div>
      <button className="reset-button">Restablecer nueva contraseña</button>
    </div>
  );
};

export default ResetPassword;
