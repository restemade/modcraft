import type { Vector3Tuple } from 'three';

export type ZoneType = 'entrance' | 'public' | 'quiet' | 'sport' | 'nature' | 'water';

export interface Zone {
  id: string;
  name: string;
  type: ZoneType;
  center: Vector3Tuple;
  size: Vector3Tuple;
  color: string;
  description: string;
}

export interface Landmark {
  id: string;
  name: string;
  position: Vector3Tuple;
}
