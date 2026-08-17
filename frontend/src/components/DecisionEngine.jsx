import React from 'react';

export default function DecisionEngine({ status, latency }) {
  return (
    <div className="glass-panel" style={{ padding: '12px', background: 'rgba(5, 15, 25, 0.75)', border: '1px solid #00e676', color: '#e0f7fc', borderRadius: '8px' }}>
      <h4 style={{ margin: '0 0 8px 0', color: '#00e676' }}>🧠 EDGE DECISION LOGS</h4>
      <div style={{ fontSize: '13px', fontFamily: 'monospace' }}>
        <p style={{ margin: '4px 0' }}><b>STATE:</b> {status}</p>
        <p style={{ margin: '4px 0' }}><b>COMM LAG BUFFER:</b> {latency} sec</p>
        <p style={{ margin: '4px 0', color: status?.includes('REVERSING') ? '#ff5252' : '#80d8ff' }}>
          {status?.includes('REVERSING') ? '⚠️ TRAP DETECTED: Executing local reverse gear...' : '🟢 Traversing optimal spline route.'}
        </p>
      </div>
    </div>
  );
}