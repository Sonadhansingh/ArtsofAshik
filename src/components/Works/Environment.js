import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import "./Environment.css";

const Environment = () => {
  const [environment, setEnvironment] = useState([]);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    fetchEnvironment();
    setAnimate(true);
  }, []);

  const fetchEnvironment = async () => {

    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/environment`);
      setEnvironment(response.data);
    } catch (error) {
      console.error('Error fetching content:', error);
    } finally {
  
    }
  };

  return (
    <>
      <div className='environment-background'>
        <h1 className={`page-title ${animate ? 'animate' : ''}`}>
          Environments
        </h1>
        
        <div className={`environment-container ${animate ? 'animate' : ''}`}>
          {environment.map((item) => (
            <div className='environment-card' key={item._id}>
              <Link to={`/environmentdetails/${item._id}`}>
                <div className='image-container'>
                  {/* <img className='environment-image'
                    src={`${process.env.REACT_APP_API_URL}/${item.mainImages[0]}`}
                    alt={item.title}
                  /> */}
                  {item.mainImages && <img src={item.mainImages} alt={item.title} className='environment-image'/>}
                  <div className='environment-title'>
                    <p>{item.title}</p>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Environment;
