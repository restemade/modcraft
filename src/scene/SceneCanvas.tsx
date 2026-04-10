import { Canvas } from '@react-three/fiber';
import { Environment, Sky } from '@react-three/drei';
import { theme } from '../config/theme';
import { TerrainFromMask } from '../terrain/TerrainFromMask';
import { ParkLayout } from './ParkLayout';
import { DroneController } from '../controls/DroneController';
import { LandmarkLabels } from './LandmarkLabels';
import { TourController } from '../controls/TourController';

export function SceneCanvas() {
  return (
    <Canvas shadows camera={{ fov: 62, near: 0.1, far: 1400 }}>
      <color attach="background" args={[theme.sky]} />
      <fog attach="fog" args={[theme.fog, 70, 560]} />

      <ambientLight intensity={0.66} />
      <directionalLight
        name="sunLight"
        castShadow
        intensity={1.2}
        position={[86, 88, 38]}
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      <Sky distance={450000} sunPosition={[40, 70, 40]} inclination={0.42} azimuth={0.31} />
      <Environment preset="park" />

      <TerrainFromMask />
      <ParkLayout />
      <LandmarkLabels />
      <TourController />
      <DroneController />
    </Canvas>
  );
}
