import React, { useEffect, useState } from 'react';
import { ThreeDots } from 'react-loader-spinner';
import getImages from '../services/api';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Button from './Button';
import Modal from './Modal';
import css from './App.module.css';

const App = () => {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [loadMore, setLoadMore] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [error, setError] = useState('');

  const onSubmit = searchData => {
    if (query !== searchData) {
      setQuery(searchData);
      setImages([]);
      setPage(1);
    }
  };

  const toggleModal = (modalData = null) => {
    setModalData(modalData);
  };

  useEffect(() => {
    const handleImages = async () => {
      try {
        setIsLoading(true);
        setLoadMore(false);
        const data = await getImages(query, page);
        setImages(prev => [...prev, ...data.hits]);
        setLoadMore(page < Math.ceil(data.totalHits / 12));
        setError('');
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    query && handleImages();
  }, [query, page]);

  return (
    <div className={css.App}>
      <Searchbar onSubmit={onSubmit} />
      {images && <ImageGallery images={images} openModal={toggleModal} />}
      {isLoading && (
        <ThreeDots
          wrapperClass={css.Loader}
          height="80"
          width="80"
          radius="15"
          color="#3f51b5"
          ariaLabel="three-dots-loading"
          visible={true}
        />
      )}
      {loadMore && <Button onClick={() => setPage(prev => prev + 1)} />}
      {query && !images.length && !isLoading && (
        <p className={css.Message}>Sorry, nothing was found for your query.</p>
      )}
      {error && (
        <p className={css.Message}>Sorry, but some error occurred: {error}.</p>
      )}
      {modalData && <Modal modalData={modalData} closeModal={toggleModal} />}
    </div>
  );
};

export default App;
