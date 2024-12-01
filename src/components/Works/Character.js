import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import "./Character.css";

const Character = () => {
  const [content, setContent] = useState([]);
  const [animate, setAnimate] = useState(false);
  
  useEffect(() => {
    fetchContent();
    setAnimate(true);
  }, []);

  const fetchContent = async () => {

    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/content`);
      setContent(response.data);
    } catch (error) {
      console.error('Error fetching content:', error);
    } finally {
  
    }
  };

  return (
    <>
      <div className='character-background'>
        <h1 className={`page-title ${animate ? 'animate' : ''}`}>
          Characters
        </h1>
        
        <div className={`characters-container ${animate ? 'animate' : ''}`}>
          {content.map((item) => (
            <div className='character-card' key={item._id}>
              <Link to={`/details/${item._id}`}>
                <div className='image-container'>
                  {/* <img className='character-image'
                    src={`${process.env.REACT_APP_API_URL}/${item.mainImages[0]}`}
                    alt={item.title}
                  /> */}
                  {item.mainImages && <img src={item.mainImages} alt={item.title} className='character-image'/>}
                  <div className='character-title'>
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

export default Character;
