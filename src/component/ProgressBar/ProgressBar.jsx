import React from 'react';
import { Box, Typography } from '@mui/material';
import './ProgressBar.css'; // Asegúrate de tener el archivo CSS

const ProgressBar = ({ step }) => {
  const steps = [
    { number: 1, title: 'Resumen del Carrito' },
    { number: 2, title: 'Datos Personales' },
    { number: 3, title: 'Pago' }
  ];

  return (
    <Box display="flex" justifyContent="space-between" alignItems="center" mb={4} position="relative" width="45%" paddingTop="100px">
      {steps.map((s, index) => (
        <Box 
          key={s.number} 
          display="flex" 
          flexDirection="column" 
          alignItems="center" 
          position="relative" 
          flex="1"
        >
          <Box
            position="relative"
            mb={1}
          >
            <Box 
              width={50} 
              height={50} 
              borderRadius="50%" 
              bgcolor={step >= s.number ? '#3f51b5' : 'gray'}
              color="white"
              display="flex"
              justifyContent="center"
              alignItems="center"
              fontSize="1.2rem"
              zIndex={1}
              className={step === s.number ? 'active-circle' : ''}
            >
              {s.number}
            </Box>
          </Box>
          <Typography variant="caption" mt={1}>{s.title}</Typography>
          {index < steps.length - 1 && (
            <Box
              position="absolute"
              top={`calc(50% - 20px)`} // Centra verticalmente respecto a la mitad del círculo
              left="calc(50% + 25px)" // Alinea a la derecha del círculo actual
              right="calc(-50% + 25px)" // Alinea a la izquierda del círculo siguiente
              height={2}
              bgcolor={step > s.number ? '#3f51b5' : 'gray'}
              transition="background-color 0.5s ease"
              zIndex={0}
            />
          )}
        </Box>
      ))}
    </Box>
  );
};

export default ProgressBar;
