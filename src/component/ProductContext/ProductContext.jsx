import React, { createContext, useState } from 'react';

// Creamos el contexto
export const ProductContext = createContext();

// Creamos un componente Provider para envolver nuestra aplicación y proporcionar el contexto
export const ProductProvider = ({ children }) => {
  // Estado para almacenar el JSON de productos
  const [products, setProducts] = useState([]);

  // Función para actualizar los productos
  const updateProducts = (newProducts) => {
    setProducts(newProducts);
  };

  return (
    <ProductContext.Provider value={{ products, updateProducts }}>
      {children}
    </ProductContext.Provider>
  );
};

