import { Particle } from "../types/particle.types";

export const drawParticle = (ctx: CanvasRenderingContext2D, particle: Particle): void => {
  // Performance optimization: Skip rendering particles that are too transparent
  if (particle.opacity < 0.02) return;
  
  // Add pulsing effect - but with reduced intensity and frequency
  particle.pulse += particle.pulseSpeed * 0.3;
  const sizePulse = Math.sin(particle.pulse) * 0.3 + 1;
  
  // Apply rotation - but with reduced update frequency
  if (!particle.isSmall) {
    particle.rotation += particle.rotationSpeed * 0.3;
  }

  // Draw trail only for larger particles with trails
  if (!particle.isSmall && particle.trail && particle.trail.length > 0) {
    ctx.save();
    
    // Optimize by only drawing every third trail point
    for (let i = 0; i < particle.trail.length; i += 3) {
      const point = particle.trail[i];
      const alpha = (1 - i / particle.trail.length) * 0.25 * particle.opacity;
      const size = particle.size * (1 - i / particle.trail.length) * 0.5;
      
      if (alpha < 0.02) continue; // Skip very transparent trail points
      
      ctx.beginPath();
      ctx.arc(point.x, point.y, size, 0, Math.PI * 2);
      ctx.fillStyle = particle.color + Math.floor(alpha * 255).toString(16).padStart(2, '0');
      ctx.fill();
    }
    ctx.restore();
  }
  
  // Draw particle
  ctx.save();
  ctx.translate(particle.x, particle.y);
  
  // Special handling for whale particles with directional rendering
  if (particle.isWhale) {
    const opacity = Math.floor(particle.opacity * 255).toString(16).padStart(2, '0');
    const whaleSize = particle.size;
    
    // Rotate whale to face movement direction
    if (particle.direction !== undefined) {
      ctx.rotate(particle.direction);
    }
    
    // Main whale body color
    const whaleBlue = "#216EB4"; // Deep blue color for the whale
    
    // Calculate tail movement - natural swimming motion
    const tailWaveSpeed = 0.01;
    const tailWaveAmount = 0.4;
    const tailOffset = Math.sin(Date.now() * tailWaveSpeed) * tailWaveAmount;
    
    // Draw whale body - more realistic shape
    ctx.beginPath();
    
    // Head/front part of whale
    ctx.moveTo(whaleSize * 2.2, 0);
    
    // Top curve (from nose to dorsal fin)
    ctx.quadraticCurveTo(whaleSize * 1.5, -whaleSize * 0.8, whaleSize * 0.5, -whaleSize * 1.0);
    
    // Dorsal fin - more pronounced
    ctx.lineTo(whaleSize * 0.2, -whaleSize * 1.8);
    ctx.lineTo(-whaleSize * 0.2, -whaleSize * 1.0);
    
    // Back top curve
    ctx.quadraticCurveTo(-whaleSize * 0.6, -whaleSize * 1.0, -whaleSize * 1.0, -whaleSize * 0.6);
    
    // Tail connection top with wave motion
    ctx.quadraticCurveTo(-whaleSize * 1.5, -whaleSize * (0.5 + tailOffset * 0.1), -whaleSize * 2.0, -whaleSize * (0.5 + tailOffset * 0.2));
    
    // Tail top fin with wave motion
    ctx.quadraticCurveTo(-whaleSize * 2.8, -whaleSize * (1.5 + tailOffset * 0.3), -whaleSize * 3.0, -whaleSize * (1.7 + tailOffset * 0.3));
    ctx.lineTo(-whaleSize * 2.8, -whaleSize * (1.0 + tailOffset * 0.2));
    
    // Back to tail connection with wave motion
    ctx.lineTo(-whaleSize * 2.0, -whaleSize * (0.2 + tailOffset * 0.1));
    
    // Tail bottom fin with opposite wave motion
    ctx.lineTo(-whaleSize * 2.8, whaleSize * (1.0 - tailOffset * 0.2));
    ctx.lineTo(-whaleSize * 3.0, whaleSize * (1.5 - tailOffset * 0.3));
    ctx.quadraticCurveTo(-whaleSize * 2.8, whaleSize * (1.2 - tailOffset * 0.3), -whaleSize * 2.5, whaleSize * (0.8 - tailOffset * 0.2));
    ctx.quadraticCurveTo(-whaleSize * 2.2, whaleSize * (0.5 - tailOffset * 0.1), -whaleSize * 2.0, whaleSize * (0.4 - tailOffset * 0.1));
    
    // Bottom body curve
    ctx.quadraticCurveTo(-whaleSize * 1.0, whaleSize * 0.6, whaleSize * 0.5, whaleSize * 0.9);
    
    // Front bottom curve (belly)
    ctx.quadraticCurveTo(whaleSize * 1.5, whaleSize * 0.7, whaleSize * 2.2, 0);
    
    ctx.fillStyle = whaleBlue + opacity;
    ctx.fill();
    
    // Add an eye for more realism
    ctx.beginPath();
    ctx.arc(whaleSize * 1.8, whaleSize * 0.2, whaleSize * 0.15, 0, Math.PI * 2);
    ctx.fillStyle = "#000000" + opacity;
    ctx.fill();
    
    // Add white eyeball
    ctx.beginPath();
    ctx.arc(whaleSize * 1.8, whaleSize * 0.17, whaleSize * 0.07, 0, Math.PI * 2);
    ctx.fillStyle = "#FFFFFF" + opacity;
    ctx.fill();
    
    // Add blowhole
    ctx.beginPath();
    ctx.ellipse(whaleSize * 1.0, -whaleSize * 0.8, whaleSize * 0.15, whaleSize * 0.08, 0, 0, Math.PI * 2);
    ctx.fillStyle = "#000000" + opacity;
    ctx.fill();
    
    // Draw blue patches/markings instead of white spots
    const numberOfPatches = Math.floor(whaleSize * 2.5);
    ctx.fillStyle = "#1A5C9A" + opacity; // Darker blue for patches
    
    // Pre-defined patches in specific positions
    const patchPositions = [
      { x: whaleSize * 1.5, y: -whaleSize * 0.3, size: whaleSize * 0.2 },
      { x: whaleSize * 0.8, y: whaleSize * 0.4, size: whaleSize * 0.25 },
      { x: whaleSize * 0.2, y: -whaleSize * 0.6, size: whaleSize * 0.3 },
      { x: -whaleSize * 0.5, y: whaleSize * 0.3, size: whaleSize * 0.35 },
      { x: -whaleSize * 1.2, y: -whaleSize * 0.2, size: whaleSize * 0.25 },
      { x: -whaleSize * 1.8, y: whaleSize * 0.1, size: whaleSize * 0.2 }
    ];
    
    // Draw pre-defined darker blue patches instead of white spots
    for (const patch of patchPositions) {
      ctx.beginPath();
      ctx.arc(patch.x, patch.y, patch.size, 0, Math.PI * 2);
      ctx.fill();
    }
    
    // No more random small white spots
    
    ctx.restore();
    return;
  }

  // Special handling for spider particles
  if (particle.isSpider) {
    const opacity = Math.floor(particle.opacity * 255).toString(16).padStart(2, '0');
    const bodySize = particle.size * 0.4;
    
    // Draw spider body
    ctx.beginPath();
    ctx.arc(0, 0, bodySize, 0, Math.PI * 2);
    ctx.fillStyle = particle.color + opacity;
    ctx.fill();
    
    // Draw spider legs
    ctx.lineWidth = bodySize * 0.2;
    ctx.strokeStyle = particle.color + opacity;
    
    // Draw 8 legs
    for (let i = 0; i < 8; i++) {
      const angle = (i / 8) * Math.PI * 2 + particle.rotation;
      const legLength = particle.size * (0.8 + Math.sin(particle.pulse * 2 + i) * 0.2);
      
      ctx.beginPath();
      ctx.moveTo(0, 0);
      
      // Create a curved leg with a bend in the middle
      const midX = Math.cos(angle) * legLength * 0.5;
      const midY = Math.sin(angle) * legLength * 0.5;
      
      // Add a slight bend to the leg
      const perpX = Math.cos(angle + Math.PI/2) * (i % 2 === 0 ? 1 : -1) * legLength * 0.2;
      const perpY = Math.sin(angle + Math.PI/2) * (i % 2 === 0 ? 1 : -1) * legLength * 0.2;
      
      const controlX = midX + perpX;
      const controlY = midY + perpY;
      
      const endX = Math.cos(angle) * legLength;
      const endY = Math.sin(angle) * legLength;
      
      ctx.quadraticCurveTo(controlX, controlY, endX, endY);
      ctx.stroke();
    }
    
    ctx.restore();
    return;
  }
  
  // Enhanced coin particles
  if (particle.isCoin) {
    // Draw a coin with enhanced appearance and 3D effect
    const coinSize = particle.size * sizePulse;
    const opacity = Math.floor(particle.opacity * 255).toString(16).padStart(2, '0');
    
    // If this coin is being eaten, make it appear to be moving to the eater
    if (particle.eaten) {
      // Draw simpler version for eaten coins
      ctx.beginPath();
      ctx.arc(0, 0, coinSize * 0.8, 0, Math.PI * 2);
      ctx.fillStyle = "#FFD864" + opacity;
      ctx.fill();
      ctx.restore();
      return;
    }
    
    // Draw main coin body
    ctx.beginPath();
    ctx.arc(0, 0, coinSize, 0, Math.PI * 2);
    ctx.fillStyle = "#FFD864" + opacity; // Golden color
    ctx.fill();
    
    // Add inner detail to coin
    ctx.beginPath();
    ctx.arc(0, 0, coinSize * 0.85, 0, Math.PI * 2);
    ctx.strokeStyle = "#E0B846" + opacity;
    ctx.lineWidth = coinSize * 0.05;
    ctx.stroke();
    
    // Add highlight for 3D effect
    ctx.beginPath();
    ctx.arc(-coinSize * 0.3, -coinSize * 0.3, coinSize * 0.4, 0, Math.PI * 2);
    ctx.fillStyle = "#FFFFFF" + Math.floor(particle.opacity * 0.7 * 255).toString(16).padStart(2, '0');
    ctx.fill();
    
    // Add dollar sign or other symbol based on rotation
    const symbolType = Math.abs(Math.floor(particle.x * 10 + particle.y * 10)) % 3;
    
    ctx.fillStyle = "#000000" + Math.floor(particle.opacity * 0.9 * 255).toString(16).padStart(2, '0');
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.font = `bold ${coinSize * 1.2}px Arial`;
    
    if (symbolType === 0) {
      ctx.fillText("$", 0, 0);
    } else if (symbolType === 1) {
      ctx.fillText("₿", 0, 0); // Bitcoin symbol
    } else {
      ctx.fillText("S", 0, 0); // For SOL
    }
    
    // Add edge to the coin for more 3D effect
    ctx.beginPath();
    ctx.arc(0, 0, coinSize * 0.95, 0, Math.PI * 2);
    ctx.strokeStyle = "#E0B846" + Math.floor(particle.opacity * 0.9 * 255).toString(16).padStart(2, '0');
    ctx.lineWidth = coinSize * 0.1;
    ctx.stroke();
    
    ctx.restore();
    return;
  }
  
  // Draw small particle as simple dot - most efficient rendering
  if ((particle.isSmall || particle.temporary) && !particle.isDollar) {
    ctx.beginPath();
    ctx.arc(0, 0, particle.size, 0, Math.PI * 2);
    ctx.fillStyle = particle.color + Math.floor(particle.opacity * 255).toString(16).padStart(2, '0');
    ctx.fill();
    ctx.restore();
    return;
  }
  
  // Special handling for dollar sign particles
  if (particle.isDollar) {
    // If this dollar is being eaten, make it appear to be moving to the eater
    if (particle.eaten) {
      // Draw simpler version for eaten coins
      ctx.beginPath();
      ctx.arc(0, 0, particle.size * sizePulse * 0.8, 0, Math.PI * 2);
      ctx.fillStyle = particle.color + Math.floor(particle.opacity * 255).toString(16).padStart(2, '0');
      ctx.fill();
      ctx.restore();
      return;
    }
    
    // Draw background circle
    ctx.beginPath();
    ctx.arc(0, 0, particle.size * sizePulse, 0, Math.PI * 2);
    ctx.fillStyle = particle.color + Math.floor(particle.opacity * 255).toString(16).padStart(2, '0');
    ctx.fill();
    
    // Draw $ symbol
    ctx.fillStyle = "#000" + Math.floor(particle.opacity * 180).toString(16).padStart(2, '0');
    ctx.font = `bold ${particle.size * 1.5}px Arial`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("$", 0, 0);
    
    // Add glow around dollar sign
    if (particle.opacity > 0.5) {
      ctx.shadowColor = particle.color;
      ctx.shadowBlur = 5;
      ctx.fillText("$", 0, 0);
      ctx.shadowBlur = 0;
    }
    
    ctx.restore();
    return;
  }
  
  // Special handling for warm yellow particles to make them look like coins
  if (particle.color === '#FFD864') {
    // Draw a coin with enhanced appearance
    ctx.beginPath();
    ctx.arc(0, 0, particle.size * sizePulse, 0, Math.PI * 2);
    ctx.fillStyle = particle.color + Math.floor(particle.opacity * 255).toString(16).padStart(2, '0');
    ctx.fill();
    
    // Add a highlight to make it look more 3D - improved look
    ctx.beginPath();
    ctx.arc(-particle.size * 0.3, -particle.size * 0.3, particle.size * 0.4, 0, Math.PI * 2);
    ctx.fillStyle = "#FFFFFF" + Math.floor(particle.opacity * 0.6 * 255).toString(16).padStart(2, '0');
    ctx.fill();
    
    // Add a subtle edge for more depth
    ctx.beginPath();
    ctx.arc(0, 0, particle.size * 0.95, 0, Math.PI * 2);
    ctx.strokeStyle = "#E0B846" + Math.floor(particle.opacity * 0.7 * 255).toString(16).padStart(2, '0');
    ctx.lineWidth = particle.size * 0.1;
    ctx.stroke();
    
    ctx.restore();
    return;
  }
  
  // Draw geometric shapes for regular particles - simplified rendering
  const shapeType = Math.abs(Math.floor(particle.x * 10 + particle.y * 10)) % 4;
  
  if (shapeType === 0) {
    // Draw diamond
    ctx.beginPath();
    ctx.moveTo(0, -particle.size * sizePulse);
    ctx.lineTo(particle.size * sizePulse, 0);
    ctx.lineTo(0, particle.size * sizePulse);
    ctx.lineTo(-particle.size * sizePulse, 0);
    ctx.closePath();
    ctx.fillStyle = particle.color + Math.floor(particle.opacity * 255).toString(16).padStart(2, '0');
    ctx.fill();
  } else {
    // Default to circle for better performance
    ctx.beginPath();
    ctx.arc(0, 0, particle.size * sizePulse, 0, Math.PI * 2);
    ctx.fillStyle = particle.color + Math.floor(particle.opacity * 255).toString(16).padStart(2, '0');
    ctx.fill();
  }
  
  ctx.restore();
};

export const drawConnections = (ctx: CanvasRenderingContext2D, particles: Particle[], canvasWidth: number): void => {
  ctx.strokeStyle = "rgba(47, 249, 128, 0.1)";
  ctx.lineWidth = 0.4;
  
  // Only connect larger particles to reduce number of connections
  const regularParticles = particles.filter(p => !p.isSmall);
  
  // Limit the number of particles to check for connections
  const maxConnectionParticles = Math.min(regularParticles.length, 30); // Reduced from 50
  
  // Use a sampling approach for larger particle counts
  const step = Math.max(1, Math.floor(regularParticles.length / maxConnectionParticles));
  
  // Keep a counter to limit the total number of connections drawn
  let connectionCount = 0;
  const maxConnections = 100; // Reduced from 200
  
  for (let i = 0; i < regularParticles.length; i += step) {
    if (connectionCount >= maxConnections) break;
    
    const particleA = regularParticles[i];
    
    // Only check a subset of the other particles
    const checkStart = i + step;
    for (let j = checkStart; j < regularParticles.length; j += step) {
      if (connectionCount >= maxConnections) break;
      
      const particleB = regularParticles[j];
      const dx = particleA.x - particleB.x;
      const dy = particleA.y - particleB.y;
      const distanceSquared = dx * dx + dy * dy; // Avoid square root for performance
      
      // Only draw connections if particles are close enough
      const connectionDistance = canvasWidth / 10; // Reduced from 8
      const connectionDistanceSquared = connectionDistance * connectionDistance;
      
      if (distanceSquared < connectionDistanceSquared) {
        // Calculate real distance only if needed
        const distance = Math.sqrt(distanceSquared);
        
        ctx.beginPath();
        ctx.moveTo(particleA.x, particleA.y);
        ctx.lineTo(particleB.x, particleB.y);
        
        // Make the opacity fade with distance
        const opacity = 1 - (distance / connectionDistance);
        ctx.strokeStyle = `rgba(47, 249, 128, ${opacity * 0.1})`; // Reduced from 0.12
        ctx.lineWidth = opacity * 0.3; // Reduced from 0.4
        ctx.stroke();
        
        connectionCount++;
      }
    }
  }
};
