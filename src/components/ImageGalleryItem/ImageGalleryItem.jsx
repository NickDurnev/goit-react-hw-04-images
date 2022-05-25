import PropTypes from 'prop-types';
import { Item } from './ImageGalleryItem.styled';

const ImageGalleryItem = ({ image, onClick }) => {
  const { webformatURL, largeImageURL, tags } = image;
  return (
    <Item>
      <img
        src={webformatURL}
        alt={tags}
        onClick={() => onClick(largeImageURL, tags)}
      />
    </Item>
  );
};

ImageGalleryItem.propTypes = {
  image: PropTypes.shape({
    webformatURL: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  }),
  onClick: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
