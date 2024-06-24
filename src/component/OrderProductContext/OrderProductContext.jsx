import React, { createContext, useContext, useState, useEffect } from 'react';
import { OrderContext } from '../OrderContext/OrderContext';
import API_BASE_URL from "../../config"; // Importa OrderContext

const OrdenProductosContext = createContext();

export const OrdenProductosProvider = ({ children }) => {
  const [ordenProductos, setOrdenProductos] = useState(null);
  const { orden } = useContext(OrderContext); // Obtén orden del OrderContext
  const [forceRefresh, setForceRefresh] = useState(false); // Estado para forzar la recarga

  useEffect(() => {
    const fetchOrdenProductos = async () => {
      try {
        if (!orden) {
          throw new Error('No hay orden disponible');
        }
        const response = await fetch(`${API_BASE_URL}/ordenProductos/orden/${orden.usuario.id}`); // Usa orden.id en la URL
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setOrdenProductos(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    if (orden || forceRefresh) {
      fetchOrdenProductos();
      setForceRefresh(false); // Reinicia el estado de forzar recarga después de la carga
    }
  }, [orden, forceRefresh]); // Añade forceRefresh como dependencia para reactivar el efecto cuando cambie

  const refreshData = () => {
    setForceRefresh(true); // Cambia el estado para forzar una nueva carga de datos
  };

  return (
    <OrdenProductosContext.Provider value={{ ordenProductos, refreshData }}>
      {children}
    </OrdenProductosContext.Provider>
  );
};

export const useOrdenProductos = () => {
  return useContext(OrdenProductosContext);
};
