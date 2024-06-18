
import CategoryCard from './CategoryCard';
import './CategoriesSection.css'; // Asegúrate de crear este archivo CSS en el mismo directorio

const CategoriesSection = () => {
  const categories = [
    { name: 'Con Alcohol', link: '/categoria/3', imageName: 'conalcohol.jpg' },
    { name: 'Saludable', link: '/categoria/2', imageName: 'lineasaludable.jpg' },
    { name: 'Sin Alcohol', link: '/categoria/4', imageName: 'sinalcohol.jpg' },
    { name: 'Kids', link: '/categoria/1', imageName: 'kids.jpg' },
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