import { useEffect, useState, useContext } from 'react';
import ProductCardContainer from '../ProductCardContainer/ProductCardContainer';
import API_BASE_URL from "../../config";
import './store.css';

const Store = () => {
  { const [products, setProducts] = useState([]);

    useEffect(() => {
      fetch(`${API_BASE_URL}/productos/`)
        .then(response => response.json())
        .then(data => setProducts(data.data))
        .catch(error => console.error('Error fetching products:', error));
    }, []);

  return (
    <div className="store">
      <ProductCardContainer products={products} />
    </div>
  );}
};

export default Store;
