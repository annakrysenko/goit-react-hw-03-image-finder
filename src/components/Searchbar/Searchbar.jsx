import styles from './Searchbar.module.css';
import PropTypes from 'prop-types';
import { AiOutlineSearch } from 'react-icons/ai';
import { useState } from 'react';

export const Searchbar = ({ getImages }) => {
  const [input, setInput] = useState('');

  const handleInput = e => {
    setInput(e.target.value);
  };

  return (
    <header className={styles.searchbar}>
      <form className={styles.form} onClick={getImages}>
        <button type="submit" className={styles.button}>
          {/* <span className={styles.button_label}>Search</span> */}
          <AiOutlineSearch size="30px" />
        </button>

        <input
          className={styles.input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={handleInput}
          name="searchInput"
          value={input}
        />
      </form>
    </header>
  );
};

Searchbar.propTypes = {
  getImages: PropTypes.func.isRequired,
};
