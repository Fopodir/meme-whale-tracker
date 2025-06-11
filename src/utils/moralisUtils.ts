
import Moralis from 'moralis';

const MORALIS_API_KEY = import.meta.env.VITE_MORALIS_API_KEY;
let moralisInitialized = false;

// Initialize Moralis only once
export const initMoralis = async () => {
  if (!moralisInitialized && MORALIS_API_KEY) {
    try {
      await Moralis.start({
        apiKey: MORALIS_API_KEY,
      });
      moralisInitialized = true;
      // console.log('Moralis initialized successfully');
    } catch (error) {
      // console.warn('Failed to initialize Moralis:', error);
    }
  }
};

export const isMoralisInitialized = () => moralisInitialized;
export const getMoralisApiKey = () => MORALIS_API_KEY;
