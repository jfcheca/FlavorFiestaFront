import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './RecipeDetail.css';
import API_BASE_URL from '../../config';

const RecipeDetail = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/mezclas/${id}`);
        setRecipe(response.data.data);
      } catch (error) {
        console.error('Error fetching the recipe data', error);
      }
    };

    fetchRecipe();
  }, [id]);

  if (!recipe) {
    return <div>Cargando...</div>;
  }

  return (
    <div className='recipe-body'>
      <div className="recipe-detail-container">
        <h1>{recipe.nombre}</h1>
        <h2>Ingredientes</h2>
        <ul>
          {recipe.ingredientes.map((ingrediente, i) => (
            <li key={i}>{ingrediente.descripcion}</li>
          ))}
        </ul>
        <h2>Instrucciones</h2>
        <ol>
          {recipe.instrucciones.map((instruccion, i) => (
            <li key={i}>{instruccion.descripcion}</li>
          ))}
        </ol>
      </div>
      <div>
        <img src={recipe.imagenes.length > 0 ? recipe.imagenes[0].url : ''} alt={recipe.nombre} className="recipe-image" />
      </div>
    </div>
  );
};

export default RecipeDetail;
