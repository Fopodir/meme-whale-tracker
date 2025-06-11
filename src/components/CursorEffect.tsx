
import { useEffect, useRef } from "react";

export default function CursorEffect() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorLargeRef = useRef<HTMLDivElement>(null);
  const cursorTrailRef = useRef<HTMLDivElement[]>([]);
  const cursorDollarRef = useRef<HTMLDivElement>(null); // Dollar sign element
  const sniperMarkRef = useRef<HTMLDivElement>(null); // New sniper mark element
  const requestRef = useRef<number>(0);
  const mousePos = useRef({ x: -100, y: -100 });
  const cursorPos = useRef({ x: -100, y: -100 });
  const cursorLargePos = useRef({ x: 0, y: 0 });
  const sniperPos = useRef({ x: 0, y: 0 }); // Position for sniper mark
  const speed = 0.25; // Lower value = smoother movement
  const largeSpeed = 0.05; // Even slower for the large blob
  const sniperSpeed = 0.09; // Super slow for the sniper mark
  const trailLength = 5; // Number of trail elements
  const isOverButtonRef = useRef<boolean>(false); // Track if cursor is over a button
  const isOverModalRef = useRef<boolean>(false); // Track if cursor is over a modal
  
  useEffect(() => {
    // Create cursor trail elements
    if (cursorTrailRef.current.length === 0) {
      for (let i = 0; i < trailLength; i++) {
        const trailElement = document.createElement('div');
        trailElement.className = 'fixed w-3 h-3 rounded-full pointer-events-none mix-blend-screen';
        trailElement.style.opacity = `${0.6 - (i * 0.1)}`;
        trailElement.style.transform = 'translate3d(-100px, -100px, 0)';
        trailElement.style.backgroundColor = `rgba(47, 249, 128, ${0.4 - (i * 0.05)})`;
        trailElement.style.filter = 'blur(2px)';
        trailElement.style.zIndex = '9999'; // Ensure trail is on top
        document.body.appendChild(trailElement);
        cursorTrailRef.current.push(trailElement);
      }
    }
    
    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      
      // Check if the cursor is over a button or link
      const targetElement = e.target as HTMLElement;
      isOverButtonRef.current = targetElement.tagName === 'BUTTON' || 
                               targetElement.closest('button') !== null ||
                               targetElement.classList.contains('interactive-button') ||
                               targetElement.tagName === 'A' ||
                               targetElement.closest('a') !== null;

      // Check if cursor is over modal content
      isOverModalRef.current = targetElement.closest('[role="dialog"]') !== null ||
                              targetElement.closest('.modal') !== null ||
                              targetElement.closest('[data-radix-portal]') !== null;
    };

    window.addEventListener("mousemove", handleMouseMove);
    
    // Store previous positions for trail effect
    const trailPositions = Array(trailLength).fill({ x: -100, y: -100 });
    
    const animateCursor = () => {
      if (cursorRef.current && cursorLargeRef.current && cursorDollarRef.current && sniperMarkRef.current) {
        // Calculate the distance between current cursor position and mouse
        const dx = mousePos.current.x - cursorPos.current.x;
        const dy = mousePos.current.y - cursorPos.current.y;
        
        // Update cursor position with easing
        cursorPos.current.x += dx * speed;
        cursorPos.current.y += dy * speed;
        
        // Update large cursor with even more smoothing
        const dxLarge = mousePos.current.x - cursorLargePos.current.x;
        const dyLarge = mousePos.current.y - cursorLargePos.current.y;
        cursorLargePos.current.x += dxLarge * largeSpeed;
        cursorLargePos.current.y += dyLarge * largeSpeed;
        
        // Update sniper mark position with extremely smooth motion
        const dxSniper = cursorDollarRef.current.getBoundingClientRect().left + 15 - sniperPos.current.x;
        const dySniper = cursorDollarRef.current.getBoundingClientRect().top + 15 - sniperPos.current.y;
        sniperPos.current.x += dxSniper * sniperSpeed;
        sniperPos.current.y += dySniper * sniperSpeed;
        
        // Enhanced visibility when over modal
        const modalBoost = isOverModalRef.current ? 1 : 1;
        const cursorOpacity = isOverModalRef.current ? 0.6 : 0.6;
        const dollarOpacity = isOverModalRef.current ? 0.7 : 0.7;
        
        // Apply transformation to both cursors
        cursorRef.current.style.transform = `translate3d(${cursorPos.current.x}px, ${cursorPos.current.y}px, 0) scale(${modalBoost})`;
        cursorRef.current.style.opacity = cursorOpacity.toString();
        
        cursorLargeRef.current.style.transform = `translate3d(${cursorLargePos.current.x - 32}px, ${cursorLargePos.current.y - 32}px, 0)`;
        
        // Position the dollar sign cursor with enhanced visibility over modal
        cursorDollarRef.current.style.transform = `translate3d(${mousePos.current.x - 15}px, ${mousePos.current.y - 20}px, 0) scale(${modalBoost})`;
        cursorDollarRef.current.style.opacity = dollarOpacity.toString();
        
        // Position the sniper mark to follow the dollar sign
        sniperMarkRef.current.style.transform = `translate3d(${sniperPos.current.x - 40}px, ${sniperPos.current.y - 40}px, 0) scale(${modalBoost})`;
        sniperMarkRef.current.style.opacity = dollarOpacity.toString();
        
        // Update trail positions
        trailPositions.unshift({ 
          x: cursorPos.current.x, 
          y: cursorPos.current.y 
        });
        trailPositions.pop();
        
        // Apply trail positions with staggered delay and enhanced visibility over modal
        cursorTrailRef.current.forEach((trail, index) => {
          if (index < trailPositions.length) {
            const trailScale = modalBoost * (1 - index * 0.15);
            const trailOpacity = (isOverModalRef.current ? 0.8 : 0.6) - (index * 0.1);
            trail.style.transform = `translate3d(${trailPositions[index].x}px, ${trailPositions[index].y}px, 0) scale(${trailScale})`;
            trail.style.opacity = trailOpacity.toString();
          }
        });
        
        // Change color based on if hovering over button or modal
        const hue = isOverButtonRef.current 
          ? 210 // Blue hue when over buttons
          : isOverModalRef.current
          ? 180 // Cyan hue when over modal
          : (mousePos.current.x / window.innerWidth) * 60 + 100; // range from 100 to 160 (greens to blues)
          
        cursorRef.current.style.backgroundColor = isOverButtonRef.current 
          ? `hsla(210, 100%, 60%, ${cursorOpacity})` 
          : isOverModalRef.current
          ? `hsla(180, 100%, 60%, ${cursorOpacity})`
          : `hsla(${hue}, 95%, 60%, ${cursorOpacity})`;
        
        // Update large cursor color based on button/modal hover state
        cursorLargeRef.current.style.backgroundColor = isOverButtonRef.current
          ? 'hsla(210, 100%, 60%, 0.2)' // Blue tint when over buttons
          : isOverModalRef.current
          ? 'hsla(180, 100%, 60%, 0.3)' // Enhanced cyan tint when over modal
          : `hsla(${hue}, 95%, 60%, 0.2)`; // Dynamic color based on position
        
        // Add subtle pulse effect to large cursor with modal enhancement
        const scale = (0.95 + Math.sin(Date.now() / 1000) * 0.05) * (isOverModalRef.current ? 1.1 : 1);
        cursorLargeRef.current.style.transform = `translate3d(${cursorLargePos.current.x - 32}px, ${cursorLargePos.current.y - 32}px, 0) scale(${scale})`;
      }
      
      requestRef.current = requestAnimationFrame(animateCursor);
    };
    
    requestRef.current = requestAnimationFrame(animateCursor);
    
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(requestRef.current);
      
      // Clean up trail elements
      cursorTrailRef.current.forEach(trail => {
        if (trail.parentNode) {
          trail.parentNode.removeChild(trail);
        }
      });
      cursorTrailRef.current = [];
    };
  }, []);
  
  return (
    <>
      <div 
        ref={cursorRef} 
        className="fixed w-6 h-6 rounded-full bg-glow-green/30 filter blur-sm pointer-events-none mix-blend-screen transition-colors duration-300"
        style={{ 
          transform: "translate3d(-100px, -100px, 0)",
          zIndex: 9999
        }}
      />
      <div 
        ref={cursorLargeRef}
        className="hidden md:block fixed w-64 h-64 rounded-full bg-gradient-to-r from-glow-green/50 via-warm-yellow/50 to-purple-500/30 filter blur-3xl pointer-events-none animate-pulse-glow transition-all duration-300"
        style={{ 
          transform: "translate3d(-100px, -100px, 0)",
          zIndex: 9998
        }}
      />
      
      {/* Dollar sign cursor */}
      <div
        ref={cursorDollarRef}
        className="fixed w-12 h-12 pointer-events-none"
        style={{ 
          transform: "translate3d(-100px, -100px, 0)",
          zIndex: 10000
        }}
      >
        <div className="relative w-full h-full flex items-center justify-center">
          <div className={`absolute inset-0 bg-warm-yellow/20 rounded-full filter blur-md`}></div>
          <div className={`text-2xl font-bold text-warm-yellow drop-shadow-lg`}>$</div>
          <div className={`absolute inset-0 border border-warm-yellow/30 rounded-full animate-ping opacity-70`}></div>
        </div>
      </div>
      
      {/* Sniper mark following the dollar sign */}
      <div
        ref={sniperMarkRef}
        className="fixed w-100 h-100 pointer-events-none"
        style={{ 
          transform: "translate3d(-100px, -100px, 0)",
          zIndex: 9999
        }}
      >
        <div className="relative w-full h-full">
          {/* Outer circle */}
          <div className="absolute w-[100px] h-[100px] border-2 border-warm-yellow/60 rounded-full opacity-40 animate-pulse-slow drop-shadow-lg"></div>
          
          {/* Crosshair lines */}
          <div className="absolute top-[50px] left-[60px] w-[50px] h-[1px] bg-warm-yellow/90 drop-shadow-sm"></div>
          <div className="absolute top-[50px] left-[-10px] w-[50px] h-[1px] bg-warm-yellow/90 drop-shadow-sm"></div>
          <div className="absolute top-[-10px] left-[50px] w-[1px] h-[50px] bg-warm-yellow/90 drop-shadow-sm"></div>
          <div className="absolute top-[60px] left-[50px] w-[1px] h-[50px] bg-warm-yellow/90 drop-shadow-sm"></div>
          
          {/* Corner brackets */}
          <div className="absolute top-[70px] left-[70px] w-[10px] h-[1px] bg-warm-yellow/50"></div>
          <div className="absolute top-[70px] left-[70px] w-[1px] h-[10px] bg-warm-yellow/50"></div>
          
          <div className="absolute top-[70px] right-[-30px] w-[10px] h-[1px] bg-warm-yellow/50"></div>
          <div className="absolute top-[70px] right-[-30px] w-[1px] h-[10px] bg-warm-yellow/50"></div>
          
          <div className="absolute bottom-[-30px] left-[70px] w-[10px] h-[1px] bg-warm-yellow/50"></div>
          <div className="absolute bottom-[-30px] left-[70px] w-[1px] h-[10px] bg-warm-yellow/50"></div>
          
          <div className="absolute bottom-[-30px] right-[-30px] w-[10px] h-[1px] bg-warm-yellow/50"></div>
          <div className="absolute bottom-[-30px] right-[-30px] w-[1px] h-[10px] bg-warm-yellow/50"></div>
          
          {/* Inner circle */}
          <div className="absolute top-[35px] left-[35px] w-[30px] h-[30px] border border-warm-yellow/80 rounded-full animate-pulse drop-shadow-sm"></div>
        </div>
      </div>
    </>
  );
}
