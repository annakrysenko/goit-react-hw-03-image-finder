import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
// import { Component } from 'react';
import styles from './ImageGallery.module.css';
import PropTypes from 'prop-types';
import { Component } from 'react';

export class ImageGallery extends Component {
  componentDidMount() {
    console.log('hello');
    this.props.notifySuccess(`We find ${this.props.totalHits} pictures`);
  }
  render() {
    return (
      <>
        <ul className={styles.gallery}>
          {this.props.images.map(image => {
            return (
              <ImageGalleryItem
                key={image.id}
                webformatURL={image.webformatURL}
                largeImageURL={image.largeImageURL}
              />
            );
          })}
        </ul>
      </>
    );
  }
}

ImageGallery.propTypes = {
  images: PropTypes.array.isRequired,
};
