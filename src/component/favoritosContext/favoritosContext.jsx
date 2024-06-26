// FavoritosContext.js

import React, { createContext, useState, useContext, useEffect } from 'react';
import API_BASE_URL from "../../config";
import { AuthContext } from '../AuthContext/AuthContext';

export const FavoritosContext = createContext();

const FavoritosContextProvider = ({ children }) => {
  const { usuario } = useContext(AuthContext);
  const [favoritos, setFavoritos] = useState([]);

  useEffect(() => {
    const obtenerFavoritos = async () => {
      try {
        if (!usuario || !usuario.id) {
          return; // Salir si no hay usuario o usuario.id definido
        }
        const response = await fetch(`${API_BASE_URL}/favoritos/usuario/${usuario.id}`);
        if (response.ok) {
          const data = await response.json();
          setFavoritos(data); // Actualizar el estado de los favoritos en el contexto
        } else {
          throw new Error('Error al obtener los favoritos');
        }
      } catch (error) {
        console.error('Error fetching favoritos:', error);
      }
    };

    obtenerFavoritos();
  }, [usuario]); // Ejecutar nuevamente cuando cambie usuario

  const actualizarFavoritos = async () => {
    try {
      if (!usuario || !usuario.id) {
        return; // Salir si no hay usuario o usuario.id definido
      }
      const response = await fetch(`${API_BASE_URL}/favoritos/usuario/${usuario.id}`);
      if (response.ok) {
        const data = await response.json();
        setFavoritos(data); // Actualizar el estado de los favoritos en el contexto
      } else {
        throw new Error('Error al obtener los favoritos');
      }
    } catch (error) {
      console.error('Error fetching favoritos:', error);
    }
  };

  return (
    <FavoritosContext.Provider value={{ favoritos, actualizarFavoritos }}>
      {children}
    </FavoritosContext.Provider>
  );
};

export default FavoritosContextProvider;
