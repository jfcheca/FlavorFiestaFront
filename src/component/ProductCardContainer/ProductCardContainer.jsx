import React from 'react';
import ProductCard from '../ProductCard/ProductCard';
import './ProductCardContainer.css';

const ProductCardContainer = ({ products }) => {
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
        />
      ))}
    </div>
  );
};

export default ProductCardContainer;
