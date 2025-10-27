import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Star, Calendar, Trophy, Award, Users, MessageCircle } from "lucide-react";

interface Trainer {
  id: string;
  name: string;
  title: string;
  specializations: string[];
  experience: string;
  certifications: string[];
  bio: string;
  rating: number;
  clients: number;
  testimonials: {
    name: string;
    text: string;
    rating: number;
  }[];
  image?: string;
}

const trainers: Trainer[] = [
  {
    id: "marco",
    name: "Marco Rossi",
    title: "Personal Trainer & Bodybuilding Coach",
    specializations: ["Bodybuilding", "Powerlifting", "Definizione"],
    experience: "8 anni",
    certifications: ["ISSA CPT", "Nutrizione Sportiva", "Powerlifting Coach"],
    bio: "Specializzato in aumento massa muscolare e definizione. Ha seguito oltre 200 clienti nel raggiungimento dei loro obiettivi di trasformazione fisica.",
    rating: 4.9,
    clients: 45,
    testimonials: [
      {
        name: "Alessandro M.",
        text: "Con Marco ho aumentato 12kg di massa muscolare in 8 mesi. Professionale e sempre disponibile!",
        rating: 5
      },
      {
        name: "Giulia T.", 
        text: "Grazie a Marco ho raggiunto la forma migliore della mia vita. Competente e motivante.",
        rating: 5
      }
    ]
  },
  {
    id: "sofia",
    name: "Sofia Martini",
    title: "Yoga & Pilates Instructor",
    specializations: ["Yoga", "Pilates", "Mindfulness", "Stretching"],
    experience: "6 anni",
    certifications: ["RYT 500", "Pilates Mat Certified", "Mindfulness Coach"],
    bio: "Insegnante certificata di Yoga e Pilates con focus su equilibrio corpo-mente. Specializzata in recupero posturale e gestione dello stress.",
    rating: 4.8,
    clients: 60,
    testimonials: [
      {
        name: "Maria L.",
        text: "Sofia mi ha aiutato a risolvere i miei problemi di mal di schiena. Le sue lezioni sono rigeneranti.",
        rating: 5
      }
    ]
  },
  {
    id: "andrea",
    name: "Andrea Verdi",
    title: "Spinning & HIIT Specialist",
    specializations: ["Spinning", "HIIT", "Cardio", "Resistance Training"],
    experience: "5 anni",
    certifications: ["Indoor Cycling Instructor", "HIIT Specialist", "CPR Certified"],
    bio: "Ex ciclista professionista, ora specializzato in allenamenti ad alta intensità. Le sue lezioni di spinning sono leggendarie per energia e risultati.",
    rating: 4.9,
    clients: 80,
    testimonials: [
      {
        name: "Roberto F.",
        text: "Le lezioni di Andrea sono intense ma divertenti. Ho perso 15kg in 6 mesi!",
        rating: 5
      }
    ]
  },
  {
    id: "laura",
    name: "Laura Bianchi",
    title: "Functional Training Coach",
    specializations: ["Functional Training", "GAG", "TRX", "Riabilitazione"],
    experience: "7 anni",
    certifications: ["Functional Movement Screen", "TRX Suspension Trainer", "Rehabilitation Specialist"],
    bio: "Laureata in Scienze Motorie, specializzata in allenamento funzionale e riabilitazione. Perfetta per chi vuole migliorare forza e mobilità.",
    rating: 4.7,
    clients: 35,
    testimonials: [
      {
        name: "Francesca P.",
        text: "Laura mi ha aiutato a recuperare dopo un infortunio. Ora sono più forte di prima!",
        rating: 5
      }
    ]
  },
  {
    id: "carmen",
    name: "Carmen Rodriguez",
    title: "Zumba & Dance Fitness Instructor",
    specializations: ["Zumba", "Dance Fitness", "Cardio Dance", "Latino"],
    experience: "4 anni",
    certifications: ["Zumba Instructor", "Dance Fitness Certified", "Latin Dance Specialist"],
    bio: "Ballerina professionista diventata istruttrice di fitness. Le sue lezioni sono un mix perfetto di divertimento e allenamento efficace.",
    rating: 4.8,
    clients: 90,
    testimonials: [
      {
        name: "Valentina S.",
        text: "Con Carmen allenarsi è puro divertimento! Non vedo l'ora della prossima lezione.",
        rating: 5
      }
    ]
  }
];

export const Trainers = () => {
  const [selectedTrainer, setSelectedTrainer] = useState<Trainer | null>(null);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < Math.floor(rating) ? "text-primary fill-current" : "text-muted-foreground"
        }`}
      />
    ));
  };

  const bookSession = (trainer: Trainer) => {
    alert(`Richiesta inviata per una sessione con ${trainer.name}! Ti contatteremo entro 24h.`);
    setSelectedTrainer(null);
  };

  return (
    <section id="trainer" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">
            I Nostri Trainer
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Team di istruttori certificati e appassionati, pronti a guidarti verso i tuoi obiettivi fitness.
          </p>
        </div>

        {/* Trainers Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {trainers.map((trainer) => (
            <div
              key={trainer.id}
              className="card-gradient rounded-xl p-6 border hover-lift transition-smooth cursor-pointer"
              onClick={() => setSelectedTrainer(trainer)}
            >
              {/* Avatar */}
              <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-12 h-12 text-primary" />
              </div>

              {/* Info */}
              <div className="text-center mb-4">
                <h3 className="text-xl font-bold text-secondary mb-1">{trainer.name}</h3>
                <p className="text-sm text-muted-foreground mb-3">{trainer.title}</p>
                
                {/* Rating */}
                <div className="flex items-center justify-center space-x-1 mb-3">
                  {renderStars(trainer.rating)}
                  <span className="text-sm text-muted-foreground ml-2">
                    {trainer.rating} ({trainer.clients} clienti)
                  </span>
                </div>

                {/* Experience */}
                <div className="flex items-center justify-center space-x-4 text-sm text-muted-foreground mb-4">
                  <div className="flex items-center">
                    <Award className="w-4 h-4 mr-1" />
                    {trainer.experience}
                  </div>
                  <div className="flex items-center">
                    <Trophy className="w-4 h-4 mr-1" />
                    {trainer.certifications.length} cert.
                  </div>
                </div>
              </div>

              {/* Specializations */}
              <div className="flex flex-wrap justify-center gap-2 mb-6">
                {trainer.specializations.slice(0, 3).map((spec, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {spec}
                  </Badge>
                ))}
                {trainer.specializations.length > 3 && (
                  <Badge variant="outline" className="text-xs">
                    +{trainer.specializations.length - 3}
                  </Badge>
                )}
              </div>

              {/* Actions */}
              <div className="space-y-2">
                <Button
                  size="sm"
                  className="w-full hero-gradient text-white"
                  onClick={(e) => {
                    e.stopPropagation();
                    bookSession(trainer);
                  }}
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  Prenota Seduta
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full"
                  onClick={() => setSelectedTrainer(trainer)}
                >
                  Vedi Profilo
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Trainer Detail Modal */}
        <Dialog open={!!selectedTrainer} onOpenChange={() => setSelectedTrainer(null)}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl">{selectedTrainer?.name}</h3>
                  <p className="text-sm text-muted-foreground">{selectedTrainer?.title}</p>
                </div>
              </DialogTitle>
            </DialogHeader>

            {selectedTrainer && (
              <div className="space-y-6">
                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="flex items-center justify-center space-x-1 mb-1">
                      {renderStars(selectedTrainer.rating)}
                    </div>
                    <p className="text-sm text-muted-foreground">Rating {selectedTrainer.rating}</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-primary">{selectedTrainer.clients}</p>
                    <p className="text-sm text-muted-foreground">Clienti Seguiti</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-primary">{selectedTrainer.experience}</p>
                    <p className="text-sm text-muted-foreground">Esperienza</p>
                  </div>
                </div>

                {/* Bio */}
                <div>
                  <h4 className="font-semibold mb-2">Bio</h4>
                  <p className="text-muted-foreground">{selectedTrainer.bio}</p>
                </div>

                {/* Specializations */}
                <div>
                  <h4 className="font-semibold mb-3">Specializzazioni</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedTrainer.specializations.map((spec, index) => (
                      <Badge key={index} className="bg-primary text-primary-foreground">
                        ✓ {spec}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Certifications */}
                <div>
                  <h4 className="font-semibold mb-3">Certificazioni</h4>
                  <div className="space-y-2">
                    {selectedTrainer.certifications.map((cert, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <Award className="w-4 h-4 text-accent" />
                        <span className="text-sm">{cert}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Testimonials */}
                <div>
                  <h4 className="font-semibold mb-3">Testimonianze</h4>
                  <div className="space-y-4">
                    {selectedTrainer.testimonials.map((testimonial, index) => (
                      <div key={index} className="bg-muted rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium text-sm">{testimonial.name}</span>
                          <div className="flex">
                            {renderStars(testimonial.rating)}
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground italic">
                          "{testimonial.text}"
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex space-x-3 pt-4">
                  <Button
                    className="flex-1 hero-gradient text-white"
                    onClick={() => bookSession(selectedTrainer)}
                  >
                    <Calendar className="w-4 h-4 mr-2" />
                    Prenota Seduta
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Contatta
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};