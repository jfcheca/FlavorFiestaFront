import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ProductDetail.css';
import Carousel from '../Carousel/Carousel';
import { CartContext } from '../CartContext/CartContext';
import { AuthContext } from '../AuthContext/AuthContext';
import { OrderContext } from '../OrderContext/OrderContext';
import { useOrdenProductos } from '../OrderProductContext/OrderProductContext';
import API_BASE_URL from "../../config";
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProductDetail = () => {
  const { usuario } = useContext(AuthContext);
  const { refreshData  } = useOrdenProductos();
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const { orden, setTriggerFetch } = useContext(OrderContext);
  const [quantity, setQuantity] = useState(1);
  const [openDialog, setOpenDialog] = useState(false);
  const { addItemToCart } = useContext(CartContext);
  
  const navigate = useNavigate();
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/productos/${productId}`);
        setProduct(response.data.data);
      } catch (error) {
        console.error('Error fetching the product data', error);
      }
    };

    fetchProduct();
  }, [productId]);

  const createOrder = async () => {
    try {
      const response = await axios.post(`${API_BASE_URL}/ordenes/crear`, {
        id_usuario: usuario.id,
        id_estado: 1, // Assuming 1 is the default state for a new order
        fechaOrden: new Date().toISOString(),
        total: 0
      });
      response.data.success = true
      return response.data;
    } catch (error) {
      console.error('Error creating order', error);
      return null;
    }
  };

  const createOrderProduct = async (orderId) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/ordenProductos/crear`, {
        id_orden: orderId,
        id_producto: product.id,
        total: product.precio * quantity,
        cantidad: quantity
      });
      toast.success('Producto agregado a la orden correctamente!', {
        position: "top-right"
      });
      refreshData();
      return response.data.data;
    } catch (error) {
      console.error('Error creating order product', error);
      return null;
    }
  };

  const handleAddToCart = async () => {
    if (!usuario) {
      setOpenDialog(true);
    } else { 
      if (!orden.success) {
        const newOrder = await createOrder();
        console.log(newOrder)
        if (newOrder) {
          console.log(newOrder.id);
          const newOrderProduct = await createOrderProduct(newOrder.id);
          if (newOrderProduct) {
            console.log('Order and order products created successfully');
          }
          setTriggerFetch(prev => !prev);
        }
      } else {
        const newOrderProduct = await createOrderProduct(orden.usuario.id);
        if (newOrderProduct) {
          console.log('Order product added successfully to the existing order');
        }
      }

      product.cantidad = quantity;
      addItemToCart(product, quantity);
      console.log(`Agregar al carrito: ${product.nombre} x ${quantity}`);
    }
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const handleDialogConfirm = () => {
    setOpenDialog(false);
    navigate('/login');
  };

  if (!product) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="product-detail">
      <div className="product-image">
        <img src={product.imagenes[0].url} alt={product.nombre} />
        <Carousel images={product.imagenes} />
      </div>
      <div className="product-info">
        <h1>{product.nombre}</h1>
        <p>Categoría: {product.categoria}</p>
        <p>Precio: ${product.precio}</p>
        <div className="add-to-cart">
          <input
            type="number"
            value={quantity}
            min="1"
            onChange={(e) => setQuantity(parseInt(e.target.value))}
          />
          <button onClick={handleAddToCart}>Agregar al Carrito</button>
        </div>
        <p>{product.descripcion}</p>
      </div>

      {/* Diálogo de alerta */}
      <Dialog
        open={openDialog}
        onClose={handleDialogClose}
      >
        <DialogTitle>Iniciar Sesión</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Antes de ingresar un producto, debes iniciar sesión.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleDialogConfirm} color="primary">
            Iniciar Sesión
          </Button>
        </DialogActions>
      </Dialog>
      {/* Contenedor para las notificaciones */}
      <ToastContainer />
    </div>
  );
};

export default ProductDetail;
