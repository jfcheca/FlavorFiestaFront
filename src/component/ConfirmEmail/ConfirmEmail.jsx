import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Box, Typography, Button, Alert } from '@mui/material';
import API_BASE_URL from "../../config";
import logoImg from '../../assets/logoo.png';  // Importa la imagen

const ConfirmEmail = () => {
  const { usuarioId, token } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState(false);

  const confirmEmail = async () => {
    try {
      const response = await axios.put(
        `${API_BASE_URL}/usuarios/ActivarCuentaEstado/${usuarioId}`,
        { estado_cuenta: 'activo' },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.status === 200) {
        alert('Usuario activado');
        navigate('/login');  // Redirigir al login
      }
    } catch (error) {
      setError(true);
    }
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="100vh">
      <img src={logoImg} alt="Logo" style={{ marginBottom: '20px' }} />  {/* Añadir imagen aquí */}
      <Typography variant="h4" component="h1" gutterBottom>
        Bienvenido
      </Typography>
      <Typography variant="body1" component="p" gutterBottom>
        Gracias por registrarte en Flavor Fiesta. Estamos encantados de tenerte con nosotros.
      </Typography>
      <Button variant="contained" style={{ background: '#8FA206' }} onClick={confirmEmail}>
        Activar Usuario
      </Button>
      {error && (
        <Alert severity="error" style={{ marginTop: '20px' }}>
          Error al confirmar el correo electrónico. Por favor, inténtalo de nuevo.
        </Alert>
      )}
    </Box>
  );
};

export default ConfirmEmail;
