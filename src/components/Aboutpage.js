import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaAmazon, FaArrowRight, faArrowRightLong, FaDownload } from 'react-icons/fa';
import './Aboutpage.css';

function AboutPage() {
  const [aboutData, setAboutData] = useState(null);
  const [isInView, setIsInView] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/about`);
        setAboutData(response.data);
      } catch (error) {
        console.error('Error fetching about data:', error);
      }
    };

    fetchAboutData();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const bottomContainer = document.querySelector('.bottom-container');
      if (bottomContainer) {
        const rect = bottomContainer.getBoundingClientRect();
        if (rect.top < window.innerHeight) {
          setIsInView(true);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!aboutData) {
    return <div></div>;
  }

  return (
    <div className="about-container">
      {!imageLoaded && <div className="image-placeholder" />}
      {aboutData.image && (
        <img
          className={`mainImg ${imageLoaded ? 'loaded' : 'loading'}`}
          src={`${process.env.REACT_APP_API_URL}/${aboutData.image}`}
          alt="About"
          onLoad={() => setImageLoaded(true)}
        />
      )}
      <div className="content">
        <div className="subheading-container">
          <p className="subHeadingText">
            {aboutData.subheading || 'Loading subheading...'}
          </p>
        </div>
        <div className="description-container">
          <div className="heading-container">
            <p className="headingText">About Me</p>
          </div>
          <p className="description">
            {aboutData.description || 'Loading About Me...'}
          </p>
        </div>
        <div className={`bottom-container ${isInView ? 'animate' : ''}`}>
          
            <div className="heading-container">
              <p className="workText">About Work</p>
              <p className="purpleText">
            {aboutData.purpleText || 'Loading About work...'}
          </p>
            </div>
          
          <a className="explore" href={`${process.env.REACT_APP_API_URL}/${aboutData.pdf}`}>Download CV < FaDownload /></a>
        </div>
      </div>
    </div>
  );
}

export default AboutPage;
