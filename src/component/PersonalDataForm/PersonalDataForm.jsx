import React, { useContext, useState } from 'react';
import { TextField, Typography, Box, Grid, Button } from '@mui/material';
import { AppContext } from '../AppContext/AppContext'; // Ajusta la ruta según corresponda
import { styled } from '@mui/system';

const PersonalDataForm = ({ handleNextStep }) => {
  const { personalData, setPersonalData } = useContext(AppContext);
  const [errors, setErrors] = useState({});

  const handlePersonalDataChange = (e) => {
    const { name, value } = e.target;
    setPersonalData({
      ...personalData,
      [name]: value
    });
  };

  const validate = () => {
    const newErrors = {};

    if (!personalData.nombre) newErrors.nombre = 'El nombre es requerido';
    if (!personalData.apellido) newErrors.apellido = 'El apellido es requerido';
    if (!personalData.direccion) newErrors.direccion = 'La dirección es requerida';
    if (!personalData.apartamento) newErrors.apartamento = 'El apartamento es requerido';
    if (!personalData.ciudad) newErrors.ciudad = 'La ciudad es requerida';
    if (!personalData.codigoPostal) newErrors.codigoPostal = 'El código postal es requerido';

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleNextClick = () => {
    if (validate()) {
      handleNextStep();
    }
  };

// Estilos personalizados utilizando `styled`
const CustomButton = styled(Button)({
  backgroundColor: '#8FA206',
  '&:hover': {
    backgroundColor: '#8FA206',
  },
});

  return (
    <>
      <Typography variant="h4" component="h1" gutterBottom>
        Datos personales y dirección
      </Typography>
      <Box component="form" sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          {/* Fila 1 */}
          <Grid item xs={12} md={6}>
            <TextField
              label="Nombre"
              name="nombre"
              value={personalData.nombre}
              onChange={handlePersonalDataChange}
              fullWidth
              margin="normal"
              error={!!errors.nombre}
              helperText={errors.nombre}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Apellido"
              name="apellido"
              value={personalData.apellido}
              onChange={handlePersonalDataChange}
              fullWidth
              margin="normal"
              error={!!errors.apellido}
              helperText={errors.apellido}
            />
          </Grid>
          
          {/* Fila 2 */}
          <Grid item xs={12}>
            <TextField
              label="Dirección"
              name="direccion"
              value={personalData.direccion}
              onChange={handlePersonalDataChange}
              fullWidth
              margin="normal"
              error={!!errors.direccion}
              helperText={errors.direccion}
            />
          </Grid>

          {/* Fila 3 */}
          <Grid item xs={12} md={4}>
            <TextField
              label="Apartamento, piso, etc."
              name="apartamento"
              value={personalData.apartamento}
              onChange={handlePersonalDataChange}
              fullWidth
              margin="normal"
              error={!!errors.apartamento}
              helperText={errors.apartamento}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              label="Ciudad"
              name="ciudad"
              value={personalData.ciudad}
              onChange={handlePersonalDataChange}
              fullWidth
              margin="normal"
              error={!!errors.ciudad}
              helperText={errors.ciudad}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              label="Código Postal"
              name="codigoPostal"
              value={personalData.codigoPostal}
              onChange={handlePersonalDataChange}
              fullWidth
              margin="normal"
              error={!!errors.codigoPostal}
              helperText={errors.codigoPostal}
            />
          </Grid>

          {/* Fila 4 */}
          <Grid item xs={12}>
            <CustomButton  
              variant="contained"  
              fullWidth 
              onClick={handleNextClick}
            >
              Siguiente
            </CustomButton>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default PersonalDataForm;
