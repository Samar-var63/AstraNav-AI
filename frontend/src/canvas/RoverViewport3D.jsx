import React, { useState, useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import TrajectorySpline from './TrajectorySpline';
import MeteorMesh from './MeteorMesh';
import TelemetryHUD from '../components/TelemetryHUD';
import RoverSpecDrawer from '../components/RoverSpecDrawer';
import DecisionEngine from '../components/DecisionEngine';
import DepthCamOverlay from '../components/DepthCamOverlay';

export default function RoverViewport3D() {
  const [data, setData] = useState({ telemetry: {}, path: [], hazards: [], planet: 'mars', rover: 'curiosity' });
  const [spaceCatalog, setSpaceCatalog] = useState(null);
  const [latency, setLatency] = useState(0);
  const [muted, setMuted] = useState(true);
  const [showDepthCam, setShowDepthCam] = useState(true);
  const audioRef = useRef(null);

  useEffect(() => {
    fetch('http://localhost:8000/api/space-catalog')
      .then(res => res.json())
      .then(d => setSpaceCatalog(d));

    const ws = new WebSocket('ws://localhost:8000/ws/telemetry');
    ws.onmessage = (e) => setData(JSON.parse(e.data));
    return () => ws.close();
  }, []);

  const toggleAudio = () => {
    if (audioRef.current) {
      if (muted) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
      setMuted(!muted);
    }
  };

  const currentRoverData = spaceCatalog?.rovers?.[data.rover];

  return (
    <div style={{ position: 'relative', width: '100%', height: '100vh', overflow: 'hidden' }}>
      <video
        autoPlay
        loop
        muted={muted}
        style={{ position: 'absolute', width: '100%', height: '100%', objectFit: 'cover', zIndex: 0 }}
      >
        <source src="https://assets.mixkit.co/videos/preview/mixkit-stars-in-space-background-27418-large.mp4" type="video/mp4" />
      </video>

      <audio ref={audioRef} loop src="https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=space-ambient-111979.mp3" />

      <div style={{ position: 'absolute', top: 16, left: 16, zIndex: 10, display: 'flex', gap: '12px' }}>
        <TelemetryHUD telemetry={data.telemetry} />
        <DecisionEngine status={data.telemetry.status || 'INITIALIZING'} latency={latency} />
      </div>

      <div style={{ position: 'absolute', top: 16, right: 16, zIndex: 10, display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'flex-end' }}>
        <button onClick={toggleAudio} style={{ padding: '8px 16px', background: '#00e676', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
          {muted ? '🔊 Enable Space Audio' : '🔇 Mute Audio'}
        </button>
        <button onClick={() => setShowDepthCam(!showDepthCam)} style={{ padding: '6px 12px', background: '#ff5252', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          {showDepthCam ? 'Hide Depth Cam' : 'Show Depth Cam'}
        </button>
        <div style={{ background: 'rgba(0,0,0,0.7)', padding: '8px', borderRadius: '4px', color: '#fff' }}>
          <label>Simulated Signal Latency: {latency}s </label>
          <input type="range" min="0" max="1200" value={latency} onChange={(e) => setLatency(e.target.value)} />
        </div>
      </div>

      <DepthCamOverlay active={showDepthCam} />

      <div style={{ position: 'absolute', bottom: 16, right: 16, zIndex: 10 }}>
        <RoverSpecDrawer roverData={currentRoverData} />
      </div>

      <Canvas camera={{ position: [0, 12, 18], fov: 45 }} style={{ position: 'absolute', top: 0, left: 0, zIndex: 1 }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 20, 10]} intensity={1.5} />
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
          <planeGeometry args={[30, 30, 64, 64]} />
          <meshStandardMaterial color={data.planet === 'mars' ? '#8c3a2b' : '#444444'} roughness={0.8} />
        </mesh>

        <mesh position={[(data.telemetry.x || 0) - 10, 0.5, (data.telemetry.z || 0) - 10]}>
          <boxGeometry args={[1.2, 0.6, 1.5]} />
          <meshStandardMaterial color="#d4af37" metalness={0.8} roughness={0.2} />
        </mesh>

        <TrajectorySpline path={data.path} />
        <MeteorMesh hazards={data.hazards} />
        <OrbitControls enableZoom enableRotate enablePan />
      </Canvas>
    </div>
  );
}