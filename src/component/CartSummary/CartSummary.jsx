import React from 'react';
import { TextField, Typography, Button, Box } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

const CartSummary = ({ cartItems, handleQuantityChange, removeItemFromCart, calculateTotal, handleNextStep }) => {
  return (
    <>
      <Typography variant="h4" component="h1" gutterBottom>
        Resumen del pedido
      </Typography>
      {cartItems.length === 0 ? (
        <Typography>No tienes artículos en tu carrito.</Typography>
      ) : (
        <Box sx={{ overflowX: 'auto' }}>
          <table className="product-table">
            <thead>
              <tr>
                <th>Imagen</th>
                <th>Nombre</th>
                <th>Cantidad</th>
                <th>Total</th>
                <th>Eliminar</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item, index) => (
                <tr key={index}>
                  <td><img src={item.imagenes[0].url} alt={item.nombre} style={{ width: 50, height: 50 }} /></td>
                  <td>{item.nombre}</td>
                  <td>
                    <TextField
                      type="number"
                      value={item.cantidad}
                      onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                      inputProps={{ min: 1 }}
                    />
                  </td>
                  <td>${(item.precio * item.cantidad).toFixed(2)}</td>
                  <td>
                    <Button onClick={() => removeItemFromCart(item.id)} startIcon={<FontAwesomeIcon icon={faTrashAlt} />} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Box>
      )}
      {cartItems.length > 0 && (
        <>
          <Typography variant="h6" gutterBottom>SubTotal: ${calculateTotal()}</Typography>
          <Button onClick={handleNextStep} variant="contained" color="primary">Realizar pedido</Button>
        </>
      )}
    </>
  );
};

export default CartSummary;
