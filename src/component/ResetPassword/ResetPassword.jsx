// src/ResetPassword.js

import React from 'react';
import './ResetPassword.css'; // Asegúrate de crear y estilizar este archivo CSS según sea necesario.
import passwordImage from '../../assets/logoo.png'; // Asegúrate de tener una imagen en esta ruta o ajustar la ruta.

const ResetPassword = () => {
  return (
    <div className="reset-password-container">
      <img src={passwordImage} alt="Password Reset" className="password-image" />
      <h2>Olvidé mi contraseña</h2>
      <p>Por favor introduzca su Email</p>
      <input placeholder="Email" className="resetpassword-input" />
      <button className="reset-button">Restablecer contraseña</button>
    </div>
  );
};

export default ResetPassword;
