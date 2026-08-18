import React, { useState, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { 
  Cpu, BatteryCharging, Zap, Shield, Radio, CheckCircle, Play, Sliders 
} from 'lucide-react';

// --- 3D Geometric Rover Model Component (Renamed to valid identifier) ---
const RoverCanvas3D = ({ color, shape }) => {
  const meshRef = useRef();

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.5;
    }
  });

  return (
    <Canvas camera={{ position: [0, 2, 4], fov: 50 }}>
      <ambientLight intensity={0.7} />
      <pointLight position={[10, 10, 10]} intensity={1.2} />
      <directionalLight position={[-5, 5, 5]} intensity={0.8} />
      
      <mesh ref={meshRef}>
        {shape === 'box' && <boxGeometry args={[1.5, 0.8, 2]} />}
        {shape === 'octa' && <octahedronGeometry args={[1.2]} />}
        {shape === 'cylinder' && <cylinderGeometry args={[1, 1, 1.5, 8]} />}
        <meshStandardMaterial color={color} wireframe roughness={0.3} metalness={0.8} />
      </mesh>

      <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={2} />
    </Canvas>
  );
};

// --- Data for Rovers ---
const roversData = [
  {
    id: 'astra-1',
    name: 'Astra-1 (Lunar Explorer)',
    status: 'STANDBY',
    statusColor: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/50',
    color3D: '#38bdf8',
    shape3D: 'box',
    specs: {
      drive: '6x6 Rocker-Bogie Mechanism',
      power: 'Solar Array + Lithium Backup',
      battery: 92,
      payload: '35 kg (Spectrometer, Regolith Drill)',
      speed: '0.4 m/s',
      range: '12 km Radius'
    }
  },
  {
    id: 'astra-2',
    name: 'Astra-2 (Martian Scout)',
    status: 'ON MISSION',
    statusColor: 'bg-amber-500/20 text-amber-400 border-amber-500/50',
    color3D: '#f97316',
    shape3D: 'octa',
    specs: {
      drive: '8x8 Independent Suspension',
      power: 'RTG (Radioisotope Thermoelectric)',
      battery: 88,
      payload: '45 kg (Robotic Arm, HD Cameras)',
      speed: '0.6 m/s',
      range: '25 km Radius'
    }
  },
  {
    id: 'astra-3',
    name: 'Astra-3 (Autonomous Heavy)',
    status: 'OFFLINE',
    statusColor: 'bg-rose-500/20 text-rose-400 border-rose-500/50',
    color3D: '#a855f7',
    shape3D: 'cylinder',
    specs: {
      drive: 'Heavy-Duty Crawler Tracks',
      power: 'Dual RTG + Solar Hybrid',
      battery: 45,
      payload: '80 kg (Excavation & Sample Return)',
      speed: '0.3 m/s',
      range: '10 km Radius'
    }
  }
];

export default function RoverSelection() {
  const [selectedRover, setSelectedRover] = useState(roversData[0]);
  const [autonomy, setAutonomy] = useState('Full Autonomous (AI)');
  const [objective, setObjective] = useState('Terrain Mapping');
  const [diagnostics, setDiagnostics] = useState(null);
  const [isDeploying, setIsDeploying] = useState(false);

  const runDiagnosticTest = () => {
    setDiagnostics('running');
    setTimeout(() => {
      setDiagnostics({
        motor: 'OK',
        lidar: 'OK',
        power: 'OK',
        comms: 'OPTIMAL'
      });
    }, 1500);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto text-cyan-100 font-sans">
      
      {/* SECTION 1: ROVER CARDS (WITH 3D VIEW & STATUS) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {roversData.map((rover) => {
          const isSelected = selectedRover.id === rover.id;
          return (
            <div
              key={rover.id}
              onClick={() => setSelectedRover(rover)}
              className={`cursor-pointer border rounded-2xl p-4 transition-all duration-300 relative overflow-hidden bg-slate-900/80 backdrop-blur-md ${
                isSelected 
                  ? 'border-cyan-400 shadow-[0_0_25px_rgba(34,211,238,0.3)] scale-[1.02]' 
                  : 'border-slate-800 hover:border-slate-700 hover:bg-slate-900/50'
              }`}
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-bold text-lg text-white">{rover.name}</h3>
                <span className={`text-xs px-2.5 py-1 rounded-full border ${rover.statusColor}`}>
                  {rover.status}
                </span>
              </div>

              {/* 3D Canvas Visualizer */}
              <div className="h-44 w-full rounded-xl bg-slate-950/60 border border-slate-800/80 my-2">
                <RoverCanvas3D color={rover.color3D} shape={rover.shape3D} />
              </div>

              <p className="text-xs text-slate-400 text-center">Interactive 3D Preview (Drag to Rotate)</p>
            </div>
          );
        })}
      </div>

      {/* SECTION 2 & 3: SPECS BREAKDOWN + CONTROL MODES */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        
        {/* Hardware Specs Breakdown (2 Columns Wide) */}
        <div className="lg:col-span-2 border border-slate-800 rounded-2xl p-6 bg-slate-900/80 backdrop-blur-md">
          <div className="flex items-center gap-2 mb-4 text-cyan-400">
            <Cpu className="w-5 h-5" />
            <h2 className="text-xl font-bold tracking-wide">Hardware Specifications — {selectedRover.name}</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-slate-950/50 p-4 rounded-xl border border-slate-800/60">
              <span className="text-xs text-slate-400 uppercase tracking-wider">Drive System</span>
              <p className="font-medium text-white mt-1">{selectedRover.specs.drive}</p>
            </div>

            <div className="bg-slate-950/50 p-4 rounded-xl border border-slate-800/60">
              <div className="flex justify-between items-center">
                <span className="text-xs text-slate-400 uppercase tracking-wider">Power Source</span>
                <span className="text-xs text-cyan-400 flex items-center gap-1">
                  <BatteryCharging className="w-3.5 h-3.5" /> {selectedRover.specs.battery}%
                </span>
              </div>
              <p className="font-medium text-white mt-1">{selectedRover.specs.power}</p>
            </div>

            <div className="bg-slate-950/50 p-4 rounded-xl border border-slate-800/60">
              <span className="text-xs text-slate-400 uppercase tracking-wider">Payload Capacity</span>
              <p className="font-medium text-white mt-1">{selectedRover.specs.payload}</p>
            </div>

            <div className="bg-slate-950/50 p-4 rounded-xl border border-slate-800/60">
              <span className="text-xs text-slate-400 uppercase tracking-wider">Max Speed & Range</span>
              <p className="font-medium text-white mt-1">{selectedRover.specs.speed} | {selectedRover.specs.range}</p>
            </div>
          </div>
        </div>

        {/* Operational Control Mode Toggle */}
        <div className="border border-slate-800 rounded-2xl p-6 bg-slate-900/80 backdrop-blur-md flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-4 text-cyan-400">
              <Sliders className="w-5 h-5" />
              <h2 className="text-xl font-bold tracking-wide">Control Configuration</h2>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-xs text-slate-400 uppercase tracking-wider block mb-2">Autonomy Level</label>
                <select 
                  value={autonomy}
                  onChange={(e) => setAutonomy(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-cyan-400"
                >
                  <option>Full Autonomous (AI)</option>
                  <option>Semi-Auto Assisted</option>
                  <option>Manual Teleoperation</option>
                </select>
              </div>

              <div>
                <label className="text-xs text-slate-400 uppercase tracking-wider block mb-2">Mission Objective</label>
                <select 
                  value={objective}
                  onChange={(e) => setObjective(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-cyan-400"
                >
                  <option>Terrain Mapping & LIDAR</option>
                  <option>Soil & Regolith Sampling</option>
                  <option>Obstacle Detection & Pathing</option>
                  <option>Atmospheric Analysis</option>
                </select>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* SECTION 4: QUICK ACTION BUTTONS & DIAGNOSTICS */}
      <div className="border border-slate-800 rounded-2xl p-6 bg-slate-900/80 backdrop-blur-md flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Diagnostic Status Box */}
        <div className="w-full md:w-auto flex-1">
          {diagnostics === 'running' && (
            <div className="text-amber-400 text-sm animate-pulse flex items-center gap-2">
              <Zap className="w-4 h-4 animate-spin" /> Running Subsystem Diagnostics...
            </div>
          )}

          {typeof diagnostics === 'object' && diagnostics !== null && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="bg-slate-950/80 p-2 rounded-lg text-xs border border-emerald-500/30 text-emerald-400 flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5" /> Motor: {diagnostics.motor}
              </div>
              <div className="bg-slate-950/80 p-2 rounded-lg text-xs border border-emerald-500/30 text-emerald-400 flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5" /> LIDAR: {diagnostics.lidar}
              </div>
              <div className="bg-slate-950/80 p-2 rounded-lg text-xs border border-emerald-500/30 text-emerald-400 flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5" /> Power: {diagnostics.power}
              </div>
              <div className="bg-slate-950/80 p-2 rounded-lg text-xs border border-emerald-500/30 text-emerald-400 flex items-center gap-1.5">
                <Radio className="w-3.5 h-3.5" /> Link: {diagnostics.comms}
              </div>
            </div>
          )}

          {!diagnostics && (
            <p className="text-xs text-slate-400">Run diagnostic check before deploying telemetry link.</p>
          )}
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-4 w-full md:w-auto">
          <button
            onClick={runDiagnosticTest}
            className="flex-1 md:flex-none px-4 py-3 rounded-xl border border-cyan-500/50 bg-cyan-950/30 text-cyan-300 hover:bg-cyan-900/40 transition-all text-sm font-semibold flex items-center justify-center gap-2"
          >
            <Shield className="w-4 h-4" /> Run Diagnostic
          </button>

          <button
            onClick={() => setIsDeploying(true)}
            className="flex-1 md:flex-none px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm transition-all shadow-[0_0_20px_rgba(6,182,212,0.6)] hover:shadow-[0_0_30px_rgba(6,182,212,0.9)] flex items-center justify-center gap-2"
          >
            <Play className="w-4 h-4 fill-current" /> Deploy Telemetry
          </button>
        </div>

      </div>

    </div>
  );
}