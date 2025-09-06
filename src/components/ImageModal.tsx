import React from 'react';

interface ImageModalProps {
  imageUrl: string;
  altText: string;
  isVisible: boolean;
  onClose: () => void;
}

const ImageModal: React.FC<ImageModalProps> = ({ imageUrl, altText, isVisible, onClose }) => {
  if (!isVisible) {
    return null;
  }

  return (
    <div className="image-modal-overlay" onClick={onClose}>
      <div className="image-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="image-modal-close" onClick={onClose}>×</button>
        <img src={imageUrl} alt={altText} className="image-modal-img" />
      </div>
    </div>
  );
};

export default ImageModal;