import { useAppStore } from '../app/store';

export function Hud() {
  const { speed, altitude, showHud, locked, mapMode, autopilot } = useAppStore((s) => ({
    speed: s.speed,
    altitude: s.altitude,
    showHud: s.showHud,
    locked: s.locked,
    mapMode: s.mapMode,
    autopilot: s.autopilot,
  }));

  if (!showHud) return null;

  return (
    <div className="hud">
      <div className="hud-row">
        <strong>{locked ? 'FLIGHT LOCKED' : 'FREE CURSOR'}</strong>
        <span>Speed: {speed.toFixed(1)} m/s</span>
        <span>Altitude: {altitude.toFixed(1)} m</span>
      </div>
      <div className="hud-row hud-help">
        <span>WASD — движение</span>
        <span>Space / Shift — вверх / вниз</span>
        <span>Mouse — обзор</span>
        <span>Alt — ускорение</span>
        <span>Wheel — скорость</span>
        <span>R — сброс</span>
        <span>T — автооблёт [{autopilot ? 'ON' : 'OFF'}]</span>
        <span>M — map [{mapMode ? 'ON' : 'OFF'}]</span>
        <span>H — hide HUD</span>
      </div>
    </div>
  );
}
