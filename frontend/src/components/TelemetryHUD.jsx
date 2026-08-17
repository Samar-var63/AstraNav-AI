import React from 'react';

export default function TelemetryHUD({ telemetry }) {
  if (!telemetry) return null;

  return (
    <div className="glass-panel" style={{
      padding: '12px 16px',
      background: 'rgba(5, 15, 25, 0.85)',
      border: '1px solid #00e676',
      color: '#e0f7fc',
      borderRadius: '8px',
      minWidth: '220px'
    }}>
      <h4 style={{ margin: '0 0 8px 0', color: '#00e676', fontSize: '14px' }}>📡 TELEMETRY HUD</h4>
      <div style={{ fontSize: '12px', fontFamily: 'monospace', lineHeight: '1.6' }}>
        <div><b>POS (X,Y,Z):</b> {telemetry.x ?? 0}, {telemetry.y ?? 0}, {telemetry.z ?? 0}</div>
        <div><b>PITCH / ROLL:</b> {telemetry.pitch ?? 0}° / {telemetry.roll ?? 0}°</div>
        <div><b>HEADING:</b> {telemetry.heading ?? 0}°</div>
        <div><b>DRIFT ERR:</b> {telemetry.drift_percentage ?? 0}%</div>
        <div><b>SPEED:</b> {telemetry.speed || '0 km/h'}</div>
      </div>
    </div>
  );
}