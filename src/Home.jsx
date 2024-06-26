import { useEffect, useState, useContext } from 'react';
import RecipeCardContainer from './component/RecipeCard/RecipeCardContainer';
import CategoriesSection from './component/Categories/CategoriesSection';
import ProductCardContainer from './component/ProductCardContainer/ProductCardContainer';
import bannerHome from './component/Categories/bannerhome.jpg';
import { ProductContext } from './component/ProductContext/ProductContext';
import './Home.css';
import API_BASE_URL from "./config";
import axios from 'axios';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const { updateProducts } = useContext(ProductContext);

  useEffect(() => {
    fetch(`${API_BASE_URL}/productos/`)
      .then(response => response.json())
      .then(data => {
        const limitedProducts = data.data.slice(0, 8);
        setProducts(limitedProducts);
        updateProducts(data.data);
      })
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/mezclas/`);
        setRecipes(response.data.data);
      } catch (error) {
        console.error('Error fetching recipes:', error);
      }
    };

    fetchRecipes();
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
        <RecipeCardContainer recipes={recipes} />
      </div>

      <h2 className="section-title">Mas Vendidos</h2>
      <ProductCardContainer products={products} />
    </div>
  );
};

export default Home;
