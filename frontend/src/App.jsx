import React, { useState } from 'react';
import Navbar from './components/Navbar';
import RoverViewport3D from './canvas/RoverViewport3D';
import WelcomePage from './components/WelcomePage';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState('rover');

  const handleLoginSuccess = (userData) => {
    console.log("Logged in user:", userData);
    setIsAuthenticated(true);
  };

  return (
    <>
      {!isAuthenticated ? (
        <WelcomePage onLoginSuccess={handleLoginSuccess} />
      ) : (
        <div style={{ width: '100vw', height: '100vh', margin: 0, padding: 0, overflow: 'hidden', position: 'relative' }}>
          <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
          <RoverViewport3D activeTab={activeTab} />
        </div>
      )}
    </>
  );
}