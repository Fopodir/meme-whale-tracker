
interface ContactHeroProps {
  title: string;
  subtitle: string;
}

export const ContactHero = ({ title, subtitle }: ContactHeroProps) => {
  return (
    <div className="text-center max-w-3xl mx-auto mb-16">
      <h1 className="text-4xl md:text-5xl font-bold mb-6">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-glow-green to-warm-yellow">
          {title}
        </span>
      </h1>
      <p className="text-xl text-gray-300">
        {subtitle}
      </p>
    </div>
  );
};
