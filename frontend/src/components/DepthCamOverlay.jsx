import React from 'react';

export default function DepthCamOverlay({ active }) {
  if (!active) return null;

  return (
    <div className="glass-panel" style={{
      position: 'absolute',
      bottom: 20,
      left: 20,
      width: '220px',
      height: '180px',
      background: 'rgba(0, 20, 30, 0.85)',
      border: '1px solid #ff5252',
      borderRadius: '8px',
      padding: '10px',
      zIndex: 12
    }}>
      <h5 style={{ margin: '0 0 6px 0', color: '#ff5252', fontFamily: 'monospace' }}>
        📷 STEREO / LIDAR DEPTH CAM
      </h5>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(8, 1fr)',
        gap: '2px',
        height: '110px',
        background: '#000'
      }}>
        {Array.from({ length: 64 }).map((_, i) => {
          const isHazard = i % 7 === 0 || i % 11 === 0;
          return (
            <div
              key={i}
              style={{
                background: isHazard ? '#ff5252' : '#00e676',
                opacity: isHazard ? 0.9 : 0.3,
                borderRadius: '1px'
              }}
            />
          );
        })}
      </div>
      <div style={{ fontSize: '10px', color: '#aaa', marginTop: '4px', textAlign: 'center' }}>
        🔴 High Slope/Hazard | 🟢 Clear Path
      </div>
    </div>
  );
}