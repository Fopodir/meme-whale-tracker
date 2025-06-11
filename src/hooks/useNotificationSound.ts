
import { useState, useEffect, useRef } from 'react';
import { useToast } from '@/hooks/use-toast';

export const useNotificationSound = () => {
  const [soundEnabled, setSoundEnabled] = useState(false);
  const notificationSound = useRef<HTMLAudioElement | null>(null);
  const { toast } = useToast();

  // Initialize notification sound with better error handling
  useEffect(() => {
    const initializeSound = async () => {
      try {
        const audio = new Audio();
        
        // Set up event listeners for better error handling
        audio.addEventListener('error', (e) => {
          console.error('❌ Audio error:', e);
          setSoundEnabled(false);
        });

        audio.addEventListener('canplaythrough', () => {
          console.log('✅ Audio loaded successfully');
          setSoundEnabled(true);
        });

        // Try to load the sound file
        audio.src = '/notification.mp3';
        audio.load(); // Explicitly load the audio

        // Test if we can play the sound
        try {
          await audio.play();
          audio.pause();
          audio.currentTime = 0;
          notificationSound.current = audio;
          console.log('✅ Notification sound initialized and tested successfully');
        } catch (playError) {
          console.warn('⚠️ Could not play test sound:', playError);
          // Don't disable sound yet, as this might be due to browser autoplay policies
          setSoundEnabled(true);
        }
      } catch (error) {
        console.error('❌ Error initializing notification sound:', error);
        setSoundEnabled(false);
      }
    };

    initializeSound();

    // Cleanup
    return () => {
      if (notificationSound.current) {
        notificationSound.current.pause();
        notificationSound.current.src = '';
      }
    };
  }, []);

  // Play notification sound with improved error handling
  const playNotificationSound = async () => {
    if (!soundEnabled || !notificationSound.current) return;

    try {
      // Reset the audio to the beginning
      notificationSound.current.currentTime = 0;
      
      // Try to play the sound
      const playPromise = notificationSound.current.play();
      
      if (playPromise !== undefined) {
        await playPromise;
        console.log('🔔 Played notification sound successfully');
      }
    } catch (error) {
      console.warn('⚠️ Could not play notification sound:', error);
      // Only disable sound if it's a permanent error
      if (error instanceof Error && error.name === 'NotSupportedError') {
        setSoundEnabled(false);
        toast({
          title: "Sound Not Available",
          description: "Notification sounds are not supported in your browser.",
          duration: 3000,
        });
      }
    }
  };

  return { soundEnabled, playNotificationSound };
};
