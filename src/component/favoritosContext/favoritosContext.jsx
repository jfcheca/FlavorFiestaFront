import React, { createContext, useState, useEffect, useContext } from 'react';
import API_BASE_URL from '../../config';
import { AuthContext } from '../AuthContext/AuthContext';

// Creamos el contexto
export const FavoritosContext = createContext();

const FavoritosContextProvider = ({ children }) => {
  const { usuario } = useContext(AuthContext);
  // Estado para almacenar los favoritos
  const [favoritos, setFavoritos] = useState([]);

  useEffect(() => {
    const obtenerFavoritos = async () => {
      try {
        if (!usuario || !usuario.id) {
          return; // Si usuario o usuario.id no están definidos, salimos de la función
        }
        const response = await fetch(`${API_BASE_URL}/favoritos/usuario/${usuario.id}`);
        if (response.ok) {
          const data = await response.json();
          setFavoritos(data); // Actualizamos el estado de los favoritos
        } else {
          throw new Error('Error al obtener los favoritos');
        }
      } catch (error) {
        console.error('Error fetching favoritos:', error);
      }
    };

    obtenerFavoritos();
  }, [usuario]); // Dependencia: se ejecuta nuevamente cuando usuario cambia

  // El provider que envuelve a los hijos y provee el contexto
  return (
    <FavoritosContext.Provider value={{ favoritos }}>
      {children}
    </FavoritosContext.Provider>
  );
};

export default FavoritosContextProvider;
