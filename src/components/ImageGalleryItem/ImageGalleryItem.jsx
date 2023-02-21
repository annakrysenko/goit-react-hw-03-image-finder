import styles from './ImageGalleryItem.module.css';
import { Modal } from '../Modal/Modal';
import { Component } from 'react';
import PropTypes from 'prop-types';

export class ImageGalleryItem extends Component {
  state = {
    isShowModal: false,
  };

  toggleModal = () => {
    this.setState(prevState => {
      return {
        isShowModal: !prevState.isShowModal,
      };
    });
  };

  closeModal = () => {
    this.setState(prevState => {
      return {
        isShowModal: false,
      };
    });
  };

  render() {
    return (
      <li className={styles.gallery_item}>
        <img
          src={this.props.webformatURL}
          alt=""
          className={styles.image}
          onClick={this.toggleModal}
        />
        {this.state.isShowModal && (
          <Modal
            largeImageURL={this.props.largeImageURL}
            toggleModal={this.toggleModal}
            closeModal={this.closeModal}
          >
            <img src={this.props.largeImageURL} alt="" />
          </Modal>
        )}
      </li>
    );
  }
}

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
};
