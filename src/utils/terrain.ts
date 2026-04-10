export function getTerrainHeight(x: number, z: number): number {
  const base = 0.5 * Math.sin(x * 0.045) + 0.55 * Math.cos(z * 0.042);
  const ridge = Math.exp(-((x - 38) ** 2) / 1400) * 2.7;
  const dip = -Math.exp(-((x + 56) ** 2 + (z + 90) ** 2) / 1600) * 1.4;
  return base + ridge + dip;
}
