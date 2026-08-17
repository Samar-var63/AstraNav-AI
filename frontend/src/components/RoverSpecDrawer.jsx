import React from 'react';

export default function RoverSpecDrawer({ roverData }) {
  if (!roverData) return null;

  return (
    <div className="glass-panel" style={{
      padding: '16px',
      background: 'rgba(10, 25, 40, 0.85)',
      border: '1px solid #40c4ff',
      color: '#e0f7fc',
      width: '280px',
      borderRadius: '8px'
    }}>
      <h3 style={{ margin: '0 0 10px 0', borderBottom: '1px solid #40c4ff', fontSize: '15px', color: '#40c4ff' }}>
        ⚙️ {roverData.name} SPECS
      </h3>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '12px', lineHeight: '1.8' }}>
        <li>⚡ <b>Power Source:</b> {roverData.power}</li>
        <li>⚖️ <b>Mass/Weight:</b> {roverData.weight}</li>
        <li>🏎️ <b>Max Velocity:</b> {roverData.speed}</li>
        <li>📷 <b>Optical Rig:</b> Dual NavCam / HazCam Stereo Arrays</li>
        <li>🔬 <b>Payload Instruments:</b> {roverData.instruments ? roverData.instruments.join(', ') : 'N/A'}</li>
      </ul>
    </div>
  );
}