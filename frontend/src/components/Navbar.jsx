import React from 'react';

export default function Navbar({ activeTab, setActiveTab, isLoggedIn, onAuthToggle }) {
  const tabs = [
    { id: 'rover', label: 'Rover Selection' },
    { id: 'frequency', label: 'Frequency & Comms' },
    { id: 'camera', label: 'Camera / Depth' },
    { id: 'hazards', label: 'Meteoroid Hazards' },
    { id: 'location', label: 'Telemetry & Location' },
  ];

  return (
    <nav style={{
      position: 'fixed',
      top: '20px',
      left: '50%',
      transform: 'translateX(-50%)',
      width: '90%',
      maxWidth: '1200px',
      zIndex: 1000,
      background: 'rgba(3, 7, 18, 0.75)',
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      border: '1px solid rgba(0, 240, 255, 0.25)',
      borderRadius: '50px',
      padding: '10px 24px',
      display: 'flex',
      alignItems: 'center',
      justify: 'space-between',
      boxShadow: '0 8px 32px 0 rgba(0, 240, 255, 0.15)'
    }}>
      {/* Brand Logo */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#fff', fontWeight: 'bold', fontSize: '18px' }}>
        <span style={{ fontSize: '22px' }}>🚀</span>
        <span style={{ letterSpacing: '1px', textShadow: '0 0 10px rgba(0, 240, 255, 0.5)' }}>AstraNav AI</span>
      </div>

      {/* Navigation Tabs */}
      <div style={{ display: 'flex', gap: '8px' }}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              background: activeTab === tab.id ? 'rgba(0, 240, 255, 0.2)' : 'transparent',
              border: activeTab === tab.id ? '1px solid rgba(0, 240, 255, 0.5)' : '1px solid transparent',
              color: activeTab === tab.id ? '#00f0ff' : 'rgba(255, 255, 255, 0.7)',
              padding: '8px 18px',
              borderRadius: '30px',
              cursor: 'pointer',
              fontSize: '13px',
              fontWeight: '500',
              transition: 'all 0.3s ease'
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Top-Right Log In / Log Out Toggle Button */}
      <button 
        onClick={onAuthToggle}
        style={{
          background: isLoggedIn 
            ? 'rgba(255, 59, 48, 0.2)' 
            : 'linear-gradient(135deg, #7000ff 0%, #00f0ff 100%)',
          border: isLoggedIn ? '1px solid #ff3b30' : 'none',
          color: '#fff',
          fontWeight: 'bold',
          padding: '8px 22px',
          borderRadius: '30px',
          cursor: 'pointer',
          fontSize: '13px',
          transition: 'all 0.3s ease',
          boxShadow: isLoggedIn 
            ? '0 0 15px rgba(255, 59, 48, 0.4)' 
            : '0 0 15px rgba(0, 240, 255, 0.4)'
        }}
      >
        {isLoggedIn ? 'Log Out' : 'Log In'}
      </button>
    </nav>
  );
}