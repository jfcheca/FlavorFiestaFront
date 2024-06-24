import React, { useContext } from 'react';
import ProductCard from '../ProductCard/ProductCard';
import './ProductCardContainer.css';
import { FavoritosContext } from '../favoritosContext/favoritosContext';

const ProductCardContainer = ({ products }) => {
  const { favoritos } = useContext(FavoritosContext);

  // Verificar si favoritos.data está definido y es un array
  if (!favoritos || !favoritos.data || !Array.isArray(favoritos.data)) {
    return (
      <div className="product-card-container">
        {products.map(product => (
          <ProductCard
            key={product.id}
            id={product.id}
            image={product.imagenes[0].url}
            title={product.nombre}
            price={product.precio}
            subtitle={product.categoria}
            isFavorite={product.isFavorite !== undefined ? product.isFavorite : false}  // Verificar si el ID está en la lista de favoritos
          />
        ))}
      </div>
    );
  }

  // Obtener los IDs de los productos favoritos
  const favoritosIds = favoritos.data.map(item => item.id_producto);

  return (
    <div className="product-card-container">
      {products.map(product => (
        <ProductCard
          key={product.id}
          id={product.id}
          image={product.imagenes[0].url}
          title={product.nombre}
          price={product.precio}
          subtitle={product.categoria}
          isFavorite={favoritosIds.includes(product.id)}  // Verificar si el ID está en la lista de favoritos
        />
      ))}
    </div>
  );
};

export default ProductCardContainer;
