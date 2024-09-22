import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ImageRoll.css'; // Import the CSS file for styling

const ImageRoll = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/api/images`);
      setImages(data);
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  };

  return (
    <div className="carousel-wrapper">
      <div className="carousel">
        {images.map((image, index) => (
          <div key={index} className="carousel-image-wrapper">
            <img
              src={`${process.env.REACT_APP_API_URL}/${image.path}`}
              alt={image.filename}
              className="carousel-image"
            />
          </div>
        ))}
        {images.map((image, index) => (
          <div key={index + images.length} className="carousel-image-wrapper">
            <img
              src={`${process.env.REACT_APP_API_URL}/${image.path}`}
              alt={image.filename}
              className="carousel-image"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageRoll;
