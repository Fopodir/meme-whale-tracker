import { Particle } from "../types/particle.types";

export const updateParticlePosition = (
  particle: Particle, 
  mouseRef: { x: number, y: number }, 
  isMouseMoving: boolean,
  canvasWidth: number, 
  canvasHeight: number,
  timestamp: number,
  timeScale: number
): boolean => { // Return whether to keep the particle
  // Update trail for regular particles that have trails, but only for a limited time
  if (!particle.isSmall && particle.trail && particle.trail.length > 0) {
    // Check if we should maintain the trail
    const maxTrailAge = 3000; // 3 seconds for trails to exist
    
    if (!particle.createdAt || timestamp - particle.createdAt > maxTrailAge) {
      // After maxTrailAge, gradually reduce the trail
      if (particle.trail.length > 0 && timestamp % 5 === 0) {
        particle.trail.pop(); // Remove the oldest trail point
      }
    } else {
      // Update trail less frequently to improve performance
      if (timestamp % 2 === 0) {
        particle.trail.unshift({x: particle.x, y: particle.y});
        if (particle.trail.length > particle.trailLength) {
          particle.trail.pop();
        }
      }
    }
  }
  
  // Enhanced handling for eaten particles
  if (particle.eaten) {
    // Find the whale that's eating this particle
    const whaleEater = particle.eatenBy;
    if (whaleEater) {
      // Shrink the particle as it's being eaten
      particle.size *= 0.95;
      particle.opacity *= 0.88;
      
      // Make the particle fade faster
      particle.lifespan = particle.lifespan ? particle.lifespan - timeScale * 50 : 200;
      
      // If particle is too small or transparent, remove it
      if (particle.size < 0.5 || particle.opacity < 0.1 || (particle.lifespan && particle.lifespan <= 0)) {
        return false;
      }
    }
    
    return true;
  }
  
  // Check if whale was clicked and should fade
  if (particle.isWhale && particle.clicked) {
    // Gradually fade out the whale
    particle.opacity *= 0.95;
    
    // If opacity is too low, remove the particle
    if (particle.opacity < 0.02) {
      return false;
    }
  }
  
  // Special handling for coin particles
  if (particle.isCoin) {
    // Coins move in a slight up and down motion
    if (timestamp % 300 < 150) {
      particle.speedY -= 0.001 * timeScale;
    } else {
      particle.speedY += 0.001 * timeScale;
    }
    
    // Make coins rotate more consistently for a spinning effect
    particle.rotationSpeed = 0.01;
    
    // Reset movement direction every few seconds
    // This gives the effect of "forgetting" previous movement patterns
    if (!particle.lastDirectionChange) {
      particle.lastDirectionChange = timestamp;
    }
    
    // Change direction every 3-5 seconds randomly
    const changeInterval = 3000 + Math.random() * 2000;
    if (timestamp - particle.lastDirectionChange > changeInterval) {
      particle.speedX = (Math.random() - 0.5) * 0.5; // New random direction
      particle.speedY = (Math.random() - 0.5) * 0.5;
      particle.lastDirectionChange = timestamp;
    }
    
    // Coins occasionally change direction randomly when not near cursor
    const dx = mouseRef.x - particle.x;
    const dy = mouseRef.y - particle.y;
    const distanceToCursor = Math.sqrt(dx * dx + dy * dy);
    const cursorInfluenceRange = 150; // Range within which cursor affects coins
    
    if (distanceToCursor > cursorInfluenceRange && Math.random() < 0.02) {
      // Change to random direction occasionally
      particle.speedX = (Math.random() - 0.5) * 0.5; // Slower random movement
      particle.speedY = (Math.random() - 0.5) * 0.5;
    }
    else if (distanceToCursor <= cursorInfluenceRange) {
      // When near cursor, gently follow it
      const followStrength = Math.max(0.02, 1 - (distanceToCursor / cursorInfluenceRange)) * 0.1;
      particle.speedX += (dx / distanceToCursor) * followStrength * timeScale;
      particle.speedY += (dy / distanceToCursor) * followStrength * timeScale;
    }
  }
  
  // Special handling for whale particles
  if (particle.isWhale) {
    // Whales seek nearby coins to eat them
    const eatRange = particle.size * 1.5;
    
    // Whales are attracted to cursor but more gently
    if (isMouseMoving) {
      const dx = mouseRef.x - particle.x;
      const dy = mouseRef.y - particle.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const maxDistance = 200;
      
      if (distance < maxDistance) {
        // Attract whale to cursor
        particle.speedX += (dx / distance) * 0.02 * timeScale;
        particle.speedY += (dy / distance) * 0.02 * timeScale;
      }
    }
  }
  
  // Special handling for spider particles
  if (particle.isSpider) {
    // Spiders move in a more erratic pattern
    if (Math.random() < 0.03) {
      // Occasionally change direction
      particle.speedX = (Math.random() - 0.5) * 1.5;
      particle.speedY = (Math.random() - 0.5) * 1.5;
    }
    
    // Spiders are attracted to the mouse cursor more strongly
    if (isMouseMoving) {
      const dx = mouseRef.x - particle.x;
      const dy = mouseRef.y - particle.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const maxDistance = 200;
      
      if (distance < maxDistance) {
        // If mouse is moving, spiders run away
        particle.speedX -= (dx / distance) * 0.1 * timeScale;
        particle.speedY -= (dy / distance) * 0.1 * timeScale;
      }
    }
  }
  
  // Special handling for temporary particles
  if (particle.temporary && particle.lifespan) {
    particle.lifespan -= timeScale * 16.67;
    
    // Fade out as lifespan decreases
    if (particle.lifespan < 300) {
      particle.opacity *= 0.92;
    }
    
    // For temporary particles, add some upward motion
    particle.speedY -= 0.005 * timeScale;
    
    // For temporary coin particles, add spinning effect
    if (particle.isCoin) {
      particle.rotationSpeed = 0.05;
    }
    
    // Return false to remove particle when lifespan expires or opacity is too low
    if (particle.lifespan <= 0 || particle.opacity < 0.01) {
      return false;
    }
  }
  
  // Cursor-following behavior for selected small particles - only process if they are visible
  if (particle.followCursor) {
    const dx = mouseRef.x - particle.x;
    const dy = mouseRef.y - particle.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const maxFollowDistance = 180; // Reduced from 300
    
    if (distance < maxFollowDistance) {
      // Make particles follow cursor more slowly for a trailing effect
      const followStrength = Math.max(0.03, 1 - (distance / maxFollowDistance)) * 0.2;
      
      particle.speedX += (dx / distance) * followStrength * timeScale;
      particle.speedY += (dy / distance) * followStrength * timeScale;
      
      // Add slight random movement - reduce frequency of randomization
      if (Math.random() < 0.02) {
        particle.speedX += (Math.random() - 0.5) * 0.1;
        particle.speedY += (Math.random() - 0.5) * 0.1;
      }
    }
    
    // Add a bit more drag to cursor-following particles for smoother movement
    particle.speedX *= 0.95;
    particle.speedY *= 0.95;
  }
  // Mouse interaction - particles are attracted to mouse when moving (only if visible)
  else if (isMouseMoving && !particle.isCoin) { // Skip generic mouse attraction for coins, they have custom logic
    const dx = mouseRef.x - particle.x;
    const dy = mouseRef.y - particle.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const maxDistance = particle.isSmall ? 80 : 150;
    
    if (distance < maxDistance) {
      const force = (maxDistance - distance) / maxDistance * 0.7;
      particle.x += (dx / distance) * force * (particle.isSmall ? 0.8 : 1.2) * timeScale;
      particle.y += (dy / distance) * force * (particle.isSmall ? 0.8 : 1.2) * timeScale;
    }
  }
  
  // Create flowing field effect - only apply on visible particles
  const flowFreq = 1.5; // Reduce flow frequency
  const flowAngle = ((particle.x / canvasWidth * Math.PI * flowFreq) + 
                   (particle.y / canvasHeight * Math.PI * flowFreq) + 
                   (timestamp * 0.00002)); // Reduced from 0.00005
  
  // Apply flow field less strongly to coins
  const flowStrength = particle.isCoin ? 0.001 : 0.003;
  particle.speedX += Math.cos(flowAngle) * flowStrength * timeScale;
  particle.speedY += Math.sin(flowAngle) * flowStrength * timeScale;
  
  // Limit max speed
  const maxSpeed = particle.temporary ? 1.8 : 
                 (particle.isSmall ? 1.0 : 
                 (particle.isWhale ? 0.8 :
                 (particle.isCoin ? 0.6 : // Slower speed for coins
                 (particle.isSpider ? 1.2 : 0.7))));
  const currentSpeed = Math.sqrt(particle.speedX**2 + particle.speedY**2);
  if (currentSpeed > maxSpeed) {
    particle.speedX = (particle.speedX / currentSpeed) * maxSpeed;
    particle.speedY = (particle.speedY / currentSpeed) * maxSpeed;
  }
  
  // Update position
  particle.x += particle.speedX * timeScale;
  particle.y += particle.speedY * timeScale;
  
  // ---------------
  // BOUNDARY ENFORCEMENT - keep particles within the canvas
  // ---------------
  const margin = particle.size;
  
  // Keep particles within bounds
  if (particle.x < margin) {
    particle.x = margin;
    particle.speedX *= -0.7;
  } else if (particle.x > canvasWidth - margin) {
    particle.x = canvasWidth - margin;
    particle.speedX *= -0.7;
  }
  
  if (particle.y < margin) {
    particle.y = margin;
    particle.speedY *= -0.7;
  } else if (particle.y > canvasHeight - margin) {
    particle.y = canvasHeight - margin;
    particle.speedY *= -0.7;
  }
  
  // Apply some friction
  particle.speedX *= 0.98;
  particle.speedY *= 0.98;
  
  return true; // Keep this particle
};

// Enhanced particle eating function with better visual feedback
export const checkParticleEating = (particles: Particle[]): void => {
  const whales = particles.filter(p => p.isWhale && !p.temporary);
  const coins = particles.filter(p => (p.isCoin || p.isDollar) && !p.eaten);
  
  whales.forEach(whale => {
    if (!whale.id) return;
    
    // Each whale can eat multiple coins at once for more dramatic effect
    let eatenCount = 0;
    for (const coin of coins) {
      if (eatenCount >= 5) break; // Increased from 3 to 5
      
      const dx = coin.x - whale.x;
      const dy = coin.y - whale.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      // Larger eating radius
      if (distance < whale.size * 3) {
        coin.eaten = true;
        coin.eatenBy = whale.id;
        
        // Make the coin move toward the whale's center more aggressively
        coin.speedX = (whale.x - coin.x) * 0.3;
        coin.speedY = (whale.y - coin.y) * 0.3;
        
        // Add some visual effects to the coin being eaten
        coin.rotationSpeed = 0.2; // Spin faster when being eaten
        
        eatenCount++;
      }
    }
  });
};

// Check if a mouse click hit a whale particle
export const checkWhaleClick = (
  particles: Particle[],
  mouseX: number, 
  mouseY: number
): boolean => {
  let whaleClicked = false;
  
  // Find all whale particles
  const whales = particles.filter(p => p.isWhale && !p.temporary);
  
  // Check each whale to see if it was clicked
  for (const whale of whales) {
    const dx = mouseX - whale.x;
    const dy = mouseY - whale.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    // If distance is within the whale's size, consider it clicked
    if (distance < whale.size * 2) {
      whale.clicked = true;
      whaleClicked = true;
    }
  }
  
  return whaleClicked;
};

// Helper function to check if a particle is visible on screen (with some margin)
const isOnScreen = (particle: Particle, canvasWidth: number, canvasHeight: number): boolean => {
  const margin = 50; // Extra margin to ensure we process particles just off screen
  return (
    particle.x > -margin &&
    particle.x < canvasWidth + margin &&
    particle.y > -margin &&
    particle.y < canvasHeight + margin
  );
};
