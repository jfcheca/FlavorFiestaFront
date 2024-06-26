import React, { useState, useContext } from 'react';
import 'react-credit-cards/es/styles-compiled.css';
import CreditCard from 'react-credit-cards';
import { TextField, Grid, Typography, Button, Dialog, DialogContent, DialogActions } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../AppContext/AppContext';
import { AuthContext } from '../AuthContext/AuthContext';
import { styled } from '@mui/system';
import CryptoJS from 'crypto-js';
import { useOrdenProductos } from '../OrderProductContext/OrderProductContext';
import API_BASE_URL from "../../config";

function PaymentForm() {
  const { usuario } = useContext(AuthContext);
  const { ordenProductos, refreshData } = useOrdenProductos();
  const { total, personalData } = useContext(AppContext);
  const navigate = useNavigate();

  const [cardInfo, setCardInfo] = useState({
    cvc: '',
    expiry: '',
    focus: '',
    name: '',
    number: '',
  });

  const [open, setOpen] = useState(false);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCardInfo({ ...cardInfo, [name]: value });
    setErrors({ ...errors, [name]: null }); // Clear error on input change
  };

  const validateCardNumber = (cardNumber) => {
    // Basic validation of card number using regex and Luhn algorithm
    return /^\d{16}$/.test(cardNumber); // Adjust regex based on your card number format
  };

  const validateExpiry = (expiry) => {
    // Validate MM/YY format and check if it's a valid future date
    if (!/^(0[1-9]|1[0-2])\/?([0-9]{2})$/.test(expiry)) {
      return false;
    }
    const [month, year] = expiry.split('/');
    const currentYear = new Date().getFullYear() % 100;
    const currentMonth = new Date().getMonth() + 1;
    if (parseInt(year, 10) < currentYear || (parseInt(year, 10) === currentYear && parseInt(month, 10) < currentMonth)) {
      return false;
    }
    return true;
  };

  const validateCvc = (cvc) => {
    // Basic validation of CVC depending on the card type (adjust as per your needs)
    return /^\d{3,4}$/.test(cvc); // Adjust regex based on CVC format
  };

  const handleSubmit = async () => {
    // Validate card info before submitting
    const { number, expiry, cvc, name } = cardInfo;
    const validationErrors = {};

    if (!name.trim()) {
      validationErrors.name = 'Nombre en la tarjeta es requerido';
    }
    if (!validateCardNumber(number)) {
      validationErrors.number = 'Número de tarjeta inválido';
    }
    if (!validateExpiry(expiry)) {
      validationErrors.expiry = 'Fecha de vencimiento inválida';
    }
    if (!validateCvc(cvc)) {
      validationErrors.cvc = 'CVC inválido';
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Proceed with API calls and payment submission
    try {
      const encryptedCardNumber = CryptoJS.SHA256(cardInfo.number).toString();
      const encryptedCvc = CryptoJS.SHA256(cardInfo.cvc).toString();
      const encryptedExpiry = CryptoJS.SHA256(cardInfo.expiry).toString();

      // PUT request to update order
      await fetch(`${API_BASE_URL}/ordenes/${ordenProductos.data[0].id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "id_usuario": usuario.id,
          "id_estado": 2,
          "fechaOrden": new Date().toISOString(),
          "total": total
        }),
      });

      // POST request to create shipping data
      const shippingResponse = await fetch(`${API_BASE_URL}/datosEnvio/crear`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id_usuario: usuario.id,
          nombre: personalData.nombre,
          apellido: personalData.apellido,
          direccion: personalData.direccion,
          apartamento: personalData.apartamento,
          ciudad: personalData.ciudad,
          codigo_postal: personalData.codigoPostal,
          Estado: 'no guardado',
        }),
      });

      const shippingData = await shippingResponse.json();

      // POST request to create card data
      const cardResponse = await fetch(`${API_BASE_URL}/tarjetas/crear`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre: cardInfo.name, // Hardcoded as per your request
          apellido: cardInfo.name,
          numero_tarjeta: encryptedCardNumber,
          clave_seguridad: encryptedCvc,
          vencimiento: encryptedExpiry,
          ultimos_cuatro_digitos: cardInfo.number.slice(-4),
          id_usuario: usuario.id,
        }),
      });

      const cardData = await cardResponse.json();

      if (cardResponse.status === 200) {
        // POST request to create purchase information
        const compraResponse = await fetch(`${API_BASE_URL}/informacionCompra/crear`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id_orden: ordenProductos.data[0].id,
            id_datosenvio: shippingData.data.id,
            id_tarjeta: cardData.id,
          }),
        });

        if (compraResponse.status === 200) {
          setOpen(true);
        } else {
          console.error('Error during purchase information submission:', compraResponse.statusText);
        }
      } else {
        console.error('Error during card data submission:', cardResponse.statusText);
      }
    } catch (error) {
      console.error('Error during API calls:', error);
    }
  };

  const handleClose = () => {
    setOpen(false);
    window.location.reload(); // Refreshing page after closing dialog (you may want to improve this)
  };

  const CustomButton = styled(Button)({
    backgroundColor: '#8FA206',
    '&:hover': {
      backgroundColor: '#8FA206',
    },
  });

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
            label="Número de Tarjeta"
            fullWidth
            value={cardInfo.number}
            onChange={handleInputChange}
            onFocus={(e) => setCardInfo({ ...cardInfo, focus: e.target.name })}
            error={!!errors.number}
            helperText={errors.number}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            type="text"
            name="name"
            label="Nombre en la Tarjeta"
            fullWidth
            value={cardInfo.name}
            onChange={handleInputChange}
            onFocus={(e) => setCardInfo({ ...cardInfo, focus: e.target.name })}
            error={!!errors.name}
            helperText={errors.name}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            type="tel"
            name="expiry"
            label="Fecha de Vencimiento (MM/YY)"
            fullWidth
            value={cardInfo.expiry}
            onChange={handleInputChange}
            onFocus={(e) => setCardInfo({ ...cardInfo, focus: e.target.name })}
            error={!!errors.expiry}
            helperText={errors.expiry}
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
            error={!!errors.cvc}
            helperText={errors.cvc}
          />
        </Grid>
        <Grid item xs={12}>
          <CustomButton variant="contained" fullWidth onClick={handleSubmit}>
            Pagar
          </CustomButton>
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
                Nos emociona que hayas elegido Flavor Fiesta para disfrutar de nuestras bebidas refrescantes y únicas.
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
