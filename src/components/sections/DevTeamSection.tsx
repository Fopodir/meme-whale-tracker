import { useState, useEffect } from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from "@/components/ui/carousel";

const teamMembers = [
  {
    id: 1,
    name: "Alex Rodriguez",
    role: "Team Leader",
    bio: "5+ years leading crypto projects and managing high-performance trading teams.",
    image: "/testimonials/1.jfif",
    specialty: "Leadership & Strategy"
  },
  {
    id: 2,
    name: "Sarah Chen",
    role: "Frontend Developer",
    bio: "Expert in React and modern web technologies, crafting intuitive trading interfaces.",
    image: "/testimonials/2.png",
    specialty: "UI/UX Development"
  },
  {
    id: 3,
    name: "Michael Kim",
    role: "Backend Developer",
    bio: "Specializes in high-performance APIs and real-time data processing systems.",
    image: "/testimonials/3.png",
    specialty: "System Architecture"
  },
  {
    id: 4,
    name: "David Martinez",
    role: "Blockchain Developer",
    bio: "Deep expertise in Solana, smart contracts, and DeFi protocol integration.",
    image: "/testimonials/4.jfif",
    specialty: "Blockchain & DeFi"
  },
  {
    id: 5,
    name: "Emma Thompson",
    role: "Trading Strategy Analytics",
    bio: "Data scientist focused on algorithmic trading strategies and market analysis.",
    image: "/testimonials/5.jfif",
    specialty: "Quantitative Analysis"
  },
  {
    id: 6,
    name: "James Wilson",
    role: "Senior Trader",
    bio: "15+ years of trading experience across traditional and crypto markets.",
    image: "/testimonials/6.jfif",
    specialty: "Market Expertise"
  },
];

export default function DevTeamSection() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  useEffect(() => {
    if (!api) {
      return;
    }

    const interval = setInterval(() => {
      api.scrollNext();
    }, 4000);

    return () => clearInterval(interval);
  }, [api]);

  return (
    <section className="py-20 bg-gradient-to-b from-[purple]/10 to-[yellow]/20 relative overflow-hidden interactive-section animate-on-scroll z-10">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-glow-green to-purple-700">
            Our Development Team
          </h2>
          <div className="h-1 w-200 bg-gradient-to-r from-glow-green to-warm-yellow mx-auto mb-8"></div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Meet the experts behind our cutting-edge trading bots and innovative solutions.
          </p>
        </div>

        <div className="relative max-w-6xl mx-auto">
          <Carousel
            setApi={setApi}
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {teamMembers.map((member, index) => (
                <CarouselItem key={member.id} className="pl-2 md:pl-4 md:basis-1/3">
                  <div
                    className="glass-card p-6 hover:border-glow-green/80 transition-all duration-500 hover:transform hover:scale-105 animate-fade-in-up interactive-card h-full"
                    style={{
                      animationDelay: `${0.2 * (index % 3)}s`,
                    }}
                  >
                    <div className="flex flex-col items-center text-center">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-20 h-20 rounded-full object-cover mb-4 ring-2 ring-glow-green/30"
                      />
                      <h4 className="font-semibold text-white text-lg mb-1">{member.name}</h4>
                      <p className="text-sm text-glow-green font-medium mb-2">{member.role}</p>
                      <div className="inline-block px-3 py-1 bg-glow-green/10 rounded-full mb-4">
                        <span className="text-xs text-warm-yellow">{member.specialty}</span>
                      </div>
                      <p className="text-gray-300 text-sm leading-relaxed hover:text-glow-green transition-colors duration-300">
                        {member.bio}
                      </p>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex -left-12 bg-glow-green/20 border-glow-green/30 hover:bg-glow-green/30 text-white" />
            <CarouselNext className="hidden md:flex -right-12 bg-glow-green/20 border-glow-green/30 hover:bg-glow-green/30 text-white" />
          </Carousel>
        </div>

        <div className="flex justify-center mt-8 space-x-2">
          {[...Array(Math.ceil(teamMembers.length / 3))].map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                Math.floor(current / 3) === index
                  ? 'bg-glow-green w-8'
                  : 'bg-gray-600 hover:bg-glow-green/50'
              }`}
              onClick={() => api?.scrollTo(index * 3)}
            />
          ))}
        </div>

        <div className="max-w-4xl mx-auto glass-card p-8 md:p-12 border border-glow-green/10 relative overflow-hidden hover:border-glow-green/30 transition-all duration-500 mt-12">
          <div className="absolute top-0 right-0 w-64 h-64 bg-glow-green/10 rounded-full blur-3xl animate-pulse-glow"></div>
          <div
            className="absolute bottom-0 left-0 w-64 h-64 bg-warm-yellow/10 rounded-full blur-3xl animate-pulse-glow"
            style={{
              animationDelay: "1.5s",
            }}
          ></div>
          <div className="relative z-10 text-center">
            <h3 className="text-2xl md:text-3xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-glow-green to-warm-yellow">
              Expert Team, Proven Results
            </h3>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Our diverse team combines years of experience in trading, blockchain development, and quantitative analysis to deliver cutting-edge solutions.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-glow-green mb-2">50+</div>
                <p className="text-gray-300">Combined Years Experience</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-warm-yellow mb-2">24/7</div>
                <p className="text-gray-300">Continuous Development</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-400 mb-2">100%</div>
                <p className="text-gray-300">Dedicated to Excellence</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
