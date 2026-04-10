import { useEffect, useMemo, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Euler, Vector3 } from 'three';
import { Leva, useControls } from 'leva';
import { flightDefaults } from '../config/flight';
import { useKeyboard } from '../hooks/useKeyboard';
import { useAppStore } from '../app/store';
import { getTerrainHeight } from '../utils/terrain';

const velocity = new Vector3();
const desired = new Vector3();
const forward = new Vector3();
const side = new Vector3();

export function DroneController() {
  const { camera, gl, scene } = useThree();
  const keys = useKeyboard();
  const yaw = useRef(-0.42);
  const pitch = useRef(-0.18);

  const { locked, autopilot } = useAppStore((s) => ({
    locked: s.locked,
    autopilot: s.autopilot,
  }));
  const setLocked = useAppStore((s) => s.setLocked);
  const updateTelemetry = useAppStore((s) => s.updateTelemetry);
  const toggleHud = useAppStore((s) => s.toggleHud);
  const toggleMapMode = useAppStore((s) => s.toggleMapMode);
  const toggleAutopilot = useAppStore((s) => s.toggleAutopilot);

  const baseSpeedRef = useRef(flightDefaults.baseSpeed);

  const debug = useControls('Flight', {
    speed: { value: flightDefaults.baseSpeed, min: 6, max: 60, step: 1 },
    mouseSensitivity: { value: flightDefaults.mouseSensitivity, min: 0.0008, max: 0.005, step: 0.0001 },
    fogNear: { value: 70, min: 20, max: 200, step: 1 },
    fogFar: { value: 560, min: 180, max: 1000, step: 5 },
    sunHeight: { value: 88, min: 15, max: 200, step: 1 },
  });

  useEffect(() => {
    baseSpeedRef.current = debug.speed;
  }, [debug.speed]);

  useEffect(() => {
    if (scene.fog && 'near' in scene.fog) {
      (scene.fog as { near: number; far: number }).near = debug.fogNear;
      (scene.fog as { near: number; far: number }).far = debug.fogFar;
    }
    const sun = scene.getObjectByName('sunLight');
    if (sun) sun.position.y = debug.sunHeight;
  }, [debug.fogFar, debug.fogNear, debug.sunHeight, scene]);

  useEffect(() => {
    const canvas = gl.domElement;

    const lockChange = () => setLocked(document.pointerLockElement === canvas);
    const onMouse = (event: MouseEvent) => {
      if (document.pointerLockElement !== canvas || autopilot) return;
      yaw.current -= event.movementX * debug.mouseSensitivity;
      pitch.current -= event.movementY * debug.mouseSensitivity;
      pitch.current = Math.max(-1.45, Math.min(1.45, pitch.current));
    };

    const onWheel = (e: WheelEvent) => {
      baseSpeedRef.current = Math.max(4, Math.min(70, baseSpeedRef.current - e.deltaY * 0.01));
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'KeyH') toggleHud();
      if (e.code === 'KeyM') toggleMapMode();
      if (e.code === 'KeyT') toggleAutopilot();
      if (e.code === 'KeyR') {
        camera.position.set(-98, 14, 156);
        yaw.current = -0.4;
        pitch.current = -0.14;
        velocity.setScalar(0);
      }
      if (e.code === 'Escape') document.exitPointerLock();
    };

    document.addEventListener('pointerlockchange', lockChange);
    window.addEventListener('mousemove', onMouse);
    window.addEventListener('wheel', onWheel, { passive: true });
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.removeEventListener('pointerlockchange', lockChange);
      window.removeEventListener('mousemove', onMouse);
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [autopilot, camera, debug.mouseSensitivity, gl.domElement, setLocked, toggleAutopilot, toggleHud, toggleMapMode]);

  useEffect(() => {
    camera.position.set(-98, 14, 156);
    camera.lookAt(-35, 4, 42);
  }, [camera]);

  const euler = useMemo(() => new Euler(0, 0, 0, 'YXZ'), []);

  useFrame((_, delta) => {
    camera.rotation.set(pitch.current, yaw.current, 0, 'YXZ');

    if (!locked || autopilot) {
      updateTelemetry([camera.position.x, camera.position.y, camera.position.z], velocity.length());
      return;
    }

    desired.set(0, 0, 0);
    if (keys.current.has('KeyW')) desired.z -= 1;
    if (keys.current.has('KeyS')) desired.z += 1;
    if (keys.current.has('KeyA')) desired.x -= 1;
    if (keys.current.has('KeyD')) desired.x += 1;
    if (keys.current.has('Space')) desired.y += 1;
    if (keys.current.has('ShiftLeft') || keys.current.has('ControlLeft')) desired.y -= 1;

    const sprint = keys.current.has('AltLeft') ? flightDefaults.sprintMultiplier : 1;
    const speed = baseSpeedRef.current * sprint;

    if (desired.lengthSq() > 0) {
      desired.normalize();
      euler.set(0, yaw.current, 0);
      forward.set(0, 0, 1).applyEuler(euler);
      side.set(1, 0, 0).applyEuler(euler);
      const worldMove = side.multiplyScalar(desired.x).add(forward.multiplyScalar(desired.z));
      worldMove.y = desired.y;
      worldMove.normalize();
      velocity.addScaledVector(worldMove, delta * flightDefaults.acceleration * speed * 0.15);
    }

    velocity.multiplyScalar(Math.max(0, 1 - delta * flightDefaults.damping));

    camera.position.addScaledVector(velocity, delta * 4.4);

    const ground = getTerrainHeight(camera.position.x, camera.position.z);
    camera.position.y = Math.max(ground + flightDefaults.minHeight, Math.min(flightDefaults.maxHeight, camera.position.y));

    const radius = Math.hypot(camera.position.x, camera.position.z);
    if (radius > flightDefaults.maxRadius) {
      const k = flightDefaults.maxRadius / radius;
      camera.position.x *= k;
      camera.position.z *= k;
      velocity.multiplyScalar(0.6);
    }

    updateTelemetry([camera.position.x, camera.position.y, camera.position.z], velocity.length() * 3);
  });

  return <Leva collapsed titleBar={{ title: 'Debug Panel' }} />;
}
