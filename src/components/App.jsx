import { Component } from 'react';
import getImagesPixabay from 'Servises/imagesAPI';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Searchbar } from './Searchbar/Searchbar';
import Button from './Button/Button';
import styles from './App.module.css';
import { Loader } from './Loader/Loader';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export class App extends Component {
  state = {
    images: [],
    page: 0,
    totalHits: 0,
    query: '',
    isLoader: false,
  };

  componentDidUpdate(_, prevState) {
    if (
      prevState.page !== this.state.page ||
      prevState.query !== this.state.query
    ) {
      this.setState({ isLoader: true });

      getImagesPixabay(this.state.page, this.state.query)
        .then(data => {
          if (data.data.totalHits === 0) {
            this.notifyErr("Sorry! Can't find any pictures");
          }
          this.setState(prevState => {
            return {
              images: [...prevState.images, ...data.data.hits],
              totalHits: [data.data.totalHits],
            };
          });
        })
        .catch(err => console.log(err))
        .finally(() => this.setState({ isLoader: false }));
    }

    if (
      this.state.images.length === this.state.totalHits[0] &&
      this.state.totalHits > 0
    ) {
      console.log(this.state.images.length, this.state.totalHits[0]);
      this.notifyLast('The last page');
    }
  }

  notifyErr = text => toast.error(text);
  notifyLast = text => toast.info(text);
  notifySuccess = text => toast.success(text);

  getImages = ev => {
    ev.preventDefault();
    if (ev.target.nodeName === 'BUTTON') {
      const queryInput = ev.currentTarget.searchInput.value.trim();
      this.setState({
        query: queryInput,
        isShowGallery: true,
        page: 1,
        images: [],
      });
    }
  };

  loadMoreImages = () => {
    this.setState(prevState => {
      return { page: prevState.page + 1 };
    });
  };

  render() {
    return (
      <div className={styles.app}>
        <Searchbar getImages={this.getImages} />
        {this.state.isLoader && <Loader />}
        {this.state.images.length > 0 && (
          <>
            <ImageGallery
              images={this.state.images}
              notifySuccess={this.notifySuccess}
              totalHits={this.state.totalHits}
            />
            {this.state.images.length !== this.state.totalHits[0] && (
              <Button text="Load more" handleClick={this.loadMoreImages} />
            )}
          </>
        )}
        <ToastContainer autoClose={3000} theme="colored" />
      </div>
    );
  }
}
