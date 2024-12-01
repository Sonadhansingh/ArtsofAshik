import React from 'react';
import './Main.css';
import { useNavigate } from 'react-router-dom';
import lapbackground from './lapbackground.mp4';
import phbackground from "./phbackground.jpg";

function Main() {
    const navigate= useNavigate();

    const handleLeftClick = () =>{
        navigate('/character')
    }

    const handleRightClick = () =>{
        navigate('/environment')
    }

  return (
    <div className='main-container'>
       <div className="background-video">
      <video autoPlay muted id='bg-video'>
        <source src={lapbackground} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <img src={phbackground} alt='background' id="bg-image" />    
      </div>
    <div className='content-container'>
         <button className="main-left-button" onClick={handleLeftClick} aria-label="Navigate to left page">CHARACTER</button>
         <button className="main-right-button" onClick={handleRightClick} aria-label="Navigate to right page">ENVIRONMENT</button>
       </div>
    </div>
  )
}

export default Main