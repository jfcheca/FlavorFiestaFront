import RecipeCard from './RecipeCard';
import { Grid } from '@mui/material';
import './RecipeCard.css'

const RecipeCardContainer = ({ recipes }) => {
  return (
    <Grid className='layout' container>
      {recipes.map((recipe, index) => (
        <RecipeCard
          key={recipe.id}
          id={recipe.id}
          imagen={recipe.imagenes.length > 0 ? recipe.imagenes[0].url : ''}
          nombre={recipe.nombre}
          descripcion={recipe.descripcion}
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
