import css from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ images, openModal }) => {
  const { largeImageURL, webformatURL, tags } = images;
  const imageData = { url: largeImageURL, alt: tags };
  return (
    <li className={css.ImageGalleryItem}>
      <img
        className={css.ImageGalleryItem_image}
        src={webformatURL}
        alt={tags}
        onClick={() => openModal(imageData)}
      />
    </li>
  );
};

export default ImageGalleryItem;
