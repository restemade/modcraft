import { useMemo } from 'react';
import { theme } from '../config/theme';
import { getTerrainHeight } from '../utils/terrain';

export function VegetationLayer() {
  const trees = useMemo(() => {
    const result: [number, number, number, number][] = [];
    for (let i = 0; i < 230; i += 1) {
      const x = -90 + Math.random() * 190;
      const z = -150 + Math.random() * 270;
      const skipPath = x > 24 && z > -90 && z < 72;
      if (skipPath) continue;
      const h = getTerrainHeight(x, z);
      const s = 0.7 + Math.random() * 1.6;
      result.push([x, h + 1.2, z, s]);
    }
    return result;
  }, []);

  return (
    <group>
      {trees.map(([x, y, z, s], idx) => (
        <group key={`${x.toFixed(1)}-${z.toFixed(1)}-${idx}`} position={[x, y, z]} scale={s}>
          <mesh position={[0, 0.45, 0]} castShadow>
            <cylinderGeometry args={[0.12, 0.18, 0.8, 8]} />
            <meshStandardMaterial color="#735942" roughness={0.9} />
          </mesh>
          <mesh position={[0, 1.45, 0]} castShadow>
            <coneGeometry args={[0.9, 2.1, 8]} />
            <meshStandardMaterial color={theme.shrub} roughness={0.95} />
          </mesh>
        </group>
      ))}
    </group>
  );
}
