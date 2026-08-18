import React, { useState } from 'react';
import Navbar from './components/Navbar';
import RoverSelection from './components/RoverSelection';
import './index.css';

export default function App() {
  const [activeTab, setActiveTab] = useState('rover');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleAuthToggle = () => {
    setIsLoggedIn(!isLoggedIn);
  };

  return (
    <div style={{ minHeight: '100vh', position: 'relative', backgroundColor: '#020617' }}>
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab}
        isLoggedIn={isLoggedIn}
        onAuthToggle={handleAuthToggle}
      />

      <main style={{
        minHeight: '100vh',
        padding: '120px 20px 40px 20px',
        boxSizing: 'border-box'
      }}>
        {!isLoggedIn ? (
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: 'calc(100vh - 160px)'
          }}>
            <div style={{
              background: 'rgba(15, 23, 42, 0.75)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              border: '1px solid rgba(0, 240, 255, 0.3)',
              borderRadius: '24px',
              padding: '48px 40px',
              textAlign: 'center',
              maxWidth: '450px',
              width: '100%',
              boxShadow: '0 0 40px rgba(0, 240, 255, 0.2)'
            }}>
              <h1 style={{
                color: '#ffffff',
                fontSize: '28px',
                fontWeight: 'bold',
                margin: '0 0 12px 0',
                letterSpacing: '1.5px',
                textShadow: '0 0 12px rgba(0, 240, 255, 0.6)'
              }}>
                AstraNav AI
              </h1>
              
              <p style={{
                color: '#94a3b8',
                fontSize: '14px',
                margin: '0 0 32px 0',
                lineHeight: '1.5'
              }}>
                Access autonomous space navigation, telemetry, and hazard tracking.
              </p>

              <button 
                onClick={handleAuthToggle}
                style={{
                  background: 'linear-gradient(135deg, #00f0ff 0%, #7000ff 100%)',
                  color: '#ffffff',
                  border: 'none',
                  padding: '14px 32px',
                  borderRadius: '50px',
                  fontWeight: 'bold',
                  fontSize: '15px',
                  cursor: 'pointer',
                  boxShadow: '0 0 20px rgba(0, 240, 255, 0.4)',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease'
                }}
              >
                🚀 Launch Dashboard
              </button>
            </div>
          </div>
        ) : (
          <div>
            {activeTab === 'rover' && <RoverSelection />}

            {activeTab !== 'rover' && (
              <div style={{ color: '#fff', textAlign: 'center', marginTop: '50px' }}>
                <h2 style={{ fontSize: '24px', color: '#00f0ff' }}>
                  System Operational: {activeTab.toUpperCase()}
                </h2>
                <p style={{ color: '#cbd5e1' }}>
                  Welcome back, Commander. Connected to Astra-Nav telemetry.
                </p>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}