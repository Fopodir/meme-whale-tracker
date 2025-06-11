
import { ParticleEvent } from "../types/particle.types";

type EventCallback = (event: ParticleEvent) => void;

class ParticleEventEmitter {
  private static instance: ParticleEventEmitter;
  private listeners: EventCallback[] = [];
  private particleIdCounter: number = 0;
  
  private constructor() {}
  
  public static getInstance(): ParticleEventEmitter {
    if (!ParticleEventEmitter.instance) {
      ParticleEventEmitter.instance = new ParticleEventEmitter();
    }
    return ParticleEventEmitter.instance;
  }
  
  public subscribe(callback: EventCallback): () => void {
    this.listeners.push(callback);
    
    // Return unsubscribe function
    return () => {
      this.listeners = this.listeners.filter(listener => listener !== callback);
    };
  }
  
  public emit(event: ParticleEvent): void {
    this.listeners.forEach(listener => listener(event));
  }
  
  public getNextParticleId(): number {
    return ++this.particleIdCounter;
  }
}

export default ParticleEventEmitter;
