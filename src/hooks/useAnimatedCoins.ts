
import { useState, useEffect } from 'react';

export const useAnimatedCoins = () => {
  const [orbitalAngles, setOrbitalAngles] = useState({
    sol: Math.random() * 360,
    eth: Math.random() * 360,
    btc: Math.random() * 360,
    bonk: Math.random() * 360,
    jto: Math.random() * 360,
  });

  const [wobble, setWobble] = useState({
    sol: { x: 0, y: 0, phase: Math.random() * Math.PI * 2 },
    eth: { x: 0, y: 0, phase: Math.random() * Math.PI * 2 },
    btc: { x: 0, y: 0, phase: Math.random() * Math.PI * 2 },
    bonk: { x: 0, y: 0, phase: Math.random() * Math.PI * 2 },
    jto: { x: 0, y: 0, phase: Math.random() * Math.PI * 2 },
  });

  useEffect(() => {
    const speeds = {
      sol: 0.8 + Math.random() * 0.01,
      eth: 0.3 + Math.random() * 0.01,
      btc: 1.6 + Math.random() * 0.03,
      bonk: 1.7 + Math.random() * 0.02,
      jto: 1.8 + Math.random() * 0.04,
    };

    const wobbleInterval = setInterval(() => {
      setWobble((prev) => ({
        sol: {
          x: Math.sin(prev.sol.phase) * 15,
          y: Math.cos(prev.sol.phase * 1.3) * 10,
          phase: prev.sol.phase + 0.02,
        },
        eth: {
          x: Math.sin(prev.eth.phase) * 12,
          y: Math.cos(prev.eth.phase * 0.8) * 18,
          phase: prev.eth.phase + 0.03,
        },
        btc: {
          x: Math.sin(prev.btc.phase) * 20,
          y: Math.cos(prev.btc.phase * 1.1) * 15,
          phase: prev.btc.phase + 0.015,
        },
        bonk: {
          x: Math.sin(prev.bonk.phase) * 18,
          y: Math.cos(prev.bonk.phase * 1.5) * 12,
          phase: prev.bonk.phase + 0.025,
        },
        jto: {
          x: Math.sin(prev.jto.phase) * 14,
          y: Math.cos(prev.jto.phase * 0.9) * 16,
          phase: prev.jto.phase + 0.035,
        },
      }));
    }, 50);

    const orbitInterval = setInterval(() => {
      setOrbitalAngles((prev) => ({
        sol: (prev.sol + speeds.sol) % 360,
        eth: (prev.eth + speeds.eth) % 360,
        btc: (prev.btc + speeds.btc) % 360,
        bonk: (prev.bonk + speeds.bonk) % 360,
        jto: (prev.jto + speeds.jto) % 360,
      }));
    }, 20);

    return () => {
      clearInterval(orbitInterval);
      clearInterval(wobbleInterval);
    };
  }, []);

  const getCoinPosition = (angle: number, wobbleX: number, wobbleY: number, radius: number = 300) => {
    const radian = (angle * Math.PI) / 180;
    return {
      x: Math.cos(radian) * radius + wobbleX,
      y: Math.sin(radian) * radius + wobbleY,
    };
  };

  return {
    orbitalAngles,
    wobble,
    getCoinPosition,
  };
};
