import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { FaArrowLeft } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import './EnvironmentDetails.css';

const EnvironmentDetails = () => {
  const { id } = useParams();
  const [environment, setEnvironment] = useState(null);
  const [error, setError] = useState('');
  const [imageWidths, setImageWidths] = useState({});

  const mainImageRef = useRef(null);
  const otherImagesRef = useRef([]);
  const descriptionRef = useRef(null);

  useEffect(() => {
    const fetchEnvironment = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/environment/${id}`);
        setEnvironment(response.data);
      } catch (error) {
        console.error('Error fetching environment details:', error);
        setError('Failed to load environment details');
      }
    };

    fetchEnvironment();
  }, [id]);

  useEffect(() => {
    if (environment) {
      const adjustImageWidth = () => {
        const calculateImageWidth = (image) => {
          const { naturalWidth, naturalHeight } = image;
          return naturalWidth / naturalHeight > 1.5 ? '100%' : '70%';
        };

        if (mainImageRef.current) {
          setImageWidths(prevWidths => ({
            ...prevWidths,
            main: calculateImageWidth(mainImageRef.current)
          }));
        }

        otherImagesRef.current.forEach((image, index) => {
          setImageWidths(prevWidths => ({
            ...prevWidths,
            [`other-${index}`]: calculateImageWidth(image)
          }));
        });
      };

      if (mainImageRef.current) mainImageRef.current.onload = adjustImageWidth;
      otherImagesRef.current.forEach(image => image.onload = adjustImageWidth);

      adjustImageWidth();
    }
  }, [environment]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
        } else {
          entry.target.classList.remove('animate');
        }
      });
    }, { threshold: 0.1 });

    if (mainImageRef.current) {
      observer.observe(mainImageRef.current);
    }

    otherImagesRef.current.forEach(image => {
      if (image) {
        observer.observe(image);
      }
    });

    if (descriptionRef.current) {
      observer.observe(descriptionRef.current);
    }

    return () => {
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
  }, [environment]);

  if (error) {
    return <div>{error}</div>;
  }

  if (!environment) {
    return <div></div>;
  }

  return (
    <div className="details-container">
      <div className='details-card'>
        <h1 className="details-title">{environment.title}</h1>
        <img
          src={`${process.env.REACT_APP_API_URL}/${environment.mainImages[0]}`}
          alt={environment.title}
          className="details-image"
          ref={mainImageRef}
          style={{ width: imageWidths.main }}
        />
        <div className="details-other-images">
          {environment.images.map((image, index) => (
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
        <p className="details-description" ref={descriptionRef}>{environment.description}</p>
      </div>
      <div className='bottom-button'>
        <div className='go-back-container'>
          <a className='go-back' href='/environment'>
            <span className='icon-right'><FaArrowLeft/></span>Go back
          </a>
        </div>
      </div>
    </div>
  );
};

export default EnvironmentDetails;
