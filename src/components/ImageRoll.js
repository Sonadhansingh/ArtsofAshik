import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ImageRoll.css'; // Import the CSS file for styling

const API_URL = `${process.env.REACT_APP_API_URL}/api/images`;

const ImageRoll = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const response = await axios.get(API_URL); // Fetches image data (S3 URLs) from MongoDB
      setImages(response.data); // Assuming the response is an array of image objects
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  };

  return (
    <div className="carousel-wrapper">
      <div className="carousel">
        {images.map((image, index) => (
          <div key={image._id} className="carousel-image-wrapper">
             <img
              src={image.url} 
              alt={image.filename}
              className="carousel-image"
            />
          </div>
        ))}
        {images.map((image, index) => (
          <div key={index + images.length} className="carousel-image-wrapper">
            <img
              src={image.url} 
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
