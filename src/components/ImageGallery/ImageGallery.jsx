import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import styles from './ImageGallery.module.css';
import PropTypes from 'prop-types';
import { useEffect } from 'react';

export const ImageGallery = ({ notifySuccess, images, totalHits }) => {
  useEffect(() => {
    notifySuccess(`We find ${totalHits} pictures`);
  }, []);
  //  ??

  return (
    <>
      <ul className={styles.gallery}>
        {images.map(image => {
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
};

ImageGallery.propTypes = {
  images: PropTypes.array.isRequired,
  notifySuccess: PropTypes.func.isRequired,
};
