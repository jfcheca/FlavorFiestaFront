// OrderContext.js
import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../AuthContext/AuthContext';
import API_BASE_URL from "../../config";

export const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const { usuario } = useContext(AuthContext);
  const [orden, setOrden] = useState(null);
  const [triggerFetch, setTriggerFetch] = useState(false);

  useEffect(() => {
    const fetchOrden = async () => {
      if (usuario) {
        try {
          const response = await axios.get(`${API_BASE_URL}/ordenes/usuario&estadoConDatos?UserID=${usuario.id}&EstadoID=1`);
          setOrden(response.data);
        } catch (error) {
          setOrden({ success: false });
          console.error('Error fetching the orden data', error);
        }
      }
    };

    fetchOrden();
  }, [usuario, triggerFetch]);

  return (
    <OrderContext.Provider value={{ orden, setTriggerFetch }}>
      {children}
    </OrderContext.Provider>
  );
};
