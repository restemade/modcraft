import { Html, useProgress } from '@react-three/drei';

export function LoadingOverlay() {
  const { progress, active } = useProgress();
  if (!active) return null;

  return (
    <Html center>
      <div className="loading">Загрузка сцены… {progress.toFixed(0)}%</div>
    </Html>
  );
}
