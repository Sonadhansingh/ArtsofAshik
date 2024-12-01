import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { FaArrowLeft } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import './Details.css';

const Details = () => {
  const { id } = useParams();
  const [character, setCharacter] = useState(null);
  const mainImageRef = useRef(null);
  const otherImagesRef = useRef([]);
  const videoRef = useRef([]);

  useEffect(() => {
    const fetchCharacter = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/content/${id}`);
        setCharacter(response.data);
      } catch (error) {
        console.error('Error fetching character details:', error);
      }
    };

    fetchCharacter();
  }, [id]);

  useEffect(() => {
    // Intersection Observer for fade-in effect
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
        }
      });
    }, { threshold: 0.1 });
  
    // Store refs in local variables
    const mainImageRefCurrent = mainImageRef.current;
    const otherImagesRefCurrent = otherImagesRef.current;
    const videoRefCurrent = videoRef.current;
  
    if (mainImageRefCurrent) observer.observe(mainImageRefCurrent);
    otherImagesRefCurrent.forEach(image => image && observer.observe(image));
    videoRefCurrent.forEach(video => video && observer.observe(video));
  
    return () => {
      if (mainImageRefCurrent) observer.unobserve(mainImageRefCurrent);
      otherImagesRefCurrent.forEach(image => image && observer.unobserve(image));
      videoRefCurrent.forEach(video => video && observer.unobserve(video));
    };
  }, [character]);useEffect(() => {
    // Intersection Observer for fade-in effect
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
        }
      });
    }, { threshold: 0.1 });
  
    // Store refs in local variables
    const mainImageRefCurrent = mainImageRef.current;
    const otherImagesRefCurrent = otherImagesRef.current;
    const videoRefCurrent = videoRef.current;
  
    if (mainImageRefCurrent) observer.observe(mainImageRefCurrent);
    otherImagesRefCurrent.forEach(image => image && observer.observe(image));
    videoRefCurrent.forEach(video => video && observer.observe(video));
  
    return () => {
      if (mainImageRefCurrent) observer.unobserve(mainImageRefCurrent);
      otherImagesRefCurrent.forEach(image => image && observer.unobserve(image));
      videoRefCurrent.forEach(video => video && observer.unobserve(video));
    };
  }, [character]);

  return (
    <div className='details-container'>
      <div className='details-card'>
        {character && (
          <>
            <h1 className="details-title">{character.title}</h1>

            {/* Main Image */}
            <div className='main-image-container'>
              {character.mainImages && (
                <img 
                  src={character.mainImages} 
                  alt={character.title} 
                  ref={mainImageRef} 
                  className='details-image' 
                />
              )}
            </div>

            {/* Additional Images */}
            <div className='details-other-images'>
              {character.images && character.images.length > 0 && (
                character.images.map((image, index) => (
                  <img 
                    key={index} 
                    src={image} 
                    alt={`additional-${index}`} 
                    ref={(el) => (otherImagesRef.current[index] = el)} 
                    className='details-other-image' 
                  />
                ))
              )}
            </div>

            {/* Videos */}
            
              {character.videos && character.videos.length > 0 && (
                <div className='video-container'>
                  {character.videos.map((video, index) => (
                    <video key={index} controls loading="lazy" className='video-player' ref={(el) => (videoRef.current[index] = el)}>
                      <source src={video} type='video/mp4' />
                      Your browser does not support the video tag.
                    </video>
                  ))}
                </div>
              )}
            

            {/* Description */}
            <p className="details-description">{character.description}</p>
          </>
        )}

        <div className='bottom-button'>
          <div className='go-back-container'>
            <a className='go-back' href='/character'>
              <span className='icon-right'><FaArrowLeft /></span>Go back
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Details;
