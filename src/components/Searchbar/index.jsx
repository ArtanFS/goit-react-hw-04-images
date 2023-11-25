import { useState } from 'react';
import css from './Searchbar.module.css';
import { FiSearch } from 'react-icons/fi';

const Searchbar = ({ onSubmit }) => {
  const [search, setSearch] = useState('');

  const handleChange = e => {
    setSearch(e.target.value);
  };

  const onSubmitForm = e => {
    e.preventDefault();
    if (search.trim() === '') {
      return;
    }
    onSubmit(search);
    setSearch('');
  };

  return (
    <header className={css.Searchbar}>
      <form className={css.SearchForm} onSubmit={onSubmitForm}>
        <button type="submit" className={css.SearchForm_button}>
          <FiSearch size="22px" />
        </button>

        <input
          className={css.SearchForm_input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={search}
          onChange={handleChange}
        />
      </form>
    </header>
  );
};

export default Searchbar;
