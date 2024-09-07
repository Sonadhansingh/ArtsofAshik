import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Homepage from './components/Homepage';
import Navbar from './components/Navbar';
import Main from './components/Works/Main';
import Character from './components/Works/Character';
import Details from './components/Works/Details';
import Environment from './components/Works/Environment';
import Scripts from './components/Scripts';
import Aboutpage from './components/Aboutpage';
import Contact from './components/Contact';
import EnvironmentDetails from './components/Works/EnvironmentDetails';
import LoadingScreen from './components/LoadingScreen';

const App = () => {
  const [showLoading, setShowLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    // Show the loading screen only for the homepage
    if (location.pathname === "/") {
      setShowLoading(true);
    } else {
      setShowLoading(false);
    }
  }, [location.pathname]);

  const handleLoaded = () => {
    setShowLoading(false);
  };

  return (
    <>
      {showLoading && location.pathname === "/" ? (
        <LoadingScreen onLoaded={handleLoaded} />
      ) : (
        <>
          <Navbar />
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/main" element={<Main />} />
            <Route path="/character" element={<Character />} />
            <Route path="/details/:id" element={<Details />} />
            <Route path="/environment" element={<Environment />} />
            <Route path="/environmentdetails/:id" element={<EnvironmentDetails />} />
            <Route path="/scripts" element={<Scripts />} />
            <Route path="/about" element={<Aboutpage />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </>
      )}
    </>
  );
};

export default App;
