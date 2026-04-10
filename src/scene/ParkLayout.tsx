import { Line, RoundedBox } from '@react-three/drei';
import { Vector3 } from 'three';
import { sitePolygon2D, zones } from '../data/layout';
import { theme } from '../config/theme';
import { PathsLayer } from './PathsLayer';
import { WaterLayer } from './WaterLayer';
import { VegetationLayer } from './VegetationLayer';

export function ParkLayout() {
  return (
    <group>
      <Line
        points={sitePolygon2D.map(([x, z]) => new Vector3(x, 1.2, z))}
        color={theme.boundary}
        lineWidth={3}
      />

      {zones.map((zone) => (
        <mesh key={zone.id} position={zone.center} receiveShadow>
          <boxGeometry args={zone.size} />
          <meshStandardMaterial color={zone.color} transparent opacity={0.72} roughness={0.88} />
        </mesh>
      ))}

      <RoundedBox args={[12, 5, 8]} radius={0.7} smoothness={4} position={[-46, 3.2, 68]} castShadow>
        <meshStandardMaterial color={theme.architecture} roughness={0.7} />
      </RoundedBox>
      <RoundedBox args={[15, 4.4, 10]} radius={0.65} smoothness={4} position={[-8, 2.9, 20]} castShadow>
        <meshStandardMaterial color="#efe8de" roughness={0.65} />
      </RoundedBox>
      <RoundedBox args={[8, 3.2, 8]} radius={0.55} smoothness={4} position={[30, 2.5, -62]} castShadow>
        <meshStandardMaterial color="#ddd6ca" roughness={0.6} />
      </RoundedBox>

      <PathsLayer />
      <WaterLayer />
      <VegetationLayer />
    </group>
  );
}
