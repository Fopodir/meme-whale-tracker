import { useEffect, useRef, useState } from "react";
import { Particle, ParticleEvent } from "@/types/particle.types";
import { initializeParticles, createBurstParticles } from "@/utils/particleUtils";
import { drawParticle, drawConnections } from "@/utils/particleRenderUtils";
import { updateParticlePosition, checkParticleEating } from "@/utils/particleAnimationUtils";
import { updateWhaleMovement, checkWhaleCoinCollision, spawnNewWhale, maintainWhaleCount } from "@/utils/whaleAnimationUtils";
import ParticleEventEmitter from "@/utils/ParticleEventEmitter";
import { toast } from "sonner";

export default function CoinParticlesBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationFrameRef = useRef<number>(0);
  const mouseRef = useRef<{x: number, y: number}>({ x: 0, y: 0 });
  const isMouseMovingRef = useRef<boolean>(false);
  const lastTimeRef = useRef<number>(0);
  const [fps, setFps] = useState<number>(0);
  
  // For FPS counting
  const lastFpsUpdateRef = useRef<number>(0);
  const frameCountRef = useRef<number>(0);
  
  // For tracking mouse movement to create coin trails
  const lastMousePosRef = useRef<{x: number, y: number}>({ x: 0, y: 0 });
  const mouseMoveDistanceRef = useRef<number>(0);
  const lastCoinSpawnRef = useRef<number>(0);
  
  // For auto-spawning coins
  const lastCoinAutoSpawnRef = useRef<number>(0);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(dpr, dpr);
      
      particlesRef.current = initializeParticles(window.innerWidth, window.innerHeight);
      
      // Initialize with 4-7 whales (replace existing whale initialization)
      const existingWhales = particlesRef.current.filter(p => p.isWhale);
      
      // Remove all existing whales first
      particlesRef.current = particlesRef.current.filter(p => !p.isWhale);
      
      // Add 5 new whales (middle of 4-7 range)
      for (let i = 0; i < 5; i++) {
        const newWhale = spawnNewWhale(
          window.innerWidth,
          window.innerHeight,
          particlesRef.current.filter(p => p.isWhale)
        );
        particlesRef.current.push(newWhale);
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      const dx = e.clientX - lastMousePosRef.current.x;
      const dy = e.clientY - lastMousePosRef.current.y;
      const distanceMoved = Math.sqrt(dx * dx + dy * dy);
      
      mouseRef.current = { x: e.clientX, y: e.clientY };
      
      mouseMoveDistanceRef.current += distanceMoved;
      const now = Date.now();
      
      if (mouseMoveDistanceRef.current > 25 && now - lastCoinSpawnRef.current > 80) {
        const eventEmitter = ParticleEventEmitter.getInstance();
        eventEmitter.emit({
          x: e.clientX,
          y: e.clientY,
          count: 1 + Math.floor(Math.random() * 2),
          colors: ["#FFD864"],
          radius: 15,
          type: 'coin'
        });
        
        mouseMoveDistanceRef.current = 0;
        lastCoinSpawnRef.current = now;
      }
      
      lastMousePosRef.current = { x: e.clientX, y: e.clientY };
      isMouseMovingRef.current = true;
      setTimeout(() => { isMouseMovingRef.current = false; }, 500);
    };

    const handleClick = (e: MouseEvent) => {
      // console.log('Click detected at:', e.clientX, e.clientY);
      
      const whales = particlesRef.current.filter(p => p.isWhale);
      let whaleClicked = false;
      
      // Check if clicked on a whale
      whales.forEach(whale => {
        const dx = e.clientX - whale.x;
        const dy = e.clientY - whale.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < whale.size * 4) {
          whaleClicked = true;
          // console.log('Whale clicked!');
          // Remove this whale
          particlesRef.current = particlesRef.current.filter(p => p.id !== whale.id);
          
          // Spawn a new whale at a different position
          const newWhale = spawnNewWhale(
            window.innerWidth, 
            window.innerHeight, 
            particlesRef.current.filter(p => p.isWhale)
          );
          particlesRef.current.push(newWhale);
          
          // Apply whale count limit using maintainWhaleCount
          particlesRef.current = maintainWhaleCount(
            particlesRef.current,
            window.innerWidth,
            window.innerHeight
          );
          
          toast("Whale repositioned! 🐋", {
            position: "bottom-right",
            duration: 1500
          });
        }
      });
      
      if (!whaleClicked) {
        // console.log('Creating coin burst at click position');
        // Create coin burst if no whale was clicked
        const eventEmitter = ParticleEventEmitter.getInstance();
        eventEmitter.emit({
          x: e.clientX,
          y: e.clientY,
          count: 8 + Math.floor(Math.random() * 6), // Create 8-14 coins
          colors: ["#FFD864", "#FFA500", "#FFB347"], // Golden colors
          radius: 80, // Larger spread
          type: 'coin'
        });
        
        // console.log('Coin burst emitted');
      }
    };

    // Make sure canvas captures clicks but stays in background
    canvas.style.pointerEvents = "auto";
    canvas.style.cursor = "pointer";
    canvas.style.position = "fixed";
    canvas.style.top = "0";
    canvas.style.left = "0";
    canvas.style.zIndex = "1"; // Lower z-index to stay behind content
    
    window.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('click', handleClick);

    // Subscribe to particle events
    const eventEmitter = ParticleEventEmitter.getInstance();
    const unsubscribe = eventEmitter.subscribe((event: ParticleEvent) => {
      // console.log('Particle event received:', event);
      const newParticles = createBurstParticles(event);
      // console.log('Created particles:', newParticles.length);
      particlesRef.current = [...particlesRef.current, ...newParticles];
    });

    const updateParticles = (timestamp: number) => {
      if (!ctx || !canvas) return;
      
      const deltaTime = timestamp - (lastTimeRef.current || timestamp);
      lastTimeRef.current = timestamp;
      
      if (deltaTime > 100) {
        animationFrameRef.current = requestAnimationFrame(updateParticles);
        return;
      }
      
      const timeScale = deltaTime / 16.67;
      
      // Track FPS
      frameCountRef.current++;
      if (timestamp - lastFpsUpdateRef.current >= 1000) {
        setFps(Math.round((frameCountRef.current * 1000) / (timestamp - lastFpsUpdateRef.current)));
        frameCountRef.current = 0;
        lastFpsUpdateRef.current = timestamp;
      }
      
      // Clear canvas
      ctx.fillStyle = "rgba(13, 17, 23, 0.1)";
      ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
      
      // Draw connections
      drawConnections(ctx, particlesRef.current, window.innerWidth);
      
      // Auto-spawn coins periodically for whales to eat
      const now = Date.now();
      if (now - lastCoinAutoSpawnRef.current > 2000) { // Spawn coins every 2 seconds
        const whaleCount = particlesRef.current.filter(p => p.isWhale).length;
        const coinCount = particlesRef.current.filter(p => (p.isCoin || p.isDollar) && !p.eaten).length;
        
        // Spawn coins if there aren't enough
        if (coinCount < whaleCount * 10) {
          const spawnCount = Math.min(10, whaleCount * 10 - coinCount);
          
          for (let i = 0; i < spawnCount; i++) {
            const x = Math.random() * window.innerWidth;
            const y = Math.random() * window.innerHeight;
            
            eventEmitter.emit({
              x,
              y,
              count: 1,
              colors: ["#FFD864"],
              radius: 10,
              type: 'coin'
            });
          }
        }
        
        lastCoinAutoSpawnRef.current = now;
      }
      
      // Process whales first and check for eating
      const whales = particlesRef.current.filter(p => p.isWhale);
      whales.forEach(whale => {
        updateWhaleMovement(
          whale,
          mouseRef.current,
          window.innerWidth,
          window.innerHeight,
          particlesRef.current,
          timeScale
        );
        
        
      });
      
      // Process particle eating behavior
      checkParticleEating(particlesRef.current);
      
      // Update and draw all particles
      const updatedParticles: Particle[] = [];
      
      for (const particle of particlesRef.current) {
        if (particle.eaten && particle.eatenBy) {
          const whaleEater = particlesRef.current.find(p => p.id === particle.eatenBy);
          if (whaleEater) {
            const dx = whaleEater.x - particle.x;
            const dy = whaleEater.y - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance > 20) {
              particle.x += dx * 0.3;
              particle.y += dy * 0.3;
              particle.opacity *= 0.92;
              drawParticle(ctx, particle);
              updatedParticles.push(particle);
            }
          }
        } else if (!particle.isWhale) {
          const keepParticle = updateParticlePosition(
            particle,
            mouseRef.current,
            isMouseMovingRef.current,
            window.innerWidth,
            window.innerHeight,
            timestamp,
            timeScale
          );
          
          if (keepParticle) {
            drawParticle(ctx, particle);
            updatedParticles.push(particle);
          }
        } else {
          // Whales are already updated above
          drawParticle(ctx, particle);
          updatedParticles.push(particle);
        }
      }
      
      particlesRef.current = updatedParticles;
      
      // Maintain whale count between 4-7
      particlesRef.current = maintainWhaleCount(
        particlesRef.current,
        window.innerWidth, 
        window.innerHeight
      );
      
      // Limit total particles for performance
      if (particlesRef.current.length > 400) {
        const excess = particlesRef.current.length - 400;
        particlesRef.current = particlesRef.current
          .sort((a, b) => {
            if (a.isWhale && !b.isWhale) return 1;
            if (!a.isWhale && b.isWhale) return -1;
            if (a.temporary && !b.temporary) return 1;
            if (!a.temporary && b.temporary) return -1;
            return (b.createdAt || 0) - (a.createdAt || 0);
          })
          .slice(0, particlesRef.current.length - excess);
      }
      
      animationFrameRef.current = requestAnimationFrame(updateParticles);
    };

    resizeCanvas();
    animationFrameRef.current = requestAnimationFrame(updateParticles);

    let resizeTimeout: number;
    window.addEventListener("resize", () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = window.setTimeout(resizeCanvas, 300);
    });

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("click", handleClick);
      cancelAnimationFrame(animationFrameRef.current);
      unsubscribe();
      clearTimeout(resizeTimeout);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-auto"
      style={{ zIndex: 1 }}
    />
  );
}
