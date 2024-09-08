import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Images } from '../config/animeRecomendation';

interface PictureGalleryProps {
  pictures: Images[];
}

const PictureGallery: React.FC<PictureGalleryProps> = ({ pictures }) => {
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);

  const handleImageClick = (large_image_url: string) => {
    setZoomedImage(large_image_url);
  };

  const handleOverlayClick = () => {
    setZoomedImage(null);
  };

  return (
    <div>
      <div className="font-roboto font-bold">
        <h1 className="text-xl text-white my-3">Pictures</h1>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {pictures.map((picture, index) => (
          <motion.div
            key={index}
            onClick={() => handleImageClick(picture.jpg.large_image_url!)}
            className="cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <img
              src={picture.jpg.image_url}
              alt={`Picture ${index + 1}`}
              className="rounded-md object-cover h-auto w-auto"
            />
          </motion.div>
        ))}
      </div>

      {zoomedImage && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50 cursor-zoom-out"
          onClick={handleOverlayClick}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.img
            src={zoomedImage}
            alt="Zoomed"
            className="rounded-md"
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.5 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          />
        </motion.div>
      )}
    </div>
  );
};

export default PictureGallery;
