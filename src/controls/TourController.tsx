import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Vector3 } from 'three';
import { useAppStore } from '../app/store';
import { tourPoints } from '../data/layout';

const tmp = new Vector3();
const target = new Vector3();

export function TourController() {
  const { camera } = useThree();
  const autopilot = useAppStore((s) => s.autopilot);
  const indexRef = useRef(0);

  useFrame((_, delta) => {
    if (!autopilot) return;

    const t = tourPoints[indexRef.current];
    target.set(t[0], t[1], t[2]);
    camera.position.lerp(target, Math.min(1, delta * 0.38));

    const nextIdx = (indexRef.current + 1) % tourPoints.length;
    const n = tourPoints[nextIdx];
    tmp.set(n[0], n[1], n[2]);
    camera.lookAt(tmp);

    if (camera.position.distanceTo(target) < 2.4) {
      indexRef.current = nextIdx;
    }
  });

  return null;
}
