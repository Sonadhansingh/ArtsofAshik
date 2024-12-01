import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Competences.css';

const Competences = () => {
  const [competences, setCompetences] = useState([]);

  useEffect(() => {
    fetchCompetences();
  }, []);

  const fetchCompetences = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/competence`);
      setCompetences(response.data);
    } catch (error) {
      console.error('Error fetching competences:', error);
    }
  };

  return (
    <div className="public-competence-container">
      <h1 className="public-competence-title underline-hover">Competences</h1>
      {/* <div className='line-splitter'></div> */}
      <div className="public-competence-grid">
        {competences.length === 0 ? (
          <p></p>
        ) : (
          competences.map((item) => (
            <div key={item._id} className="public-competence-item">
              {item.image && (
                <img
                src={item.image}
                alt="Competence"
                className="public-competence-image"
              />
              )}
              <p className="public-competence-title">{item.title}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Competences;
