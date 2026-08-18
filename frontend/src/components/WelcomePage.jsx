import React, { useState } from 'react';

export default function WelcomePage({ onLoginSuccess }) {
  const [showAccountSelector, setShowAccountSelector] = useState(false);
  const [customEmail, setCustomEmail] = useState('');

  const accounts = [
    { name: 'Samar Varshney', email: 'samar.varshney@gmail.com', avatar: 'S' },
    { name: 'AstraNav Admin', email: 'admin.rover@astranav.ai', avatar: 'A' }
  ];

  const handleSelectAccount = (email) => {
    setShowAccountSelector(false);
    if (onLoginSuccess) {
      onLoginSuccess({ email });
    }
  };

  const handleCustomSubmit = (e) => {
    e.preventDefault();
    if (customEmail) {
      handleSelectAccount(customEmail);
    }
  };

  return (
    <div style={{
      position: 'relative',
      width: '100vw',
      height: '100vh',
      backgroundColor: '#f8fafc',
      color: '#1e293b',
      overflow: 'hidden',
      fontFamily: "'Inter', sans-serif",
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      boxSizing: 'border-box'
    }}>
      {/* Header */}
      <header style={{
        position: 'relative',
        zIndex: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '24px 48px',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        borderBottom: '1px solid #e2e8f0'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '38px',
            height: '38px',
            borderRadius: '10px',
            background: '#2563eb',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            fontSize: '18px'
          }}>
            🚀
          </div>
          <span style={{ fontSize: '1.25rem', fontWeight: '700', color: '#0f172a' }}>
            AstraNav AI
          </span>
        </div>

        <nav style={{ display: 'flex', gap: '32px', fontSize: '0.95rem', fontWeight: '500', color: '#475569' }}>
          <span>Explore</span>
          <span>Telemetry</span>
          <span>AI Planner</span>
          <span>About Us</span>
        </nav>

        <div style={{ fontSize: '0.85rem', fontWeight: '600', color: '#64748b' }}>
          MISSION: LUNAR-01
        </div>
      </header>

      {/* Main Content */}
      <main style={{
        position: 'relative',
        zIndex: 10,
        maxWidth: '750px',
        padding: '0 48px',
        marginTop: 'auto',
        marginBottom: 'auto'
      }}>
        <div style={{
          display: 'inline-flex',
          padding: '6px 14px',
          borderRadius: '20px',
          backgroundColor: '#eff6ff',
          border: '1px solid #bfdbfe',
          fontSize: '0.825rem',
          fontWeight: '600',
          color: '#2563eb',
          marginBottom: '20px'
        }}>
          ✦ AUTONOMOUS SPACE NAVIGATION PLATFORM
        </div>

        <h1 style={{ fontSize: '3.5rem', fontWeight: '800', lineHeight: '1.1', color: '#0f172a', marginBottom: '20px' }}>
          Explore deep space with precision AI.
        </h1>

        <p style={{ fontSize: '1.15rem', color: '#475569', marginBottom: '32px', maxWidth: '620px' }}>
          Next-generation autonomous rover control system with real-time spline pathfinding, 
          LiDAR depth mapping, and low-latency telemetry.
        </p>

        {/* Login Box */}
        <div style={{
          display: 'inline-flex',
          flexDirection: 'column',
          gap: '14px',
          padding: '24px 28px',
          backgroundColor: '#ffffff',
          borderRadius: '16px',
          border: '1px solid #e2e8f0',
          boxShadow: '0 10px 30px -10px rgba(0,0,0,0.08)'
        }}>
          <span style={{ fontSize: '0.875rem', fontWeight: '600', color: '#334155' }}>
            Sign in with Gmail to access Mission Control
          </span>

          <button
            onClick={() => setShowAccountSelector(true)}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '12px',
              padding: '12px 24px',
              backgroundColor: '#ffffff',
              color: '#3c4043',
              border: '1px solid #dadce0',
              borderRadius: '24px',
              fontSize: '0.95rem',
              fontWeight: '600',
              cursor: 'pointer'
            }}
          >
            <svg width="18" height="18" viewBox="0 0 18 18">
              <path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.616z"/>
              <path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z"/>
              <path fill="#FBBC05" d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z"/>
              <path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z"/>
            </svg>
            Sign in with Google
          </button>
        </div>
      </main>

      {/* Gmail Account Selector Popup */}
      {showAccountSelector && (
        <div style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.4)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 100
        }}>
          <div style={{
            width: '360px',
            backgroundColor: '#ffffff',
            borderRadius: '16px',
            padding: '24px',
            boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
            position: 'relative'
          }}>
            <button
              onClick={() => setShowAccountSelector(false)}
              style={{ position: 'absolute', top: '16px', right: '16px', border: 'none', background: 'none', fontSize: '18px', cursor: 'pointer' }}
            >
              ✕
            </button>

            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
              <h2 style={{ fontSize: '1.25rem', margin: '0 0 4px 0', color: '#202124' }}>Choose an account</h2>
              <p style={{ fontSize: '0.85rem', color: '#5f6368', margin: 0 }}>to continue to AstraNav AI</p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px' }}>
              {accounts.map((acc, i) => (
                <div
                  key={i}
                  onClick={() => handleSelectAccount(acc.email)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '10px 12px',
                    borderRadius: '8px',
                    border: '1px solid #e0e0e0',
                    cursor: 'pointer'
                  }}
                >
                  <div style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    backgroundColor: '#1a73e8',
                    color: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: '700'
                  }}>
                    {acc.avatar}
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={{ fontSize: '0.9rem', fontWeight: '600', color: '#3c4043' }}>{acc.name}</span>
                    <span style={{ fontSize: '0.8rem', color: '#5f6368' }}>{acc.email}</span>
                  </div>
                </div>
              ))}
            </div>

            <form onSubmit={handleCustomSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '8px', borderTop: '1px solid #eee', paddingTop: '16px' }}>
              <label style={{ fontSize: '0.8rem', fontWeight: '600', color: '#5f6368' }}>Use another email:</label>
              <input
                type="email"
                placeholder="Enter email@gmail.com"
                value={customEmail}
                onChange={(e) => setCustomEmail(e.target.value)}
                required
                style={{
                  padding: '10px 12px',
                  borderRadius: '6px',
                  border: '1px solid #dadce0',
                  fontSize: '0.9rem'
                }}
              />
              <button
                type="submit"
                style={{
                  padding: '10px',
                  borderRadius: '6px',
                  border: 'none',
                  backgroundColor: '#1a73e8',
                  color: '#ffffff',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                Sign In & Continue
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer style={{
        position: 'relative',
        zIndex: 10,
        padding: '24px 48px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderTop: '1px solid #e2e8f0',
        backgroundColor: '#ffffff',
        fontSize: '0.85rem',
        color: '#64748b'
      }}>
        <div>MARE TRANQUILLITATIS | SILICA CRATER</div>
        <div style={{
          backgroundColor: '#f1f5f9',
          padding: '8px 16px',
          borderRadius: '8px',
          fontWeight: '700',
          color: '#0f172a'
        }}>
          ⊕ LUNAR BASIN, SECTOR 07
        </div>
      </footer>
    </div>
  );
}