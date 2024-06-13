import React from 'react';
import { TextField, Typography, Box, Grid, Button } from '@mui/material';

const PersonalDataForm = ({ personalData, handlePersonalDataChange, handleNextStep }) => {
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
            />
          </Grid>

          {/* Fila 4 */}
          <Grid item xs={12}>
            <Button 
              variant="contained" 
              color="primary" 
              fullWidth 
              onClick={handleNextStep}
            >
              Siguiente
            </Button>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default PersonalDataForm;
