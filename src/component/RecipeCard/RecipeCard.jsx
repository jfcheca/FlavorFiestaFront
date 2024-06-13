import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';
import './RecipeCard.css'
import { width } from '@fortawesome/free-brands-svg-icons/fa42Group';


const RecipeCard = ({image, title, subtitle, style}) => {

  return (
    <Card style={style} className='size' >
      <CardActionArea>
        <CardMedia
          component="img"
          height="230"
          image= {image}
          alt= {title}
        />
        <CardContent align="left">
           <h3 className='recipesh3'>{title}</h3>
           <p className='recipesp'>{subtitle}</p>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}



export default RecipeCard;

