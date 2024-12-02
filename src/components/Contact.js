import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import './Contact.css';
import ImageRoll from './ImageRoll';

const Contact = () => {
  const [contacts, setContacts] = useState([]);
  const [inquiryType, setInquiryType] = useState('');
  const [budget, setBudget] = useState('');
  const [links, setLinks] = useState({ generalTitle: '', generalUrl: '', instaTitle: '', instaUrl: '' });
  const [contactDetails, setContactDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    fetchContacts();
    fetchLinks();
    fetchContactDetails();
  }, []);

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

  const fetchContacts = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/contact`);
      setContacts(response.data);
    } catch (error) {
      console.error('Error fetching contacts:', error);
    }
  };

  const handleInquiryChange = (event) => {
    setInquiryType(event.target.value);
  };

  const handleBudgetChange = (event) => {
    setBudget(event.target.value);
  };

  if (contacts.length === 0) {
    return <p></p>;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/api/queries`, {
        name: event.target.name.value,
        email: event.target.email.value,
        inquiryType,
        budget,
        message: event.target.message.value,
      });

      Swal.fire({
        title: 'Success!',
        text: 'Your message has been sent successfully.',
        icon: 'success',
        confirmButtonColor: '#000',
        background: '#333',
        color: '#fff',
      });

      // Clear the form or reset state if needed
      event.target.reset();
      setInquiryType('');
      setBudget('');
    } catch (error) {
      console.error('Error submitting the query:', error);
      Swal.fire({
        title: 'Error!',
        text: 'There was an issue submitting your message. Please try again.',
        icon: 'error',
        confirmButtonColor: '#000',
        background: '#333',
        color: '#fff',
      });
    }
  };

  
  return (
    <>
    <div className="contact-container">
      <div className="form-section">
        <div className="heading-section">
          <h1 className='contact-big-heading'>Appointments <br/> & General Info</h1>
          <p className="appointment-info">Interested in appointments? Leave us <br/> a message and we'll get back to you!</p>
        </div>
        <form onSubmit={handleSubmit}>
            <div className="input-group">
              <input className="text-field1" type="text" name="name" placeholder="Enter your name" required />
              <input className="text-field2" type="email" name="email" placeholder="Enter your email" required />
            </div>
            <div className="radio-group">
              <p>Type of Inquiry:</p>
              <label>
                <input type="radio" className="radio-input" value="General Inquiry" checked={inquiryType === 'General Inquiry'} onChange={handleInquiryChange} />
                Character
              </label>
              <label>
                <input type="radio" className="radio-input" value="Technical Support" checked={inquiryType === 'Technical Support'} onChange={handleInquiryChange} />
                Environment
              </label>
              <label>
                <input type="radio" className="radio-input" value="Billing" checked={inquiryType === 'Billing'} onChange={handleInquiryChange} />
                Scripts
              </label>
              <label>
                <input type="radio" className="radio-input" value="Other" checked={inquiryType === 'Other'} onChange={handleInquiryChange} />
                Other
              </label>
            </div>
            <div className="radio-group">
              <p>Budget:</p>
              <label>
                <input type="radio" className="radio-input" value="Below $500" checked={budget === 'Below $500'} onChange={handleBudgetChange} />
                Below $3k
              </label>
              <label>
                <input type="radio" className="radio-input" value="$500 - $1000" checked={budget === '$500 - $1000'} onChange={handleBudgetChange} />
                $3k - $5k
              </label>
              <label>
                <input type="radio" className="radio-input" value="$1000 - $5000" checked={budget === '$1000 - $5000'} onChange={handleBudgetChange} />
                $5k - $15k
              </label>
              <label>
                <input type="radio" className="radio-input" value="Above $5000" checked={budget === 'Above $5000'} onChange={handleBudgetChange} />
                $15k+
              </label>
            </div>
            <input className="description-input" name="message" placeholder="Message" rows="5" required />
            <div className="recaptcha-placeholder">
              <div className="g-recaptcha" data-sitekey="your-site-key"></div>
            </div>
            <button className="contact-send" type="submit">Send</button>
          </form>
      </div>
    </div>
    {/* <div className='contact-wrapper'>
        <p>Press / General inquiries </p>
        
    </div> */}
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
          <div className='designer'>
          <p className='contact-title'>Design & Dev by</p>
            <div className="contact-details">
            <em><a href="mailto:sona24347@gmail.com">Sona Dhansingh</a></em>
            </div>
          </div>
          <div className='contact-main'>
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
            </div>
          </>
        )}
      </div>
      <div className='reserved-container'>
        {/* <div className='desined-text'>
          Design & dev by <br/>
          <span><a className='designer' href=''>Sona Dhansingh</a></span>
        </div> */}
      <div className='reserved-text'>
        All rights reserved. <br/>
        @{new Date().getFullYear()}
      </div>
      </div>
      <div className='footer-text'>
        Arts of Ashik
      </div>
      </div>

    </>
  );
};

export default Contact;
