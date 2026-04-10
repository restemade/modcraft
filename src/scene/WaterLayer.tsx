import { theme } from '../config/theme';

export function WaterLayer() {
  return (
    <group>
      <mesh position={[58, 0.4, -8]} rotation={[-Math.PI / 2, 0.03, 0]} receiveShadow>
        <planeGeometry args={[34, 168, 8, 8]} />
        <meshStandardMaterial color={theme.water} transparent opacity={0.82} roughness={0.2} metalness={0.05} />
      </mesh>
      <mesh position={[44, 0.55, -94]} rotation={[-Math.PI / 2, 0.18, 0]}>
        <circleGeometry args={[16, 42]} />
        <meshStandardMaterial color="#86c1cb" transparent opacity={0.74} roughness={0.15} />
      </mesh>
    </group>
  );
}
