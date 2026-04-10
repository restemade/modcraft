import { sitePolygon2D } from '../data/layout';
import { useAppStore } from '../app/store';

export function Minimap() {
  const { showHud, mapMode, position } = useAppStore((s) => ({
    showHud: s.showHud,
    mapMode: s.mapMode,
    position: s.position,
  }));

  if (!showHud) return null;

  const points = sitePolygon2D
    .map(([x, z]) => `${x + 90},${130 - (z + 160) * 0.5}`)
    .join(' ');

  const px = position[0] + 90;
  const py = 130 - (position[2] + 160) * 0.5;

  return (
    <div className={`minimap ${mapMode ? 'expanded' : ''}`}>
      <svg viewBox="0 0 180 140">
        <rect width="180" height="140" fill="#15211c" opacity="0.76" />
        <polyline points={points} fill="rgba(142, 194, 133, 0.28)" stroke="#9bcf8c" strokeWidth="2" />
        <circle cx={px} cy={py} r="4" fill="#ffd46b" />
      </svg>
    </div>
  );
}
