import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { FaDownload } from 'react-icons/fa';
import './Aboutpage.css';

function AboutPage() {
  const [aboutData, setAboutData] = useState(null);  // To store the response from the API
  const [imageLoaded, setImageLoaded] = useState(false); // To handle image loading state
  const [isInView, setIsInView] = useState(false);  // To detect when the bottom container is in view

  // Ref to handle scroll event if needed
  const aboutContainerRef = useRef(null);

  // Fetch the data from the API, including the S3 URL for the image
  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/about`);
        setAboutData(response.data);  // Set the response data to state (including the image URL)
      } catch (error) {
        console.error('Error fetching about data:', error);
      }
    };
    
    fetchAboutData();
  }, []);  // Runs only once when the component mounts

  // Scroll detection to trigger animation when bottom container comes into view
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
  }, []); // This hook now runs unconditionally

  // Ensure that both useEffects are called, even if aboutData hasn't loaded yet
  return (
    <div className="about-container" ref={aboutContainerRef}>
      {/* Display placeholder while the image is loading */}
      {!imageLoaded && <div className="image-placeholder" />}

      {/* Display the image fetched from S3 bucket (via API URL) */}
      {aboutData && aboutData.image && (
        <img
          className={`mainImg ${imageLoaded ? 'loaded' : 'loading'}`}
          src={aboutData.image}  // The URL of the image is expected to be stored in 'aboutData.image'
          alt="About"
          onLoad={() => setImageLoaded(true)}  // Set the image loaded state to true when the image is fully loaded
        />
      )}

      {/* Content Section */}
      <div className="content">
        <div className="subheading-container">
          <p className="subHeadingText">
            {aboutData ? aboutData.subheading : ''}
          </p>
        </div>
        <div className="description-container">
          <div className="heading-container">
            <p className="headingText">About Me</p>
          </div>
          <p className="description">
            {aboutData ? aboutData.description : ''}
          </p>
        </div>

        <div className={`bottom-container ${isInView ? 'animate' : ''}`}>
          {/* About Work Section */}
          <div className="heading-container">
            <p className="workText">About Work</p>
            <p className="purpleText">
              {aboutData ? aboutData.purpleText : ''}
            </p>
          </div>

          {/* Download CV Button */}
          {aboutData && aboutData.pdf && (
            <a
              className="explore"
              href={aboutData.pdf}  // Link to the S3 bucket URL for the PDF file
              target="_blank"
              rel="noopener noreferrer"
            >
              Download CV <FaDownload />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default AboutPage;
