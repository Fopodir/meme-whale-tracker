
import { Particle } from "../types/particle.types";

export const updateWhaleMovement = (
  whale: Particle,
  mousePos: { x: number, y: number },
  canvasWidth: number,
  canvasHeight: number,
  allParticles: Particle[],
  timeScale: number
): void => {
  if (!whale.isWhale) return;

  // Find nearest coin to hunt with improved detection
  const coins = allParticles.filter(p => (p.isCoin || p.isDollar) && !p.eaten);
  let nearestCoin: Particle | null = null;
  let minDistance = Infinity;

  coins.forEach(coin => {
    const dx = coin.x - whale.x;
    const dy = coin.y - whale.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    // Increased hunting range for more aggressive behavior
    if (distance < minDistance && distance < 300) {
      minDistance = distance;
      nearestCoin = coin;
    }
  });

  // Set target based on priority: coin > cursor > random movement
  let targetX = whale.targetX || whale.x;
  let targetY = whale.targetY || whale.y;

  if (nearestCoin) {
    // Hunt the nearest coin more aggressively
    targetX = nearestCoin.x;
    targetY = nearestCoin.y;
    whale.huntingCoin = nearestCoin.id;
  } else if (Math.sqrt((mousePos.x - whale.x) ** 2 + (mousePos.y - whale.y) ** 2) < 300) {
    // Follow cursor if close enough
    targetX = mousePos.x + (Math.random() - 0.5) * 100;
    targetY = mousePos.y + (Math.random() - 0.5) * 100;
    whale.huntingCoin = undefined;
  } else {
    // Random swimming if no target
    if (!whale.targetX || !whale.targetY || 
        Math.sqrt((whale.x - whale.targetX) ** 2 + (whale.y - whale.targetY) ** 2) < 50) {
      targetX = Math.random() * canvasWidth;
      targetY = Math.random() * canvasHeight;
    }
  }

  // Update target
  whale.targetX = targetX;
  whale.targetY = targetY;

  // Calculate direction to target
  const dx = targetX - whale.x;
  const dy = targetY - whale.y;
  const targetDirection = Math.atan2(dy, dx);

  // Smooth direction change
  let currentDirection = whale.direction || 0;
  let directionDiff = targetDirection - currentDirection;

  // Normalize direction difference to [-π, π]
  while (directionDiff > Math.PI) directionDiff -= 2 * Math.PI;
  while (directionDiff < -Math.PI) directionDiff += 2 * Math.PI;

  // Faster turning when hunting coins
  const maxTurnRate = nearestCoin ? 0.08 * timeScale : 0.03 * timeScale;
  if (Math.abs(directionDiff) > maxTurnRate) {
    currentDirection += Math.sign(directionDiff) * maxTurnRate;
  } else {
    currentDirection = targetDirection;
  }

  whale.direction = currentDirection;

  // Move whale faster when hunting coins
  const speed = nearestCoin ? 2.5 : 1.2; // Increased hunting speed
  whale.speedX = Math.cos(currentDirection) * speed * timeScale;
  whale.speedY = Math.sin(currentDirection) * speed * timeScale;

  // Update position
  whale.x += whale.speedX;
  whale.y += whale.speedY;

  // Keep whale within bounds with smooth boundary behavior
  const margin = whale.size * 2;
  if (whale.x < margin) {
    whale.x = margin;
    whale.direction = Math.PI - whale.direction;
  } else if (whale.x > canvasWidth - margin) {
    whale.x = canvasWidth - margin;
    whale.direction = Math.PI - whale.direction;
  }

  if (whale.y < margin) {
    whale.y = margin;
    whale.direction = -whale.direction;
  } else if (whale.y > canvasHeight - margin) {
    whale.y = canvasHeight - margin;
    whale.direction = -whale.direction;
  }
};

export const checkWhaleCoinCollision = (whale: Particle, particles: Particle[]): boolean => {
  if (!whale.isWhale) return false;

  const coins = particles.filter(p => (p.isCoin || p.isDollar) && !p.eaten);
  let hasEaten = false;

  coins.forEach(coin => {
    const dx = coin.x - whale.x;
    const dy = coin.y - whale.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    // Larger eating radius for easier catching
    if (distance < whale.size * 2.5) {
      coin.eaten = true;
      coin.eatenBy = whale.id;
      hasEaten = true;
      
      // Make the coin move toward the whale's mouth
      coin.speedX = (whale.x - coin.x) * 0.2;
      coin.speedY = (whale.y - coin.y) * 0.2;
    }
  });

  return hasEaten;
};

export const spawnNewWhale = (
  canvasWidth: number, 
  canvasHeight: number,
  existingWhales: Particle[]
): Particle => {
  // Find a position away from existing whales
  let x, y;
  let attempts = 0;
  
  do {
    x = Math.random() * (canvasWidth - 200) + 100;
    y = Math.random() * (canvasHeight - 200) + 100;
    attempts++;
  } while (attempts < 10 && existingWhales.some(whale => {
    const dx = whale.x - x;
    const dy = whale.y - y;
    return Math.sqrt(dx * dx + dy * dy) < 150;
  }));

  const direction = Math.random() * Math.PI * 2;
  
  // Adjusted whale size for consistent 200-400px display range
  // Using a narrower range to ensure more consistent sizing
  const minWhaleSize = 14; // Minimum size to ensure at least 200px display
  const maxWhaleSize = 20; // Maximum size for up to 400px display
  const whaleSize = Math.random() * (maxWhaleSize - minWhaleSize) + minWhaleSize;
  
  return {
    id: `whale_${Date.now()}_${Math.random()}`,
    x,
    y,
    size: whaleSize,
    color: "#216EB4", // Deep blue color for the whale
    speedX: Math.cos(direction) * 0.3,
    speedY: Math.sin(direction) * 0.3,
    opacity: 0.9,
    rotation: 0,
    rotationSpeed: 0,
    pulse: 0,
    pulseSpeed: 0.02,
    trail: [],
    trailLength: 0,
    isWhale: true,
    direction,
    targetX: x + Math.cos(direction) * 150,
    targetY: y + Math.sin(direction) * 150,
    createdAt: Date.now(),
    isWithinBounds: true,
  };
};

// New helper function to ensure correct whale count
export const maintainWhaleCount = (
  particles: Particle[], 
  canvasWidth: number, 
  canvasHeight: number
): Particle[] => {
  // Get current whales
  const whales = particles.filter(p => p.isWhale);
  const currentCount = whales.length;
  
  // Target range is 4-7 whales
  const minCount = 4;
  const maxCount = 7;
  
  let updatedParticles = [...particles];
  
  // Add whales if below minimum
  if (currentCount < minCount) {
    const neededCount = minCount - currentCount;
    for (let i = 0; i < neededCount; i++) {
      const newWhale = spawnNewWhale(canvasWidth, canvasHeight, whales);
      updatedParticles.push(newWhale);
    }
  }
  
  // Remove whales if above maximum
  if (currentCount > maxCount) {
    const excessCount = currentCount - maxCount;
    // Sort whales by creation time (oldest first)
    const oldestWhales = [...whales].sort((a, b) => 
      (a.createdAt || 0) - (b.createdAt || 0)
    ).slice(0, excessCount);
    
    // Remove the oldest whales
    updatedParticles = updatedParticles.filter(p => 
      !p.isWhale || !oldestWhales.some(w => w.id === p.id)
    );
  }
  
  return updatedParticles;
};
