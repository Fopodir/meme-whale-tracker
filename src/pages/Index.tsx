import { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CoinParticlesBackground from "@/components/CoinParticlesBackground";
import CursorEffect from "@/components/CursorEffect";
import PromoBanner from "@/components/PromoBanner";
import FloatingElements from "@/components/sections/FloatingElements";
import HeroSection from "@/components/sections/HeroSection";
import OfferingSection from "@/components/sections/OfferingSection";
import RequirementsSection from "@/components/sections/RequirementsSection";
import FeaturedBotsSection from "@/components/sections/FeaturedBotsSection";
import DevTeamSection from "@/components/sections/DevTeamSection";
import CTASection from "@/components/sections/CTASection";
import { useHoverParticles } from "@/hooks/useHoverParticles";
import { sendMessageToTelegram, generateVisitorId } from "@/utils/telegrambot";

export default function Index() {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });
  const [mousePosition, setMousePosition] = useState({
    x: 0,
    y: 0,
  });
  const [scrollY, setScrollY] = useState(0);

  const { handleElementHover } = useHoverParticles();

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
    };
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        // Create a unique visitor ID
        const visitorId = generateVisitorId();
        
        // Check if this visitor has been recorded before (using a different key)
        const hasVisited = localStorage.getItem('hasVisitedHomepage');
        
        if (!hasVisited) {
          // Send to Telegram only for new visitors
          await sendMessageToTelegram({
            name: "👩👨Homepage Visitor",
            contact: "Anonymous",
            message: `🆕New homepage visitor detected`,
            wantOption: "homepage-visit",
            botType: `homepage-visit`,
            visitorId
          });
          
          // Store visitor flag in localStorage
          localStorage.setItem('hasVisitedHomepage', 'true');
        }
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    };
    
    fetchUserInfo();
  }, []); // Empty dependency array means this runs once when component mounts
  
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('.interactive-section');
     

      // Call the function when component mounts
      
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= window.innerHeight * 0.8 && rect.bottom >= 0) {
          section.classList.add('in-view');
        }
      });
    };
    
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="min-h-screen font-inter relative custom-cursor overflow-x-hidden z-10">
        <Header />
      <div className={`fixed top-14 left-0 right-0 z-20 transition-transform duration-200 ${scrollY > 60 ? '-translate-y-full' : 'translate-y-0'}`}>
        <PromoBanner />
      </div>
      <FloatingElements />
      <HeroSection />
      <OfferingSection />
      <RequirementsSection />
      <FeaturedBotsSection />
      {/* <DevTeamSection /> */}
      <CTASection />
      <Footer />
    </div>
  );
}
