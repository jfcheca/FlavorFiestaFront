import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Box, Typography, Button, Alert } from '@mui/material';
import API_BASE_URL from "../../config";

const ConfirmEmail = () => {
  const { usuarioId, token } = useParams();
  const [error, setError] = useState(false);

  const confirmEmail = async () => {
    try {
      const response = await axios.put(
        `${API_BASE_URL}/usuarios/ActivarCuentaEstado/${usuarioId}`,
        { estado_cuenta: 'activo' },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response) {
        alert('Usuario activado');
      } 
    } catch (error) {
      setError(true);
    }
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="100vh">
      <Typography variant="h4" component="h1" gutterBottom>
        Confirmar Activación de Usuario
      </Typography>
      <Button variant="contained" color="primary" onClick={confirmEmail}>
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
