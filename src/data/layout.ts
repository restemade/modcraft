import type { Landmark, Zone } from '../types/scene';

export const sitePolygon2D: [number, number][] = [
  [-76, 118],
  [68, 98],
  [22, 12],
  [22, -148],
  [-64, -148],
  [-76, 118],
];

export const zones: Zone[] = [
  {
    id: 'entry-plaza',
    name: 'Входная площадь',
    type: 'entrance',
    center: [-52, 1.2, 74],
    size: [36, 1, 34],
    color: '#d7c29e',
    description: 'Главный вход с навигацией и точкой сбора.',
  },
  {
    id: 'community-lawn',
    name: 'Общественная лужайка',
    type: 'public',
    center: [-18, 1.1, 30],
    size: [56, 1, 42],
    color: '#9fbe82',
    description: 'Открытая событийная зона.',
  },
  {
    id: 'family-zone',
    name: 'Семейная зона',
    type: 'public',
    center: [-35, 1.1, -26],
    size: [42, 1, 36],
    color: '#b8c98f',
    description: 'Детские и семейные активности.',
  },
  {
    id: 'sport-zone',
    name: 'Спортивная зона',
    type: 'sport',
    center: [2, 1.1, -56],
    size: [38, 1, 42],
    color: '#88a772',
    description: 'Тренировочные и воркаут-площадки.',
  },
  {
    id: 'wetland-edge',
    name: 'Эко-набережная',
    type: 'nature',
    center: [36, 1.2, -10],
    size: [30, 1, 122],
    color: '#94b9a4',
    description: 'Прогулочный маршрут вдоль воды.',
  },
  {
    id: 'quiet-garden',
    name: 'Тихий сад',
    type: 'quiet',
    center: [-10, 1.1, -112],
    size: [54, 1, 36],
    color: '#8ba878',
    description: 'Созерцательные и теневые пространства.',
  },
];

export const landmarks: Landmark[] = [
  { id: 'l1', name: 'Визит-центр', position: [-46, 3, 68] },
  { id: 'l2', name: 'Центральный павильон', position: [-10, 3, 20] },
  { id: 'l3', name: 'Смотровой настил', position: [36, 3, -62] },
  { id: 'l4', name: 'Тихий сад', position: [-8, 3, -110] },
];

export const tourPoints: [number, number, number][] = [
  [-92, 32, 118],
  [-52, 16, 72],
  [-12, 18, 28],
  [32, 14, -30],
  [-8, 16, -106],
  [-96, 48, -170],
];
