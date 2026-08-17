import React from 'react';
import RoverViewport3D from './canvas/RoverViewport3D';

export default function App() {
  return (
    <div style={{ width: '100vw', height: '100vh', margin: 0, padding: 0, overflow: 'hidden' }}>
      <RoverViewport3D />
    </div>
  );
}