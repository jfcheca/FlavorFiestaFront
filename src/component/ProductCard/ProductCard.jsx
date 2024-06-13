import React, { useState } from 'react';
import './ProductCard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const ProductCard = ({ image, title, subtitle, price, id }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const handleFavoriteClick = () => {
    setIsFavorite(!isFavorite);
  };
  return (
    <div className="product-card">
      <div className="product-image">
        <img src={image} alt={title} />
        <button 
          className={`favorite-button ${isFavorite ? 'favorited' : ''}`} 
          onClick={handleFavoriteClick}
        >
          <FontAwesomeIcon icon={isFavorite ? solidHeart : regularHeart} />
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
