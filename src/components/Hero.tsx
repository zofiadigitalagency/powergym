import { Button } from "@/components/ui/button";
import { PlayCircle, Users, Calendar, Trophy, Clock } from "lucide-react";
import heroImage from "@/assets/hero-gym.jpg";

interface HeroProps {
  onOpenFreeTrial: () => void;
}

export const Hero = ({ onOpenFreeTrial }: HeroProps) => {
  const stats = [
    { icon: Users, value: "500+", label: "Soci" },
    { icon: Users, value: "12", label: "Trainer" },
    { icon: Calendar, value: "30+", label: "Corsi" },
    { icon: Clock, value: "365", label: "Giorni l'anno" },
  ];

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="PowerGym Pescara - Modern Fitness Center"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-secondary/90 via-secondary/60 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="max-w-3xl">
          {/* Main Headline */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 slide-up">
            Trasforma Il Tuo{" "}
            <span className="text-transparent bg-clip-text hero-gradient">
              Corpo
            </span>
            , Trasforma La Tua{" "}
            <span className="text-transparent bg-clip-text hero-gradient">
              Vita
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-gray-200 mb-8 slide-up max-w-2xl">
            La palestra più completa di Pescara. Over 200 attrezzi, 30+ corsi, trainer certificati.
            Il tuo percorso di trasformazione inizia qui.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-12 slide-up">
            <Button
              onClick={onOpenFreeTrial}
              size="lg"
              className="hero-gradient text-white font-bold text-lg px-8 py-4 hover:opacity-90 transition-smooth pulse-glow"
            >
              <Trophy className="w-5 h-5 mr-2" />
              Prova Gratis 7 Giorni
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-secondary font-semibold text-lg px-8 py-4"
              onClick={() => document.getElementById('abbonamenti')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <PlayCircle className="w-5 h-5 mr-2" />
              Scopri Abbonamenti
            </Button>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 slide-up">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="text-center bg-white/10 backdrop-blur-sm rounded-lg p-4 hover-lift"
              >
                <stat.icon className="w-8 h-8 text-primary mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">{stat.value}</div>
                <div className="text-sm text-gray-200">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <div className="animate-bounce">
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  );
};