
import CategoryCard from './CategoryCard';
import './CategoriesSection.css'; // Asegúrate de crear este archivo CSS en el mismo directorio

const CategoriesSection = () => {
  const categories = [
    { name: 'Con Alcohol', link: '/con-alcohol', imageName: 'conalcohol.jpg' },
    { name: 'Línea Saludable', link: '/linea-saludable', imageName: 'lineasaludable.jpg' },
    { name: 'Sin Alcohol', link: '/sin-alcohol', imageName: 'sinalcohol.jpg' },
    { name: 'Kids', link: '/kids', imageName: 'kids.jpg' },
  ];

  return (
    <div className="categories-section">

      {categories.map((category) => (
        <CategoryCard key={category.name} category={category.name} link={category.link} imageName={category.imageName} />
      ))}
    </div>
  );
};

export default CategoriesSection;