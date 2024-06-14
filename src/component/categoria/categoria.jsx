import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ProductCardContainer from '../ProductCardContainer/ProductCardContainer';
import './categoria.css';

const Categoria = () => {
  const [products, setProducts] = useState([]);
  const [categoria, setCategoria] = useState([]);
  const { categoriaId } = useParams();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/categorias/${categoriaId}`);
        console.log(response.data);
        // Ahora accede a los productos dentro de la propiedad 'data'
        setProducts(response.data.data.productos);
        setCategoria(response.data.data.nombre)
      } catch (error) {
        console.error('Error fetching the product data', error);
      }
    };

    fetchProducts();
  }, [categoriaId]);

  return (
    <div className="categoria">
        <h2 className="section-title">{categoria}</h2>
      <ProductCardContainer products={products} />
    </div>
  );
};

export default Categoria;

