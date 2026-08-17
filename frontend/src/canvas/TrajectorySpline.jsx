import React from 'react';
import { Line } from '@react-three/drei';

export default function TrajectorySpline({ path }) {
  if (!path || path.length < 2) return null;

  const points = path.map(p => [(p[0] || 0) - 10, 0.2, (p[1] || 0) - 10]);

  return (
    <Line
      points={points}
      color="#00e676"
      lineWidth={3}
      dashed={false}
    />
  );
}