import React, { useState, useEffect } from 'react';
import axios from 'axios';
import booklogo from './booklogo1.jpg';
import './Education.css';

const EducationExperience = () => {
  const [educations, setEducations] = useState([]);
  const [experiences, setExperiences] = useState([]);

  useEffect(() => {
    const fetchEducations = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/education`);
        setEducations(response.data);
      } catch (error) {
        console.error('Error fetching educations:', error);
      }
    };

    const fetchExperiences = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/experience`);
        setExperiences(response.data);
      } catch (error) {
        console.error('Error fetching experiences:', error);
      }
    };

    fetchEducations();
    fetchExperiences();
  }, []);

  return (
    <div className="education-experience-container">
      <div className="education-section">
        <p className="title">EDUCATION</p>
        <div className="tree">
          {educations.map((education) => (
            <div key={education._id} className="education-branch">
              <div className="education-logo">
                <img className='education-logo' src={booklogo} alt='education'/>
              </div>
              <div className="education-details">
                <p className="education-degree-year">
                  <span className="education-degree">{education.degree}</span>
                  <span className="separator">|</span>
                  <span className="education-year">{education.year}</span>
                </p>
                <p className="education-school">{education.school}</p>
                <p className="education-percentage"><em>Percentage: {education.percentage}</em></p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="experience-section">
        <p className="title">EXPERIENCE</p>
        <div className="tree">
          {experiences.map((experience) => (
            <div key={experience._id} className="experience-branch">
              <div className="experience-logo">
                <img className='experience-logo' src={booklogo} alt='experience'/>
              </div>
              <div className="experience-details">
                <p className="experience-position-company">
                  <span className="experience-position">{experience.position}</span>
                  <span className="separator">|</span>
                  <span className="experience-years">{experience.years}</span>
                </p>
                <p className="experience-company">{experience.company}</p>
                <p className="experience-description"><em>{experience.description}</em></p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EducationExperience;
