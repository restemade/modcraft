import { useEffect } from 'react';
import { SceneCanvas } from '../scene/SceneCanvas';
import { IntroOverlay } from '../components/IntroOverlay';
import { Hud } from '../components/Hud';
import { Minimap } from '../components/Minimap';
import { useAppStore } from './store';

export function AppShell() {
  const introOpen = useAppStore((s) => s.introOpen);
  const setIntroOpen = useAppStore((s) => s.setIntroOpen);

  useEffect(() => {
    const clickToStart = () => {
      if (introOpen) setIntroOpen(false);
    };
    window.addEventListener('dblclick', clickToStart);
    return () => window.removeEventListener('dblclick', clickToStart);
  }, [introOpen, setIntroOpen]);

  return (
    <div className="app-root">
      <SceneCanvas />
      <IntroOverlay />
      <Hud />
      <Minimap />
      <button className="unlock-btn" onClick={() => document.exitPointerLock()}>
        Выйти из захвата мыши (Esc)
      </button>
    </div>
  );
}
