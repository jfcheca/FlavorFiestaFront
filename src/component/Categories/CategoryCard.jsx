
import './CategoryCard.css'; 
import conAlcohol from './categoryalcohol.jpg';
import lineaSaludable from './categoryhealthy.jpg';
import sinAlcohol from './categorywhitoutalcohol.jpg';
import kids from './categorykids.jpg';

const images = {
  'Con Alcohol': conAlcohol,
  'Saludable': lineaSaludable,
  'Sin Alcohol': sinAlcohol,
  'Kids': kids,
};

const CategoryCard = ({ category, link }) => {
  const image = images[category];
  return (
    
    <div className="category-card">
      <a href={link} className="category-link">
      <img src={image} alt={category} className="category-image" />
      <div className="category-content">
      <span className="category-button">{category}</span>
        </div>
      </a>
    </div>
  );
};

export default CategoryCard;
