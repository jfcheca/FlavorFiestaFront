import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Typography, Button, Box } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { useOrdenProductos } from '../OrderProductContext/OrderProductContext'; // Ajusta la ruta según corresponda
import { AuthContext } from '../AuthContext/AuthContext';
import { AppContext } from '../AppContext/AppContext'; // Ajusta la ruta según corresponda
import API_BASE_URL from "../../config";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { styled } from '@mui/system';

const CartSummary = ({ cartItems, handleQuantityChange, removeItemFromCart, calculateTotal, handleNextStep }) => {
  const { ordenProductos, refreshData } = useOrdenProductos();
  const { usuario } = useContext(AuthContext);
  const { total, setTotal } = useContext(AppContext); // Usa el contexto combinado
  const [quantities, setQuantities] = useState({});

  useEffect(() => {
    if (ordenProductos && ordenProductos.data) {
      const initialQuantities = ordenProductos.data.reduce((acc, item) => {
        acc[item.id] = item.cantidad;
        return acc;
      }, {});
      setQuantities(initialQuantities);
    }
  }, [ordenProductos]);

  useEffect(() => {
    if (ordenProductos && ordenProductos.data) {
      const newTotal = ordenProductos.data.reduce((acc, ordenProducto) => {
        return acc + (ordenProducto.producto.precio * quantities[ordenProducto.id]);
      }, 0);
      setTotal(newTotal); // Actualiza el total en el contexto
    }
  }, [quantities, ordenProductos, setTotal]);

  const handleQuantityUpdate = (ordenProducto, quantity) => {
    const { id, id_orden, producto: { id: id_producto, precio } } = ordenProducto;
    const parsedQuantity = parseInt(quantity, 10);

    setQuantities({
      ...quantities,
      [id]: parsedQuantity
    });

    const total = parseFloat((precio * parsedQuantity).toFixed(2));

    console.log('Datos enviados a la API:', {
      id_orden,
      id_producto,
      cantidad: parsedQuantity,
      total
    });

    axios.put(`${API_BASE_URL}/ordenProductos/${id}`, {
      id_orden: id_orden,
      id_producto: id_producto,
      cantidad: parsedQuantity,
      total: total
    })
      .then(response => {
        console.log('Cantidad actualizada', response.data);
        toast.info('Producto actualizado correctamente!', {
          position: "top-right"
        });
        // Aquí puedes manejar la respuesta si es necesario
      })
      .catch(error => {
        console.error('Error al actualizar la cantidad', error);
        // Aquí puedes manejar el error si es necesario
      });
  };

  const handleRemoveItem = (id) => {
    axios.delete(`${API_BASE_URL}/ordenProductos/${id}`)
      .then(response => {
        console.log('Artículo eliminado', response.data);
        refreshData();
        toast.error('Producto eliminado de la orden correctamente!', {
          position: "top-right"
        });
        removeItemFromCart(id); // Llama a la función para actualizar el estado local
      })
      .catch(error => {
        console.error('Error al eliminar el artículo', error);
        // Aquí puedes manejar el error si es necesario
      });
  };

  if (!ordenProductos || !usuario) {
    return (
      <>
        <Typography variant="h4" component="h1" gutterBottom>
          Resumen del pedido
        </Typography>
        <Typography>No tienes artículos en tu carrito.</Typography>
      </>
    );
  }

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
        Resumen del pedido
      </Typography>
      {ordenProductos.data == null ? (
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
              {ordenProductos.data.map((ordenProducto) => (
                <tr key={ordenProducto.id}>
                  <td><img src={ordenProducto.producto.imagenes[0].url} alt={ordenProducto.producto.nombre} style={{ width: 50, height: 50 }} /></td>
                  <td>{ordenProducto.producto.nombre}</td>
                  <td>
                    <TextField
                      type="number"
                      value={quantities[ordenProducto.id]}
                      onChange={(e) => handleQuantityUpdate(ordenProducto, e.target.value)}
                      inputProps={{ min: 1 }}
                    />
                  </td>
                  <td>${(ordenProducto.producto.precio * quantities[ordenProducto.id]).toFixed(2)}</td>
                  <td>
                    <Button onClick={() => handleRemoveItem(ordenProducto.id)} startIcon={<FontAwesomeIcon icon={faTrashAlt} style={{ color: '#8FA206' }}/>} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Box>
      )}
      {ordenProductos.data != null && (
        <>
          <Typography variant="h6" gutterBottom>SubTotal: ${total.toFixed(2)}</Typography>
          <CustomButton onClick={handleNextStep} variant="contained" fullWidth >Realizar pedido</CustomButton>
        </>
      )}
      {/* Contenedor para las notificaciones */}
      <ToastContainer />
    </>
  );
};

export default CartSummary;
