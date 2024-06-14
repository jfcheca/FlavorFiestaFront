import { useEffect, useState, useContext } from 'react';
import ProductCardContainer from '../ProductCardContainer/ProductCardContainer';
import './store.css';

const Store = () => {
  { const [products, setProducts] = useState([]);

    useEffect(() => {
      fetch('http://localhost:8080/productos/')
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
