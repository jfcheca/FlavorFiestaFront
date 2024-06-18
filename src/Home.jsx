import { useEffect, useState, useContext } from 'react';
import RecipeCardContainer from '../src/component/RecipeCard/RecipeCardContainer'
import CategoriesSection from '../src/component/Categories/CategoriesSection';
import ProductCardContainer from './component/ProductCardContainer/ProductCardContainer';
import bannerHome from '../src/component/Categories/bannerhome.jpg';
import { ProductContext } from './component/ProductContext/ProductContext';
import './Home.css';
import API_BASE_URL from "./config";

const Home = () => {
  { const [products, setProducts] = useState([]);
    const { updateProducts } = useContext(ProductContext);

    useEffect(() => {
      fetch(`${API_BASE_URL}/productos/`)
        .then(response => response.json())
        .then(data => {
          // Asumiendo que `data.data` es el array de productos
          const limitedProducts = data.data.slice(0, 8); // Obtener solo los primeros 8 productos
          setProducts(limitedProducts);
          updateProducts(data.data);
        })
        .catch(error => console.error('Error fetching products:', error));
    }, []);

  return (
    <div className="home">
      <div>
      <img src={bannerHome} alt="BannerHome" className="banner-home" />
      <h2 className="categories-title">Categorías</h2>
      <CategoriesSection />
      </div>

      <div className='recipes'>
        <h2 className="categories-title">Mezcla y disfruta</h2>
        <RecipeCardContainer/>
      </div>

      <h2 className="section-title">Mas Vendidos</h2>
      <ProductCardContainer products={products} />
    </div>
  );}
};

export default Home;
