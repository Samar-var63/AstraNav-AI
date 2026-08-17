import React from 'react';

export default function MeteorMesh({ hazards }) {
  if (!hazards || hazards.length === 0) return null;

  return (
    <>
      {hazards.map((h, i) => (
        <mesh key={i} position={[(h.x || 0) - 10, 0.2, (h.z || 0) - 10]}>
          <cylinderGeometry args={[h.radius || 1, h.radius || 1, 0.2, 16]} />
          <meshStandardMaterial
            color={h.severity === 'HIGH_RISK' ? '#ff5252' : '#ffb74d'}
            transparent
            opacity={0.6}
          />
        </mesh>
      ))}
    </>
  );
}