import { create } from 'zustand';

interface CameraState {
  position: [number, number, number];
  speed: number;
  altitude: number;
  locked: boolean;
  introOpen: boolean;
  showHud: boolean;
  mapMode: boolean;
  autopilot: boolean;
  setLocked: (locked: boolean) => void;
  setIntroOpen: (value: boolean) => void;
  setShowHud: (value: boolean) => void;
  toggleHud: () => void;
  toggleMapMode: () => void;
  toggleAutopilot: () => void;
  updateTelemetry: (position: [number, number, number], speed: number) => void;
}

export const useAppStore = create<CameraState>((set) => ({
  position: [-98, 14, 156],
  speed: 0,
  altitude: 14,
  locked: false,
  introOpen: true,
  showHud: true,
  mapMode: false,
  autopilot: false,
  setLocked: (locked) => set({ locked }),
  setIntroOpen: (introOpen) => set({ introOpen }),
  setShowHud: (showHud) => set({ showHud }),
  toggleHud: () => set((s) => ({ showHud: !s.showHud })),
  toggleMapMode: () => set((s) => ({ mapMode: !s.mapMode })),
  toggleAutopilot: () => set((s) => ({ autopilot: !s.autopilot })),
  updateTelemetry: (position, speed) => set({ position, speed, altitude: position[1] }),
}));
