import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Box, Typography, CircularProgress } from '@mui/material';

const ConfirmEmail = () => {
  const { token } = useParams();
  const [status, setStatus] = useState('pending'); // pending, success, error

  useEffect(() => {
    const confirmEmail = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/usuarios/email&passdatos?email=yoserfenix@gmail.com&password=1234567`);
        if (response.data.success) {
          setStatus('success');
        } else {
          setStatus('error');
        }
      } catch (error) {
        setStatus('error');
      }
    };

    confirmEmail();
  }, [token]);

  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="100vh">
      {status === 'pending' && <CircularProgress />}
      {status === 'success' && (
        <Typography variant="h4" component="h1" gutterBottom>
          ¡Correo electrónico confirmado con éxito!
        </Typography>
      )}
      {status === 'error' && (
        <Typography variant="h4" component="h1" gutterBottom>
          Error al confirmar el correo electrónico. Por favor, inténtalo de nuevo.
        </Typography>
      )}
    </Box>
  );
};

export default ConfirmEmail;
