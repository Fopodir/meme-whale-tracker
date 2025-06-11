
import { useCallback, useEffect, useRef } from 'react';
import ParticleEventEmitter from '@/utils/ParticleEventEmitter';
import { ParticleEvent } from '@/types/particle.types';

export function useParticleEffect() {
  const emitter = useRef(ParticleEventEmitter.getInstance());
  
  const createParticleBurst = useCallback((element: HTMLElement, count: number = 15, colors?: string[]) => {
    if (!element) return;
    
    // Get element position
    const rect = element.getBoundingClientRect();
    
    // Create particles at random positions within the element
    const event: ParticleEvent = {
      x: rect.left + rect.width * Math.random(),
      y: rect.top + rect.height * Math.random(),
      count,
      colors,
      radius: Math.min(rect.width, rect.height) / 2
    };
    
    emitter.current.emit(event);
  }, []);
  
  // Enhanced version that creates multiple bursts for bigger movement effect
  const createEnhancedParticleBurst = useCallback((element: HTMLElement, burstCount: number = 3, particlesPerBurst: number = 10, colors?: string[]) => {
    if (!element) return;
    
    const rect = element.getBoundingClientRect();
    
    // Create multiple bursts at different positions with slight delay
    for (let i = 0; i < burstCount; i++) {
      setTimeout(() => {
        const event: ParticleEvent = {
          x: rect.left + rect.width * Math.random(), 
          y: rect.top + rect.height * Math.random(),
          count: particlesPerBurst,
          colors,
          radius: Math.min(rect.width, rect.height) / 2
        };
        
        emitter.current.emit(event);
      }, i * 100); // Stagger the bursts
    }
  }, []);
  
  // Method to create spider particles specifically
  const createSpiderBurst = useCallback((x: number, y: number, count: number = 8) => {
    const event: ParticleEvent = {
      x,
      y,
      count,
      colors: ['#FFFFFF'], // White color for spiders
      radius: 50,
      type: 'spider'
    };
    
    emitter.current.emit(event);
  }, []);
  
  // Method to create coin particles
  const createCoinBurst = useCallback((x: number, y: number, count: number = 12) => {
    const event: ParticleEvent = {
      x,
      y,
      count,
      colors: ['#FFD864'], // Golden color for coins
      radius: 60,
      type: 'coin'
    };
    
    emitter.current.emit(event);
  }, []);
  
  // New method to create whale particles
  const createWhaleBurst = useCallback((x: number, y: number, count: number = 3) => {
    const event: ParticleEvent = {
      x,
      y,
      count,
      colors: ['#4BF8FF', '#00C6FF'], // Blue colors for whales
      radius: 50,
      type: 'whale'
    };
    
    emitter.current.emit(event);
  }, []);
  
  return { 
    createParticleBurst, 
    createEnhancedParticleBurst, 
    createSpiderBurst,
    createCoinBurst,
    createWhaleBurst
  };
}
