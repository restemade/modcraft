import { SceneCanvas } from '../scene/SceneCanvas';
import { IntroOverlay } from '../components/IntroOverlay';
import { Hud } from '../components/Hud';
import { Minimap } from '../components/Minimap';
import { useAppStore } from './store';

export function AppShell() {
  const setIntroOpen = useAppStore((s) => s.setIntroOpen);

  const startExperience = () => {
    setIntroOpen(false);
    requestAnimationFrame(() => {
      const canvas = document.querySelector('canvas');
      canvas?.requestPointerLock();
    });
  };

  return (
    <div className="app-root">
      <SceneCanvas />
      <IntroOverlay onStart={startExperience} />
      <Hud />
      <Minimap />
      <button className="unlock-btn" onClick={() => document.exitPointerLock()}>
        Выйти из захвата мыши (Esc)
      </button>
    </div>
  );
}
