import { Component } from 'react';
import styles from './Searchbar.module.css';
import PropTypes from 'prop-types';
import { AiOutlineSearch } from 'react-icons/ai';

export class Searchbar extends Component {
  state = {
    input: '',
  };

  handleInput = e => {
    this.setState({ input: e.target.value });
  };

  render() {
    return (
      <header className={styles.searchbar}>
        <form className={styles.form} onClick={this.props.getImages}>
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
            onChange={this.handleInput}
            name="searchInput"
            value={this.state.input}
          />
        </form>
      </header>
    );
  }
}

Searchbar.propTypes = {
  getImages: PropTypes.func.isRequired,
};
