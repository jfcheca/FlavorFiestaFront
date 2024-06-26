// Suponiendo que tienes acceso a FavoritosContext y su método para actualizar favoritos

import React, { useState, useContext } from 'react';
import './ProductCard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { AuthContext } from '../AuthContext/AuthContext';
import API_BASE_URL from "../../config";
import { FavoritosContext } from '../favoritosContext/favoritosContext'; // Importar el contexto de favoritos

const ProductCard = ({ image, title, subtitle, price, id, isFavorite, userId }) => {
  const [favorite, setFavorite] = useState(isFavorite);
  const { usuario } = useContext(AuthContext);
  const favoritosContext = useContext(FavoritosContext); // Obtener el contexto de favoritos

  const handleFavoriteClick = async () => {
    const newFavoriteStatus = !favorite;
    setFavorite(newFavoriteStatus);

    if (newFavoriteStatus) {
      const data = {
        id_usuario: usuario.id,
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

        // Actualizar el contexto de favoritos después de agregar
        favoritosContext.actualizarFavoritos(); // Ejemplo de método para actualizar favoritos en FavoritosContext
      } catch (error) {
        console.error('Error:', error);
      }
    } else {
      try {
        const response = await fetch(`${API_BASE_URL}/favoritos/user/${usuario.id}/producto/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error('Error al eliminar de favoritos');
        }

        const result = await response.json();
        console.log('Resultado:', result);

        // Actualizar el contexto de favoritos después de eliminar
        favoritosContext.actualizarFavoritos(); // Ejemplo de método para actualizar favoritos en FavoritosContext
      } catch (error) {
        console.error('Error:', error);
      }
    }
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
