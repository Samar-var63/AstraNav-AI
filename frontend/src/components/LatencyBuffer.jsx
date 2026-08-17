import React from 'react';

export default function LatencyBuffer({ latency, setLatency }) {
  return (
    <div className="glass-panel" style={{
      padding: '8px 12px',
      background: 'rgba(0, 0, 0, 0.75)',
      border: '1px solid #ffb74d',
      borderRadius: '6px',
      color: '#ffe0b2',
      fontSize: '12px'
    }}>
      <label style={{ display: 'block', marginBottom: '4px' }}>
        ⏱️ <b>Simulated Signal Delay:</b> {latency}s
      </label>
      <input
        type="range"
        min="0"
        max="1200"
        value={latency}
        onChange={(e) => setLatency(Number(e.target.value))}
        style={{ width: '100%', cursor: 'pointer' }}
      />
    </div>
  );
}