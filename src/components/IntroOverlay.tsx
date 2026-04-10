import { useAppStore } from '../app/store';

interface IntroOverlayProps {
  onStart: () => void;
}

export function IntroOverlay({ onStart }: IntroOverlayProps) {
  const introOpen = useAppStore((s) => s.introOpen);

  if (!introOpen) return null;

  return (
    <div className="intro-overlay" onClick={onStart}>
      <div className="intro-card" onClick={(e) => e.stopPropagation()}>
        <p className="intro-kicker">Ecopark Concept • 3D Flight Demo</p>
        <h1>Нажмите для входа в режим полёта</h1>
        <p>
          Концептуальный облёт территории. После старта мышь захватится, и вы сможете
          перемещаться как на квадрокоптере.
        </p>
        <button onClick={onStart}>Начать просмотр</button>
      </div>
    </div>
  );
}
