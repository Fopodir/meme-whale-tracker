
import { Particle, PARTICLE_COLORS, ParticleEvent } from "../types/particle.types";
import ParticleEventEmitter from "./ParticleEventEmitter";

export const createParticle = (canvasWidth: number, canvasHeight: number, isSmall: boolean = false): Particle => {
  const emitter = ParticleEventEmitter.getInstance();
  const trailLength = isSmall ? Math.floor(Math.random() * 2) + 1 : Math.floor(Math.random() * 3) + 2;
  const isSpider = Math.random() < 0.02; // 2% chance to be a spider
  const isCoin = Math.random() < 0.25; // 25% chance to be a coin
  const isWhale = Math.random() < 0.008; // 0.8% chance to be a whale
  const isDollar = !isSpider && !isWhale && Math.random() < 0.08; // 8% chance to be a dollar sign
  
  const startX = Math.random() * canvasWidth;
  const startY = Math.random() * canvasHeight;
  const initialDirection = Math.random() * Math.PI * 2;
  
  return {
    x: startX,
    y: startY,
    size: isSmall ? Math.random() * 2 + 0.8 : 
          isCoin ? Math.random() * 4 + 4 : // Increased coin size from (3 + 2) to (4 + 4)
          isWhale ? Math.random() * 8 + 12 : // Keep whale size at 12-20
          Math.random() * 3 + 2,
    speedX: (Math.random() - 0.5) * (isSmall ? 0.7 : (isCoin ? 0.3 : (isWhale ? 0.25 : 0.9))), 
    speedY: (Math.random() - 0.5) * (isSmall ? 0.7 : (isCoin ? 0.3 : (isWhale ? 0.25 : 0.9))), 
    opacity: Math.random() * 0.6 + (isSmall ? 0.3 : 0.4),
    color: isCoin ? PARTICLE_COLORS[1] : 
           isWhale ? "#216EB4" :
           PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)],
    pulse: 0,
    pulseSpeed: Math.random() * 0.02 + 0.01,
    rotation: Math.random() * Math.PI * 2,
    rotationSpeed: (Math.random() - 0.5) * (isSmall ? 0.008 : 0.015),
    trail: isSmall ? [] : Array(trailLength).fill({x: 0, y: 0}),
    trailLength: trailLength,
    isSmall: isSmall,
    followCursor: isSmall && Math.random() < 0.3,
    createdAt: Date.now(),
    isDollar: isDollar,
    isSpider: isSpider,
    isCoin: isCoin,
    isWhale: isWhale,
    id: emitter.getNextParticleId().toString(),
    isWithinBounds: true,
    direction: isWhale ? initialDirection : undefined,
    targetX: isWhale ? startX + Math.cos(initialDirection) * 100 : undefined,
    targetY: isWhale ? startY + Math.sin(initialDirection) * 100 : undefined,
  };
};

export const createTemporaryParticle = (
  x: number, 
  y: number, 
  colors: string[] = PARTICLE_COLORS,
  isSmall: boolean = true,
  type: 'default' | 'coin' | 'whale' | 'spider' = 'default'
): Particle => {
  const emitter = ParticleEventEmitter.getInstance();
  const color = colors[Math.floor(Math.random() * colors.length)];
  const angle = Math.random() * Math.PI * 2;
  const speed = Math.random() * 2.0 + 1.0;
  
  const isDollar = type === 'default' && Math.random() < 0.25;
  const isSpider = type === 'spider' || (type === 'default' && Math.random() < 0.15);
  const isCoin = type === 'coin' || (type === 'default' && Math.random() < 0.25);
  const isWhale = type === 'whale' || (type === 'default' && Math.random() < 0.05);
  
  // console.log('Creating temporary particle:', { type, isCoin, isDollar, x, y });
  
  return {
    x,
    y,
    size: isSmall ? Math.random() * 2.0 + 1.8 : 
          isWhale ? Math.random() * 8 + 12 : // Keep whale size at 12-20
          isCoin ? Math.random() * 6 + 6 : // Larger coin size for visibility
          Math.random() * 3 + 1.5,
    speedX: Math.cos(angle) * speed * (isSmall ? 0.6 : 0.9) * (isWhale ? 0.3 : 1), 
    speedY: Math.sin(angle) * speed * (isSmall ? 0.6 : 0.9) * (isWhale ? 0.3 : 1), 
    opacity: Math.random() * 0.8 + 0.6, // Higher opacity for visibility
    color: isDollar ? "#FFD864" : (isCoin ? "#FFD864" : (isWhale ? "#216EB4" : color)),
    pulse: 0,
    pulseSpeed: Math.random() * 0.03 + 0.01,
    rotation: Math.random() * Math.PI * 2,
    rotationSpeed: (Math.random() - 0.5) * 0.05,
    trail: [], // No trails for temporary particles
    trailLength: 0,
    isSmall: true,
    temporary: true,
    lifespan: Math.random() * 2000 + 1500, // Longer lifespan for visibility
    createdAt: Date.now(),
    isDollar: isDollar,
    isSpider: isSpider,
    isCoin: isCoin,
    isWhale: isWhale,
    id: emitter.getNextParticleId().toString(), 
    isWithinBounds: true,
  };
};

export const initializeParticles = (canvasWidth: number, canvasHeight: number): Particle[] => {
  const particles: Particle[] = [];
  
  // Determine particle count based on screen size for better performance
  const screenSize = canvasWidth * canvasHeight;
  const densityFactor = Math.min(0.8, screenSize / (1920 * 1080));
  
  // Reduce particle counts for better performance
  const regularParticleCount = Math.min(50, Math.floor((canvasWidth / 60) * densityFactor));
  const smallParticleCount = Math.min(100, Math.floor((canvasWidth / 20) * densityFactor));
  const cursorFollowingCount = Math.min(50, Math.floor(smallParticleCount * 0.2));
  const coinParticleCount = Math.min(10, Math.floor(regularParticleCount * 0.4));
  const dollarParticleCount = Math.min(35, Math.floor(regularParticleCount * 1.4));
  const spiderParticleCount = Math.min(10, Math.floor(regularParticleCount * 0.3));
  
  // Always create exactly 2 whales
  const whaleParticleCount = 2;
  
  // Create regular sized particles
  for (let i = 0; i < regularParticleCount; i++) {
    particles.push(createParticle(canvasWidth, canvasHeight));
  }
  
  // Create additional small particles
  for (let i = 0; i < smallParticleCount; i++) {
    particles.push(createParticle(canvasWidth, canvasHeight, true));
  }
  
  // Create additional cursor-following particles
  for (let i = 0; i < cursorFollowingCount; i++) {
    const particle = createParticle(canvasWidth, canvasHeight, true);
    particle.followCursor = true;
    particle.size = Math.random() * 1.5 + 5.5;
    particle.opacity = Math.random() * 0.4 + 0.2;
    particles.push(particle);
  }
  
  // Create coin-like particles
  for (let i = 0; i < coinParticleCount; i++) {
    const particle = createParticle(canvasWidth, canvasHeight);
    particle.color = PARTICLE_COLORS[1];
    particle.size = Math.random() * 3 + 8;
    particle.isCoin = true;
    particle.opacity = Math.random() * 0.5 + 0.5;
    particle.speedX = (Math.random() - 0.5) * 0.3;
    particle.speedY = (Math.random() - 0.5) * 0.3;
    particles.push(particle);
  }
  
  // Create dollar sign particles
  for (let i = 0; i < dollarParticleCount; i++) {
    const particle = createParticle(canvasWidth, canvasHeight);
    particle.color = "#FFD864";
    particle.size = Math.random() * 1.5 + 5;
    particle.isDollar = true;
    particle.opacity = Math.random() * 0.5 + 0.5;
    particles.push(particle);
  }
  
  // Create spider particles
  for (let i = 0; i < spiderParticleCount; i++) {
    const particle = createParticle(canvasWidth, canvasHeight);
    particle.color = "#FFFFFF";
    particle.size = Math.random() * 3.5 + 3;
    particle.isSpider = true;
    particle.speedX *= 1.4;
    particle.speedY *= 1.4;
    particle.opacity = Math.random() * 0.6 + 0.4;
    particles.push(particle);
  }
  
  // Create exactly 2 whale particles with specific positioning
  for (let i = 0; i < whaleParticleCount; i++) {
    const whale = createParticle(canvasWidth, canvasHeight);
    whale.color = "#216EB4";
    whale.size = Math.random() * 8 + 12; // Larger whales
    whale.isWhale = true;
    whale.speedX = (Math.random() - 0.5) * 0.6;
    whale.speedY = (Math.random() - 0.5) * 0.6;
    whale.opacity = Math.random() * 0.3 + 0.7; // Higher visibility
    
    // Position whales away from each other
    if (i === 0) {
      whale.x = canvasWidth * 0.25;
      whale.y = canvasHeight * 0.3;
    } else {
      whale.x = canvasWidth * 0.75;
      whale.y = canvasHeight * 0.7;
    }
    
    whale.direction = Math.atan2(whale.speedY, whale.speedX);
    whale.targetX = whale.x + Math.cos(whale.direction) * 150;
    whale.targetY = whale.y + Math.sin(whale.direction) * 150;
    
    particles.push(whale);
  }
  
  return particles;
};

export const createBurstParticles = (event: ParticleEvent): Particle[] => {
  const particles: Particle[] = [];
  const { x, y, count, colors = PARTICLE_COLORS, radius = 50, type = 'default' } = event;
  
  // console.log('Creating burst particles:', { x, y, count, type });
  
  // Limit the number of particles per burst
  const actualCount = Math.min(count, 15);
  
  for (let i = 0; i < actualCount; i++) {
    // Create particles within the specified radius
    const offsetX = (Math.random() - 0.5) * radius * 2;
    const offsetY = (Math.random() - 0.5) * radius * 2;
    
    const particle = createTemporaryParticle(
      x + offsetX,
      y + offsetY,
      colors,
      true,
      type
    );
    
    // Customize based on specified type
    if (type === 'coin' || (type === 'default' && Math.random() < 0.3)) {
      particle.isCoin = true;
      particle.isDollar = false;
      particle.color = "#FFD864";
      particle.size = Math.random() * 4 + 4; // Bigger coins
      particle.opacity = 0.9; // High opacity
      // console.log('Created coin particle with size:', particle.size);
    } else if (type === 'whale' || (type === 'default' && Math.random() < 0.05)) {
      particle.isWhale = true;
      particle.isDollar = false;
      particle.isCoin = false;
      particle.color = "#4BF8FF";
      particle.size = Math.random() * 8 + 12; // Larger whale
    } else if (type === 'spider' || (type === 'default' && Math.random() < 0.15)) {
      particle.isSpider = true;
      particle.isDollar = false;
      particle.isCoin = false;
      particle.color = "#FFFFFF";
      particle.size = Math.random() * 2 + 2;
    }
    
    particles.push(particle);
  }
  
  // console.log('Created burst particles count:', particles.length);
  return particles;
};
