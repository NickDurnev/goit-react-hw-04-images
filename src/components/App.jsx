import { useState, useEffect, useRef } from 'react';
import { Container } from './App.styled';
import Searchbar from './Searchbar';
import Loader from './Loader';
import Button from './Button';
import Modal from './Modal';
import fetchImages from 'services/api';
import ImageGallery from './ImageGallery';
import ErrorMessage from './ErrorMessage';

export const App = () => {
  const statusRef = useRef({
    IDLE: 'idle',
    PENDING: 'pending',
    RESOLVED: 'resolved',
    REJECTED: 'rejected',
  });

  const [searchValue, setSearchValue] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [images, setimages] = useState([]);
  const [totalImages, setTotalImages] = useState(null);
  const [selectImage, setSelectImage] = useState(null);
  const [selectImageDescription, setSelectImageDescription] = useState(null);
  const [status, setStatus] = useState(statusRef.current.IDLE);
  const [fetchError, setFetchError] = useState(null);
  const [scrollY, setScrollY] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (!searchValue) {
      return;
    }

    setStatus(statusRef.current.PENDING);

    async function fetchData() {
      try {
        const response = await fetchImages(searchValue, currentPage);
        setimages(prev => [...prev, ...response.hits]);
        setTotalImages(response.total);
        setStatus(statusRef.current.RESOLVED);
      } catch (error) {
        setFetchError(error);
        console.log(fetchError);
        setStatus(statusRef.current.REJECTED);
      }
      if (currentPage > 1) {
        setTimeout(() => {
          window.scrollBy({
            top: scrollY * 2,
            behavior: 'smooth',
          });
        }, 0);
      }
    }
    fetchData();
  }, [searchValue, currentPage, scrollY, fetchError]);

  const handleSubmit = value => {
    setSearchValue(value);
    setCurrentPage(1);
    setimages([]);
  };

  const handleLoadMore = () => {
    const { height: galleryHeight } = document
      .querySelector('#gallery')
      .getBoundingClientRect();
    setCurrentPage(prev => prev + 1);
    setScrollY(prev => prev + galleryHeight);
  };

  const openModal = (largeImage, tags) => {
    setIsModalOpen(true);
    setSelectImage(largeImage);
    setSelectImageDescription(tags);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectImage(null);
    setSelectImageDescription(null);
  };

  return (
    <Container>
      <Searchbar onSubmit={value => handleSubmit(value)}></Searchbar>
      <>
        {images.length > 0 && (
          <>
            <ImageGallery
              images={images}
              onClick={(largeImage, tags) => openModal(largeImage, tags)}
            />
            {status === statusRef.current.RESOLVED &&
              images.length < totalImages && (
                <Button onClick={() => handleLoadMore()}>Load more</Button>
              )}
          </>
        )}
        {status === statusRef.current.PENDING && <Loader />}
      </>
      {status === statusRef.current.REJECTED && <ErrorMessage />}
      {isModalOpen && (
        <Modal
          image={selectImage}
          description={selectImageDescription}
          onClose={closeModal}
        />
      )}
    </Container>
  );
};
