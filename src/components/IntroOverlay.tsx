import { useAppStore } from '../app/store';

export function IntroOverlay() {
  const introOpen = useAppStore((s) => s.introOpen);
  const setIntroOpen = useAppStore((s) => s.setIntroOpen);

  if (!introOpen) return null;

  return (
    <div className="intro-overlay">
      <div className="intro-card">
        <p className="intro-kicker">Ecopark Concept • 3D Flight Demo</p>
        <h1>Нажмите для входа в режим полёта</h1>
        <p>
          Концептуальный облёт территории. После старта мышь захватится, и вы сможете
          перемещаться как на квадрокоптере.
        </p>
        <button onClick={() => setIntroOpen(false)}>Начать просмотр</button>
      </div>
    </div>
  );
}
