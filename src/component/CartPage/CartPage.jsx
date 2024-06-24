import React, { useContext, useState } from 'react';
import { Box, Card, CardContent, Button, IconButton } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import CartSummary from '../CartSummary/CartSummary';
import PersonalDataForm from '../PersonalDataForm/PersonalDataForm';
import PaymentForm from '../PaymentForm/PaymentForm';
import ProgressBar from '../ProgressBar/ProgressBar';
import './CartPage.css';

const CartPage = () => {
  const [step, setStep] = useState(1);
  const [personalData, setPersonalData] = useState({
    nombre: '',
    direccion: '',
    email: '',
    telefono: ''
  });
  const [paymentData, setPaymentData] = useState({
    tarjeta: '',
    nombreTitular: '',
    vencimiento: '',
    cvv: ''
  });

  const handleNextStep = () => setStep(step + 1);
  const handlePrevStep = () => setStep(step - 1);
  const handlePersonalDataChange = (e) => setPersonalData({ ...personalData, [e.target.name]: e.target.value });
  const handlePaymentDataChange = (e) => setPaymentData({ ...paymentData, [e.target.name]: e.target.value });


  return (
    <Box display="flex" flexDirection="column" alignItems="center" minHeight="100vh" bgcolor="#f5f5f5">
      <ProgressBar step={step} />
      {step > 1 && (
        <IconButton
          onClick={handlePrevStep}
          aria-label="anterior"
          sx={{
            position: 'absolute',
            top: 16,
            left: 16,
            bgcolor: 'primary.main',
            marginTop: '85px',
            color: 'white',
            '&:hover': {
              bgcolor: 'primary.dark',
            },
            borderRadius: '50%',
            width: 50,
            height: 50,
          }}
        >
          <FontAwesomeIcon icon={faArrowLeft} />
        </IconButton>
      )}
      <Card sx={{ width: '90%', maxWidth: 600, margin: 2, padding: 2 }}>
        <CardContent>
          {step === 1 && (
            <CartSummary
              handleNextStep={handleNextStep}
            />
          )}
          {step === 2 && (
            <PersonalDataForm
              personalData={personalData}
              handlePersonalDataChange={handlePersonalDataChange}
              handleNextStep={handleNextStep}
            />
          )}
          {step === 3 && (
            <PaymentForm
              paymentData={paymentData}
              handlePaymentDataChange={handlePaymentDataChange}
            />
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default CartPage;
