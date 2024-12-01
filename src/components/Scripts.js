import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Scripts.css';

const Scripts = () => {
  const [scripts, setScripts] = useState([]);

  useEffect(() => {
    const fetchScripts = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/scripts`);
        setScripts(response.data);
      } catch (error) {
        console.error('Error fetching scripts:', error);
      }
    };

    fetchScripts();
  }, []);


  return (
    <div className="script-container">
      <p className="title">SCRIPTS</p>
      {scripts.map((script) => (
        <div key={script._id} className="script-card fade-in">
          <div className="script-imagecontainer">
          <img src={script.imageUrl} alt={script.title} className="script-image" />
          </div>
          <div className="script-content slide-in-right">
            <h3 className="script-title">{script.title}</h3>
            <p className="script-description">{script.description}</p>
            <a href={script.pdfUrl} download className="script-download">
              <button className="script-button-container">
                <span className="button-content">Download PDF</span>
              </button>
            </a>
          </div>
        </div>
      ))}

    </div>
  );
};

export default Scripts;
