
const testimonials = [
  {
    id: 1,
    name: "Alex K.",
    role: "SOL Trader",
    content: "The Sniper Bot has been a game-changer for my trading strategy. I'm consistently getting into positions before major moves.",
    image: "/testimonials/1.jfif",
  },
  {
    id: 2,
    name: "Sarah M.",
    role: "Crypto Fund Manager",
    content: "The AI-powered filtering has eliminated nearly all my false signals. My team is extremely impressed with the performance.",
    image: "/testimonials/2.jfif",
  },
  {
    id: 3,
    name: "Michael R.",
    role: "DeFi Developer",
    content: "The MEV protection built into these bots is truly cutting-edge. I've saved thousands in prevented frontrunning attacks.",
    image: "/testimonials/3.jfif",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="py-20 bg-gradient-to-b from-[purple]/10 to-[yellow]/20 relative overflow-hidden interactive-section animate-on-scroll z-10">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-glow-green to-purple-700">
            Client Testimonials
          </h2>
          <div className="h-1 w-200 bg-gradient-to-r from-glow-green to-warm-yellow mx-auto mb-8"></div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            See what our clients have to say about their experience with our trading bots.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className="glass-card p-6 hover:border-glow-green/80 transition-all duration-500 hover:transform hover:scale-105 animate-fade-in-up interactive-card"
              style={{
                animationDelay: `${0.2 * index}s`,
              }}
            >
              <div className="flex items-center mb-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover mr-4 ring-2 ring-glow-green/30"
                />
                <div>
                  <h4 className="font-medium text-white">{testimonial.name}</h4>
                  <p className="text-sm text-gray-400">{testimonial.role}</p>
                </div>
              </div>
              <div className="mb-3">
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className="text-warm-yellow animate-pulse"
                    style={{
                      animationDelay: `${0.1 * i}s`,
                    }}
                  >
                    ★
                  </span>
                ))}
              </div>
              <p className="text-gray-300 italic hover:text-glow-green">"{testimonial.content}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
