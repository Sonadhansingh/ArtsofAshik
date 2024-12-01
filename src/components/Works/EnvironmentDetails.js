import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { FaArrowLeft } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import './EnvironmentDetails.css';

const EnvironmentDetails = () => {
  const { id } = useParams();
  const [environment, setEnvironment] = useState(null);
  const mainImageRef = useRef(null);
  const otherImagesRef = useRef([]);
  const videoRef = useRef([]);

  useEffect(() => {
    const fetchEnvironment = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/environment/${id}`);
        setEnvironment(response.data);
      } catch (error) {
        console.error('Error fetching environment details:', error);
      }
    };

    fetchEnvironment();
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
  }, [environment]); 

  return (
    <div className="details-container">
      <div className='details-card'>

      {environment && (
        <>
        <h1 className="details-title">{environment.title}</h1>
        

            <div className='main-image-container'>
              {environment.mainImages && (
                <img 
                  src={environment.mainImages} 
                  alt={environment.title} 
                  ref={mainImageRef} 
                  className='details-image' 
                />
              )}
            </div>

         {/* Additional Images */}
         <div className='details-other-images'>
              {environment.images && environment.images.length > 0 && (
                environment.images.map((image, index) => (
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
             
              {environment.videos && environment.videos.length > 0 && (
                <div className='video-container'>
                  {environment.videos.map((video, index) => (
                    <video key={index} controls loading="lazy" className='video-player' ref={(el) => (videoRef.current[index] = el)}>
                      <source src={video} type='video/mp4' />
                      Your browser does not support the video tag.
                    </video>
                  ))}
                </div>
              )}
            

        <p className="details-description">{environment.description}</p>
  
      </>
    )}

      <div className='bottom-button'>
        <div className='go-back-container'>
          <a className='go-back' href='/environment'>
            <span className='icon-right'><FaArrowLeft/></span>Go back
          </a>
        </div>
      </div>
      </div>
    </div>
  );
};

export default EnvironmentDetails;
