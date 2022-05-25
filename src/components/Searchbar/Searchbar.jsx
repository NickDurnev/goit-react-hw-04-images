import PropTypes from 'prop-types';
import { useState } from 'react';
import { SearchForm, Bar } from './Searchbar.styled';
import { FiSearch } from 'react-icons/fi';

const Searchbar = ({ onSubmit }) => {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(inputValue);
  };

  return (
    <Bar>
      <SearchForm onSubmit={handleSubmit}>
        <button type="submit">
          <FiSearch size="24"></FiSearch>
          <span>Search</span>
        </button>

        <input
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
        />
      </SearchForm>
    </Bar>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
