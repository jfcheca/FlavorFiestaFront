import React from 'react';
import './Carousel.css';

const Carousel = ({ images }) => {
  return (
    <div className="carousel-container">
      <div className="carousel">
        {images.map((image, index) => (
          <div key={index} className="carousel-item">
            <img src={image.url} alt={`Carousel ${index + 1}`} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
