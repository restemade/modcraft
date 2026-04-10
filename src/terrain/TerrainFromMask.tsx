import { useMemo } from 'react';
import { BufferAttribute, PlaneGeometry } from 'three';
import { getTerrainHeight } from '../utils/terrain';
import { theme } from '../config/theme';

export function TerrainFromMask() {
  const geometry = useMemo(() => {
    const g = new PlaneGeometry(620, 620, 180, 180);
    g.rotateX(-Math.PI / 2);

    const pos = g.getAttribute('position') as BufferAttribute;
    for (let i = 0; i < pos.count; i += 1) {
      const x = pos.getX(i);
      const z = pos.getZ(i);
      pos.setY(i, getTerrainHeight(x, z));
    }
    pos.needsUpdate = true;
    g.computeVertexNormals();
    return g;
  }, []);

  return (
    <mesh geometry={geometry} receiveShadow>
      <meshStandardMaterial color={theme.sand} roughness={0.95} metalness={0.02} />
    </mesh>
  );
}
