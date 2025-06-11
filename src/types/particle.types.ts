
// Generated unique ID for particles
export type ParticleId = string;

export const PARTICLE_COLORS = [
  "#50E3C2", // Teal
  "#FFD864", // Gold
  "#FF6B6B", // Red
  "#5E60CE", // Purple
  "#4CC9F0", // Blue
  "#F72585", // Pink
  "#7209B7", // Deep Purple
  "#4361EE", // Royal Blue
  "#4CC9F0"  // Light Blue
];

export interface Particle {
  id?: ParticleId;
  x: number;
  y: number;
  size: number;
  color: string;
  speedX: number;
  speedY: number;
  opacity: number;
  rotation: number;
  rotationSpeed: number;
  pulse: number;
  pulseSpeed: number;
  trail?: {x: number, y: number}[];
  trailLength: number;
  isSmall?: boolean;
  isCoin?: boolean;
  isDollar?: boolean;
  isWhale?: boolean;
  isSpider?: boolean;
  temporary?: boolean;
  lifespan?: number;
  eaten?: boolean;
  eatenBy?: ParticleId;
  followCursor?: boolean;
  lastDirectionChange?: number;
  createdAt?: number;
  clicked?: boolean;
  isWithinBounds?: boolean;
  direction?: number; // Direction whale is facing in radians
  targetX?: number; // Target position for smooth movement
  targetY?: number;
  huntingCoin?: ParticleId; // ID of coin being hunted
}

export interface ParticleEvent {
  x: number;
  y: number;
  count: number;
  colors?: string[];
  radius?: number;
  type?: 'default' | 'coin' | 'whale' | 'spider';
}
