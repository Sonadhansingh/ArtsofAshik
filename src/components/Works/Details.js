import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { FaArrowLeft } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import './Details.css';

const Details = () => {
  const { id } = useParams();
  const [character, setCharacter] = useState(null);
  const [error, setError] = useState('');
  const [imageWidths, setImageWidths] = useState({});
  
  const mainImageRef = useRef(null);
  const otherImagesRef = useRef([]);
  const descriptionRef = useRef(null);

  useEffect(() => {
    const fetchCharacter = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/content/${id}`);
        setCharacter(response.data);
      } catch (error) {
        console.error('Error fetching character details:', error);
        setError('Failed to load character details');
      }
    };

    fetchCharacter();
  }, [id]);

  useEffect(() => {
    if (character) {
      // Function to handle image width adjustment
      const adjustImageWidth = () => {
        const calculateImageWidth = (image) => {
          const { naturalWidth, naturalHeight } = image;
          return naturalWidth / naturalHeight > 1.5 ? '100%' : '70%';
        };

        // Set width for main image
        if (mainImageRef.current) {
          setImageWidths(prevWidths => ({
            ...prevWidths,
            main: calculateImageWidth(mainImageRef.current)
          }));
        }

        // Set width for other images
        otherImagesRef.current.forEach((image, index) => {
          setImageWidths(prevWidths => ({
            ...prevWidths,
            [`other-${index}`]: calculateImageWidth(image)
          }));
        });
      };

      // Adjust image width after images have loaded
      if (mainImageRef.current) mainImageRef.current.onload = adjustImageWidth;
      otherImagesRef.current.forEach(image => image.onload = adjustImageWidth);

      // Adjust width on component mount and update
      adjustImageWidth();
    }
  }, [character]);

  useEffect(() => {
    // Intersection Observer to handle animations on scroll
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
        } else {
          entry.target.classList.remove('animate');
        }
      });
    }, { threshold: 0.1 });

    // Observe the main image
    if (mainImageRef.current) {
      observer.observe(mainImageRef.current);
    }

    // Observe other images
    otherImagesRef.current.forEach(image => {
      if (image) {
        observer.observe(image);
      }
    });

    // Observe the description
    if (descriptionRef.current) {
      observer.observe(descriptionRef.current);
    }

    return () => {
      // Clean up the observer on component unmount
      if (mainImageRef.current) {
        observer.unobserve(mainImageRef.current);
      }
      otherImagesRef.current.forEach(image => {
        if (image) {
          observer.unobserve(image);
        }
      });
      if (descriptionRef.current) {
        observer.unobserve(descriptionRef.current);
      }
    };
  }, [character]);

  if (error) {
    return <div>{error}</div>;
  }

  if (!character) {
    return <div></div>;
  }

  return (
    <div className="details-container">
      <div className='details-card'>
        <h1 className="details-title">{character.title}</h1>
        <img
          src={`${process.env.REACT_APP_API_URL}/${character.mainImages[0]}`}
          alt={character.title}
          className="details-image"
          ref={mainImageRef}
          style={{ width: imageWidths.main }}
        />
        <div className="details-other-images">
          {character.images.map((image, index) => (
            <img
              key={index}
              src={`${process.env.REACT_APP_API_URL}/${image}`}
              alt={`Detail ${index}`}
              className="details-other-image"
              ref={el => otherImagesRef.current[index] = el}
              style={{ width: imageWidths[`other-${index}`] }}
            />
          ))}
        </div>
        <p className="details-description" ref={descriptionRef}>{character.description}</p>
      </div>
      <div className='bottom-button'>
        <div className='go-back-container'>
          <a className='go-back' href='/character'>
          <span className='icon-right'><FaArrowLeft/></span>Go back</a>
        </div>
      </div>
    </div>
  );
};

export default Details;
