import React, { createContext, useState, useEffect } from 'react';

// Creamos el contexto
export const ProductContext = createContext();

// Creamos un componente Provider para envolver nuestra aplicación y proporcionar el contexto
export const ProductProvider = ({ children }) => {
  // Estado para almacenar el JSON de productos
  const [products, setProducts] = useState([]);

  // Cargar los productos desde localStorage cuando el componente se monte
  useEffect(() => {
    const storedProducts = localStorage.getItem('products');
    if (storedProducts) {
      setProducts(JSON.parse(storedProducts));
    }
  }, []);

  // Función para actualizar los productos
  const updateProducts = (newProducts) => {
    setProducts(newProducts);
    localStorage.setItem('products', JSON.stringify(newProducts));
  };

  return (
    <ProductContext.Provider value={{ products, updateProducts }}>
      {children}
    </ProductContext.Provider>
  );
};
