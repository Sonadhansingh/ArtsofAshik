import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaArrowRight } from 'react-icons/fa';
import SkillsChart from './Skills/SkillsChart';
import StrengthChart from './Skills/StrengthChart';
import './Homepage.css';
import ImageRoll from './ImageRoll';
import Competences from './Competences';
import AOS from 'aos';
import 'aos/dist/aos.css';
import EducationExperience from './Education';
// import backgroundvideo from './rr.mp4'

const PublicAppHomePage = () => {
  const [latestVideoUrl, setLatestVideoUrl] = useState('');
  const [bigText, setBigText] = useState('');
  const [links, setLinks] = useState({ generalTitle: '', generalUrl: '', instaTitle: '', instaUrl: '' });
  const [skills, setSkills] = useState([]);
  const [strength, setStrength] = useState([]);
  const [contactDetails, setContactDetails] = useState(null);
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    AOS.init();

    const fetchLatestVideo = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/video/latest`);
        setLatestVideoUrl(response.data.videoUrl);
      } catch (error) {
        console.error('Error fetching latest video:', error);
      }
    };

    const fetchBigText = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/textLink/bigText`);
        setBigText(response.data.length > 0 ? response.data[0].text : '');
      } catch (error) {
        console.error('Error fetching big text:', error);
      }
    };

    const fetchLinks = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/textLink/link`);
        if (response.data.length > 0) {
          const { generalTitle, generalUrl, instaTitle, instaUrl } = response.data[0];
          setLinks({ generalTitle, generalUrl, instaTitle, instaUrl });
        }
      } catch (error) {
        console.error('Error fetching links:', error);
      }
    };

    const fetchSkills = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/skills`);
        setSkills(response.data);
      } catch (error) {
        console.error('Error fetching skills:', error);
      }
    };

    const fetchStrength = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/strength`);
        setStrength(response.data);
      } catch (error) {
        console.error('Error fetching strength:', error);
      }
    };

    fetchLatestVideo();
    fetchBigText();
    fetchLinks();
    fetchSkills();
    fetchStrength();
  }, []);

  useEffect(() => {
    const fetchContactDetails = async () => {
      try {
        const detailsResponse = await axios.get(`${process.env.REACT_APP_API_URL}/api/contact/details`);
        const contactsResponse = await axios.get(`${process.env.REACT_APP_API_URL}/api/contact`);
        setContactDetails(detailsResponse.data);
        setContacts(contactsResponse.data);
        setLoading(false);
      } catch (error) {
        setError('Error fetching contact details');
        setLoading(false);
      }
    };

    fetchContactDetails();
  }, []);

  return (
    <>
      <div className="homepage-container">
        {latestVideoUrl ? (
          <div className='video-wrapper'>
            <video id="bg-home-video" autoPlay loop muted>
              <source src={latestVideoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        ) : (
          <p></p>
        )} 
      </div>

      <div className='wrapper'>
        <p className='small-text'>Exploring art <br />
         through fantasy</p>
        <div className='line-splitter'></div>
        
      {bigText && (
        <div className="big-text-container">
          {bigText}
        </div>
      )}
      <div className='view-more'>
        <a className='view-more' href='/about'>
        View more <span className='icon-right'><FaArrowRight/> </span> </a>
      </div>
      </div>

      <div className='small-wrapper'>
        <p className='right-text'>Education & Experience</p>
        <div className='line-splitter'></div>
      <EducationExperience />
      </div>
      
      
      <div className='small-small-wrapper'>
        <div className="skills-strength-section">
          <div className="text-container">
            <h2>Skills & Strength</h2>
          </div>
          <div className="chart-container">
            <SkillsChart skills={skills} />
            <StrengthChart strength={strength} />
          </div>
        </div>
      </div>

      <Competences/>

      <div className='wrapper'>
        <div className='press-general'>
          <div className='mail-general'>
            <div className='caption'>
              <div className='tag-small small'>
                Press/General inquiries
              </div>
              <div className="icon-arrow">
                <img src="https://cdn.prod.website-files.com/63579a8a30fe81d7748a2ab3/656bc80bd4a1c4e89dc56afd_arrow-bottom.svg" loading="lazy" alt="arrow bottom, white, svg" />
              </div>
            </div>
            <div className='info-mail'>
            {links.generalUrl && (
              <div className="link-container">
                <a className='underline-hover' href={links.generalUrl} target="_blank" rel="noopener noreferrer">{links.generalTitle}</a>
              </div>
            )}
            </div>

          </div>
        </div>
        <div className='line-splitter'></div>
        <div className='press-general'>
          <div className='mail-instagram'>
            <div className='caption'>
              <div className='tag-small small'>
                Instagram
              </div>
              <div className="icon-arrow">
                <img src="https://cdn.prod.website-files.com/63579a8a30fe81d7748a2ab3/656bc80bd4a1c4e89dc56afd_arrow-bottom.svg" loading="lazy" alt="arrow bottom, white, svg" />
              </div>
            </div>
            <div className='info-mail'>
            {links.instaUrl && (
              <div className="link-container">
                <a className='underline-hover' href={links.instaUrl} target="_blank" rel="noopener noreferrer">{links.instaTitle}</a>
              </div>
            )}
            </div>

          </div>
        </div>
      </div>

      <ImageRoll/>

      <div className='line-splitter-big'></div>

      {/* Contact Section */}
      <div className='wrapper normal footer_last'>
      <div className="contact-section">
        {loading ? (
          <p></p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <>
            <div className="contact-links">
              <p className='contact-title'>Social media</p>
                {contacts.map(contact => (
                <div className="contact-details" key={contact._id}>
                  <a href={contact.contactUrl} target="_blank" rel="noopener noreferrer">
                    {contact.heading}
                  </a>
                </div>
              ))}
            </div>

            <div className='contact-links'>
            <p className='contact-title'>Contact</p>
            {contactDetails && (
              <div className="contact-details">
                <p>{contactDetails.phoneNumber}</p>
                <p>{contactDetails.mainId}</p>
              </div>
            )}
            </div>
          </>
        )}
      </div>
      <div className='reserved-container'>
        
      <div className='reserved-text'>
        All rights reserved. <br/>
        @2024
      </div>
      </div>
      <div className='footer-text'>
        Arts of Ashik
      </div>
      </div>
    </>
  );
};

export default PublicAppHomePage;
