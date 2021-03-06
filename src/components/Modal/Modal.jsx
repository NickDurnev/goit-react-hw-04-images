import PropTypes from 'prop-types';
import { useCallback, useEffect } from 'react';
import Overlay from './Modal.styled';

const Modal = ({ image, description, onClose }) => {
  const handleKeyDownClose = useCallback(
    e => {
      if (e.code === 'Escape') {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDownClose);
    return () => {
      window.removeEventListener('keydown', handleKeyDownClose);
    };
  }, [handleKeyDownClose]);

  const handleClickClose = e => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <Overlay onClick={handleClickClose}>
      <div>
        <img src={image} alt={description} />
      </div>
    </Overlay>
  );
};

Modal.propTypes = {
  image: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Modal;
