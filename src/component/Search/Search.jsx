import React, { useState, useEffect } from 'react';
import './Search.css';

const Search = (props) => {
    //Setering the hooks of useState --> Seterar los hooks de useState
    const [ users, setUsers ] = useState([]);
    const [ search, setSearch ] = useState('');

    //Function to fetch data from the API --> Función para traer los datos de la API
    const URL = 'https://jsonplaceholder.typicode.com/users';

    const showData = async () => {
        const response = await fetch(URL);
        const data = await response.json();
        setUsers(data);
    }

    //Search function --> Función de búsqueda
    const searcher = (e) => {
        setSearch(e.target.value);
        //console.log(e.target.value);
    }

    const clearSearch = () => {
      setSearch('');
  };

    //Filtering method --> Método de filtrado 2
    const results = !search ? users : users.filter((dato) => dato.name.toLowerCase().includes(search.toLowerCase()));

    useEffect(() => {
        showData();
    }, []);

  return (
    <div className='search-container'>
    <input value={search} onChange={searcher} type='text' placeholder='Buscar...' className='input' />
      <table className=''>
        <thead>
          <tr>
            <th>TITULO</th>
            <th>DETALLE-PRODUCTO</th>
          </tr>
        </thead>
        <tbody>
          {results.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.username}</td>
            </tr>
          ))}
        </tbody>

      </table>
    </div>
  )
}

export default Search