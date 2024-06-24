import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';
import './RecipeCard.css';

const RecipeCard = ({ id, imagen, nombre, descripcion, style }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/mezclas/${id}`);
  };

  return (
    <Card style={style} className="size" onClick={handleClick}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="230"
          image={imagen}
          alt={nombre}
        />
        <CardContent align="left">
          <h3 className="recipesh3">{nombre}</h3>
          <p className="recipesp">{descripcion}</p>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default RecipeCard;
