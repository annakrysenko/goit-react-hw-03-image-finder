import getImagesPixabay from 'Servises/imagesAPI';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Searchbar } from './Searchbar/Searchbar';
import Button from './Button/Button';
import styles from './App.module.css';
import { Loader } from './Loader/Loader';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState, useEffect } from 'react';

export const App = () => {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(0);
  const [totalHits, setTotalHits] = useState(0);
  const [query, setQuery] = useState('');
  const [isLoader, setIsLoader] = useState(false);

  useEffect(() => {
    setIsLoader(true);

    getImagesPixabay(page, query)
      .then(data => {
        if (data.data.totalHits === 0) {
          notifyErr("Sorry! Can't find any pictures");
        }
        setImages(prevState => [...prevState, ...data.data.hits]);
        setTotalHits(prevState => [data.data.totalHits]);
      })
      .catch(err => console.log(err))
      .finally(() => setIsLoader(true));
  }, [query, page]);

  useEffect(() => {
    if (images.length === totalHits[0] && totalHits > 0) {
      notifyLast('The last page');
    }
  }, [images, totalHits]);

  const notifyErr = text => toast.error(text);
  const notifyLast = text => toast.info(text);
  const notifySuccess = text => toast.success(text);

  const getImages = ev => {
    ev.preventDefault();
    if (ev.target.nodeName === 'BUTTON') {
      const queryInput = ev.currentTarget.searchInput.value.trim();

      setImages([]);
      setPage(1);
      setQuery(queryInput);
    }
  };

  const loadMoreImages = () => {
    setPage(prevState => prevState + 1);
  };

  return (
    <div className={styles.app}>
      <Searchbar getImages={getImages} />
      {isLoader && <Loader />}
      {images.length > 0 && (
        <>
          <ImageGallery
            images={images}
            notifySuccess={notifySuccess}
            totalHits={totalHits}
          />
          {images.length !== totalHits[0] && (
            <Button text="Load more" handleClick={loadMoreImages} />
          )}
        </>
      )}
      <ToastContainer autoClose={3000} theme="colored" />
    </div>
  );
};
