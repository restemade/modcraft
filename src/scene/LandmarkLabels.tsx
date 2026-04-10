import { Html } from '@react-three/drei';
import { landmarks } from '../data/layout';
import { useAppStore } from '../app/store';

export function LandmarkLabels() {
  const cameraPos = useAppStore((s) => s.position);
  return (
    <group>
      {landmarks.map((landmark) => {
        const dx = landmark.position[0] - cameraPos[0];
        const dz = landmark.position[2] - cameraPos[2];
        const dist = Math.sqrt(dx * dx + dz * dz);
        if (dist > 68) return null;
        return (
          <Html key={landmark.id} position={landmark.position} center distanceFactor={14}>
            <div className="landmark">{landmark.name}</div>
          </Html>
        );
      })}
    </group>
  );
}
