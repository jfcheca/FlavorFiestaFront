import React, { useState } from 'react';
import 'react-credit-cards/es/styles-compiled.css';
import CreditCard from 'react-credit-cards';
import { TextField, Grid, Typography, Button, Dialog, DialogContent, DialogActions } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

function PaymentForm() {
  const [cardInfo, setCardInfo] = useState({
    cvc: '',
    expiry: '',
    focus: '',
    name: '',
    number: '',
  });
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCardInfo({ ...cardInfo, [name]: value });
  };

  const handleSubmit = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    navigate('/');
  };

  return (
    <>
      <Typography variant="h4" component="h1" gutterBottom>
        Forma de pago
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <CreditCard
            cvc={cardInfo.cvc}
            expiry={cardInfo.expiry}
            focused={cardInfo.focus}
            name={cardInfo.name}
            number={cardInfo.number}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            type="tel"
            name="number"
            label="Card Number"
            fullWidth
            value={cardInfo.number}
            onChange={handleInputChange}
            onFocus={(e) => setCardInfo({ ...cardInfo, focus: e.target.name })}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            type="text"
            name="name"
            label="Name on Card"
            fullWidth
            value={cardInfo.name}
            onChange={handleInputChange}
            onFocus={(e) => setCardInfo({ ...cardInfo, focus: e.target.name })}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            type="tel"
            name="expiry"
            label="Expiry (MM/YY)"
            fullWidth
            value={cardInfo.expiry}
            onChange={handleInputChange}
            onFocus={(e) => setCardInfo({ ...cardInfo, focus: e.target.name })}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            type="tel"
            name="cvc"
            label="CVC"
            fullWidth
            value={cardInfo.cvc}
            onChange={handleInputChange}
            onFocus={(e) => setCardInfo({ ...cardInfo, focus: e.target.name })}
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Submit Payment
          </Button>
        </Grid>
      </Grid>

      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <Grid container spacing={2} alignItems="center" justifyContent="center">
            <Grid item xs={12} style={{ textAlign: 'center' }}>
              <FontAwesomeIcon icon={faCheckCircle} size="4x" color="green" />
            </Grid>
            <Grid item xs={12} style={{ textAlign: 'center' }}>
              <Typography variant="h5" gutterBottom>
                ¡Gracias por tu compra!
              </Typography>
            </Grid>
            <Grid item xs={12} style={{ textAlign: 'center' }}>
              <Typography variant="body1">
                Tu pedido ha sido recibido con éxito.
              </Typography>
            </Grid>
            <Grid item xs={12} style={{ textAlign: 'center' }}>
              <Typography variant="body2">
                Nos emociono que hayas elegido Flavor Fiesta para disfrutar de nuestras bebidas refrescantes y únicos.
              </Typography>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Volver al inicio
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default PaymentForm;
