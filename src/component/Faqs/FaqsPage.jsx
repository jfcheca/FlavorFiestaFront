import React from 'react';
import FaqsComponent from './FaqsComponent'; 
import faqImage from './faqs.jpg'; 
import { Container, Grid, Paper, Typography } from '@mui/material';
import './faqsStyle.css'; 

const Faqs = () => {
  return (
    <Container maxWidth="lg">
      <Grid container spacing={3}>
        {/* Columna de la imagen */}
        <Grid item xs={12} md={6}>
          <Paper style={{ padding: 0, margin: 0 }}>
            <img src={faqImage} alt="FAQs" style={{ width: '100%', display: 'block' }} />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <h2>Preguntas Frecuentes</h2>
          <Paper>
            <FaqsComponent />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Faqs;
