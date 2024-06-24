import React, { useState } from 'react';
import './ProductCard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import API_BASE_URL from "../../config";

const ProductCard = ({ image, title, subtitle, price, id, isFavorite, userId }) => {
  const [favorite, setFavorite] = useState(isFavorite);

  const handleFavoriteClick = async () => {
    const newFavoriteStatus = !favorite;
    setFavorite(newFavoriteStatus);

    if (newFavoriteStatus) {
      const data = {
        id_usuario: 1,
        id_producto: id
      };

      try {
        const response = await fetch(`${API_BASE_URL}/favoritos/agregar`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        });

        if (!response.ok) {
          throw new Error('Error al agregar a favoritos');
        }

        const result = await response.json();
        console.log('Resultado:', result);
      } catch (error) {
        console.error('Error:', error);
      }
    }
    window.location.reload();
  };

  return (
    <div className="product-card">
      <div className="product-image">
        <img src={image} alt={title} />
        <button 
          className={`favorite-button ${favorite ? 'favorited' : ''}`} 
          onClick={handleFavoriteClick}
        >
          <FontAwesomeIcon icon={favorite ? solidHeart : regularHeart} />
        </button>
      </div>
      <div className="product-info">
        <h3 className="product-title">{title}</h3>
        <h3 className="product-subtitle">{subtitle}</h3>
        <div className="product-details">
          <span className="product-price">${price}</span>
          <Link to={`/product/${id}`} className="extra-button">
            <FontAwesomeIcon icon={faPlus} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
