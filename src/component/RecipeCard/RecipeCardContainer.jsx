import RecipeCard from './RecipeCard';
import { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import './RecipeCard.css'

const RecipeCardContainer = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/recipes.json') // Ruta del archivo JSON en la carpeta public
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        if (data.recipes && Array.isArray(data.recipes)) {
          setRecipes(data.recipes);
        } else {
          throw new Error('Data is not in the expected format');
        }
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <Grid className='layout' container >
         {recipes.map((recipe, index) => (
        <RecipeCard
          key={recipe.id}
          image={recipe.image}
          title={recipe.title}
          subtitle={recipe.subtitle}
          style={{
            backgroundColor: index % 2 === 0 ? '#8FA206' : '#FFFFFF',
            color: index % 2 === 0 ? '#FFFFFF' : '#CC2D4A',
          }}
        />
      ))}
    </Grid>
  );
};

export default RecipeCardContainer;
