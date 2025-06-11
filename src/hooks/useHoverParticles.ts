
import { useCallback } from 'react';
import { useParticleEffect } from './useParticleEffect';

export function useHoverParticles() {
  const { createParticleBurst, createEnhancedParticleBurst } = useParticleEffect();
  
  const handleElementHover = useCallback((element: HTMLElement | null, colors?: string[]) => {
    if (!element) return;
    
    // Create a smaller initial burst
    createParticleBurst(element, 8, colors);
    
    // Set up hover listeners
    const handleMouseEnter = () => {
      createEnhancedParticleBurst(element, 3, 10, colors);
    };
    
    const handleMouseMove = (e: MouseEvent) => {
      // Only create particles occasionally on move to avoid overwhelming the system
      if (Math.random() < 0.15) {
        createParticleBurst(
          element, 
          3, 
          colors
        );
      }
    };
    
    const handleMouseLeave = () => {
      // Create a final burst when leaving
      createParticleBurst(element, 5, colors);
    };
    
    element.addEventListener('mouseenter', handleMouseEnter);
    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);
    
    // Return cleanup function
    return () => {
      element.removeEventListener('mouseenter', handleMouseEnter);
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [createParticleBurst, createEnhancedParticleBurst]);
  
  return { handleElementHover };
}
