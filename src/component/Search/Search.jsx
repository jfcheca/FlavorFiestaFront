// Search.jsx
import React, { useState, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import './Search.css';
import SearchResults from '../SearchResults/SearchResults';
import { ProductContext } from '../ProductContext/ProductContext';

const Search = ({ onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const { products } = useContext(ProductContext);

  const handleSearch = (event) => {
    const searchTerm = event.target.value.trim();
    setSearchTerm(searchTerm);

    // Filter results based on search term
    const filteredResults = searchTerm === ''
      ? []
      : products.filter(product =>
          product.nombre.toLowerCase().includes(searchTerm.toLowerCase())
        );

    setSearchResults(filteredResults);
  };

  const handleClose = () => {
    setSearchTerm('');
    setSearchResults([]);
    onClose();
  };

  return (
    <div className="SearchContainer">
      <div className="SearchContent">
        <div className="SearchRow">
          <div className="SearchBackButton" onClick={handleClose}>
            <FontAwesomeIcon icon={faArrowLeft} size="lg" />
          </div>
          <input
            type="text"
            placeholder="Buscar..."
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        <div className="SearchResultsWrapper">
          <SearchResults results={searchResults} onClose={handleClose} />
        </div>
      </div>
    </div>
  );
};

export default Search;
