import React from 'react';

export default function Navbar({ activeTab, setActiveTab }) {
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
      background: 'rgba(15, 23, 42, 0.45)',
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      border: '1px solid rgba(255, 255, 255, 0.15)',
      borderRadius: '50px',
      padding: '10px 24px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)'
    }}>
      {/* Brand Logo */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#fff', fontWeight: 'bold', fontSize: '18px' }}>
        <span style={{ fontSize: '22px' }}>🚀</span>
        <span style={{ letterSpacing: '1px' }}>AstraNav AI</span>
      </div>

      {/* Navigation Tabs */}
      <div style={{ display: 'flex', gap: '8px' }}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              background: activeTab === tab.id ? 'rgba(255, 255, 255, 0.2)' : 'transparent',
              border: activeTab === tab.id ? '1px solid rgba(255, 255, 255, 0.3)' : 'none',
              color: activeTab === tab.id ? '#ffffff' : 'rgba(255, 255, 255, 0.7)',
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

      {/* Login Action Button */}
      <button style={{
        background: 'linear-gradient(135deg, #00e676 0%, #00b0ff 100%)',
        border: 'none',
        color: '#000',
        fontWeight: 'bold',
        padding: '8px 22px',
        borderRadius: '30px',
        cursor: 'pointer',
        fontSize: '13px',
        boxShadow: '0 0 15px rgba(0, 230, 118, 0.4)'
      }}>
        Login
      </button>
    </nav>
  );
}