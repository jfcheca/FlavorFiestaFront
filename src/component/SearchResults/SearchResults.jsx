import React from 'react';
import { Link } from 'react-router-dom';

const SearchResults = ({ results, onClose }) => {
  return (
    <div className="SearchResultsContainer">
      {results.map((product) => (
        <Link
          key={product.id}
          to={`/product/${product.id}`}
          className="SearchResultItem"
          onClick={onClose}
        >
          <div className="SearchResult">
            {product.nombre}
          </div>
        </Link>
      ))}
    </div>
  );
};

export default SearchResults;
