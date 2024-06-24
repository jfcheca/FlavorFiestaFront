import { useEffect, useState, useContext } from 'react';
import ProductCardContainer from '../ProductCardContainer/ProductCardContainer';
import API_BASE_URL from "../../config";
import { FavoritosContext } from '../favoritosContext/favoritosContext';
import './favoritos.css';

const Favoritos = () => {
  const { favoritos } = useContext(FavoritosContext);
  const [products, setProducts] = useState([]);
  const [favoriteProducts, setFavoriteProducts] = useState([]);

  useEffect(() => {
    // Fetch all products from the API
    fetch(`${API_BASE_URL}/productos/`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        if (data && data.data) {
          setProducts(data.data);
        } else {
          throw new Error('Data format is incorrect');
        }
      })
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  useEffect(() => {
    // Filter products to get only those that are in the favorites list
    if (favoritos && favoritos.data && products.length > 0) {
      const favoriteProductIds = favoritos.data.map(fav => fav.id_producto);
      const filteredProducts = products.filter(product => 
        favoriteProductIds.includes(product.id)
      );
      setFavoriteProducts(filteredProducts);
    }
  }, [favoritos, products]);

  if (!favoritos || !favoritos.data) {
    return <div>Loading...</div>;
  }

  return (
    <div className="favoritos">
      <ProductCardContainer products={favoriteProducts} />
    </div>
  );
};

export default Favoritos;
