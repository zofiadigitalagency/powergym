import { Button } from "@/components/ui/button";
import { Dumbbell, MapPin, Phone, Mail, Clock, Star, Instagram, Facebook, Youtube } from "lucide-react";

export const Footer = () => {
  const services = [
    "🏋️ Sala pesi 500mq - 200+ attrezzi Technogym",
    "🏊 Piscina 25m - Corsi acqua",
    "💆 Area wellness - Sauna e bagno turco",
    "🥤 Bar proteico - Shakes e snack healthy",
    "🚿 Spogliatoi moderni - Docce e armadietti",
    "🅿️ Parcheggio gratuito - 50 posti",
    "📱 App mobile - Prenota e traccia workout",
    "👶 Baby parking - Per genitori"
  ];

  const hours = [
    { day: "Lun-Ven", time: "6:00 - 23:00" },
    { day: "Sabato", time: "8:00 - 20:00" },
    { day: "Domenica", time: "9:00 - 14:00" },
    { day: "Festivi", time: "Chiuso" }
  ];

  return (
    <footer className="bg-secondary text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="flex items-center justify-center w-10 h-10 hero-gradient rounded-lg">
                <Dumbbell className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold">PowerGym</h3>
                <p className="text-sm text-gray-400">Pescara</p>
              </div>
            </div>
            <p className="text-gray-300 text-sm">
              La palestra più completa di Pescara. Trasforma il tuo corpo, trasforma la tua vita.
            </p>
            <div className="flex items-center space-x-2">
              <Star className="w-4 h-4 text-primary fill-current" />
              <span className="text-sm">4.9/5 (450+ recensioni)</span>
            </div>
          </div>

          {/* Contact & Hours */}
          <div className="space-y-4">
            <h4 className="font-semibold text-lg">Contatti & Orari</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 text-primary mt-0.5" />
                <div>
                  <p>Via Roma 123</p>
                  <p>65121 Pescara (PE)</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-primary" />
                <span>+39 085 123 4567</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-primary" />
                <span>info@powergympescara.it</span>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-primary" />
                <span className="font-medium text-sm">Orari Apertura</span>
              </div>
              {hours.map((schedule, index) => (
                <div key={index} className="flex justify-between text-sm">
                  <span className="text-gray-300">{schedule.day}</span>
                  <span>{schedule.time}</span>
                </div>
              ))}
              <p className="text-xs text-primary font-medium">Aperta 365 giorni l'anno</p>
            </div>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h4 className="font-semibold text-lg">Servizi Struttura</h4>
            <div className="space-y-2">
              {services.map((service, index) => (
                <div key={index} className="text-sm text-gray-300 flex items-start">
                  <span className="mr-2">{service.split(' - ')[0]}</span>
                  <span>{service.split(' - ')[1]}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Social & CTA */}
          <div className="space-y-4">
            <h4 className="font-semibold text-lg">Seguici</h4>
            <div className="flex space-x-4">
              <Button size="sm" variant="outline" className="border-gray-600 text-gray-300 hover:bg-primary hover:text-white">
                <Instagram className="w-4 h-4" />
              </Button>
              <Button size="sm" variant="outline" className="border-gray-600 text-gray-300 hover:bg-primary hover:text-white">
                <Facebook className="w-4 h-4" />
              </Button>
              <Button size="sm" variant="outline" className="border-gray-600 text-gray-300 hover:bg-primary hover:text-white">
                <Youtube className="w-4 h-4" />
              </Button>
            </div>

            <div className="space-y-3">
              <p className="text-sm text-gray-300">
                Pronto per iniziare il tuo percorso?
              </p>
              <Button 
                className="w-full hero-gradient text-white"
                onClick={() => document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Prova Gratis 7 Giorni
              </Button>
            </div>

            <div className="text-xs text-gray-400 space-y-1">
              <p>📱 Scarica la nostra app</p>
              <p>🎯 Prenota corsi online</p>
              <p>📊 Traccia i tuoi progressi</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-gray-400">
              © 2024 PowerGym Pescara. Tutti i diritti riservati.
            </div>
            <div className="flex space-x-6 text-sm text-gray-400">
              <a href="#" className="hover:text-primary transition-smooth">Privacy Policy</a>
              <a href="#" className="hover:text-primary transition-smooth">Termini di Servizio</a>
              <a href="#" className="hover:text-primary transition-smooth">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};