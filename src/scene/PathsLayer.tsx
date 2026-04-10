import { theme } from '../config/theme';

function PathSegment({ position, rotation, length }: { position: [number, number, number]; rotation: number; length: number }) {
  return (
    <mesh position={position} rotation={[-Math.PI / 2, 0, rotation]} receiveShadow>
      <planeGeometry args={[4.6, length]} />
      <meshStandardMaterial color={theme.path} roughness={1} />
    </mesh>
  );
}

export function PathsLayer() {
  return (
    <group>
      <PathSegment position={[-46, 1.05, 64]} rotation={0.2} length={44} />
      <PathSegment position={[-30, 1.06, 26]} rotation={0.72} length={52} />
      <PathSegment position={[-4, 1.04, -18]} rotation={0.1} length={64} />
      <PathSegment position={[14, 1.05, -62]} rotation={0.45} length={56} />
      <PathSegment position={[32, 1.03, -18]} rotation={0.02} length={150} />
      <PathSegment position={[-20, 1.05, -104]} rotation={-0.3} length={44} />
    </group>
  );
}
