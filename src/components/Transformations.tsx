import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Calendar, TrendingDown, TrendingUp, Zap, Quote } from "lucide-react";
import { cn } from "@/lib/utils";

interface Transformation {
  id: string;
  name: string;
  age: number;
  timeline: string;
  startWeight: number;
  endWeight: number;
  bodyFatLoss: number;
  goal: string;
  testimonial: string;
  beforeImage?: string;
  afterImage?: string;
}

const transformations: Transformation[] = [
  {
    id: "1",
    name: "Alessandro M.",
    age: 32,
    timeline: "6 mesi",
    startWeight: 85,
    endWeight: 78,
    bodyFatLoss: 12,
    goal: "Definizione",
    testimonial: "PowerGym mi ha cambiato la vita. Non solo ho perso peso, ma ho guadagnato fiducia e energia. I trainer sono fantastici!",
  },
  {
    id: "2",
    name: "Giulia T.",
    age: 28,
    timeline: "8 mesi",
    startWeight: 70,
    endWeight: 65,
    bodyFatLoss: 15,
    goal: "Tonificazione",
    testimonial: "Risultati incredibili! Finalmente ho il corpo che ho sempre sognato. L'ambiente è motivante e professionale.",
  },
  {
    id: "3",
    name: "Marco R.",
    age: 35,
    timeline: "10 mesi",
    startWeight: 95,
    endWeight: 82,
    bodyFatLoss: 18,
    goal: "Perdita peso",
    testimonial: "Ho perso 13kg e guadagnato una nuova vita. Il supporto del team è stato fondamentale per il mio successo.",
  },
  {
    id: "4",
    name: "Sofia L.",
    age: 26,
    timeline: "4 mesi",
    startWeight: 58,
    endWeight: 62,
    bodyFatLoss: 8,
    goal: "Massa muscolare",
    testimonial: "Volevo aumentare la massa muscolare e ci sono riuscita! Mi sento più forte e in forma che mai.",
  },
  {
    id: "5",
    name: "Roberto F.",
    age: 41,
    timeline: "12 mesi",
    startWeight: 102,
    endWeight: 85,
    bodyFatLoss: 22,
    goal: "Trasformazione completa",
    testimonial: "Una trasformazione che va oltre il fisico. Ho ritrovato energia, salute e autostima. Grazie PowerGym!",
  },
  {
    id: "6",
    name: "Elena B.",
    age: 29,
    timeline: "7 mesi",
    startWeight: 68,
    endWeight: 61,
    bodyFatLoss: 14,
    goal: "Definizione",
    testimonial: "Risultati che superano le aspettative. L'approccio scientifico e personalizzato fa la differenza.",
  },
];

export const Transformations = () => {
  const [selectedTransformation, setSelectedTransformation] = useState<Transformation | null>(null);

  const getGoalColor = (goal: string) => {
    switch (goal.toLowerCase()) {
      case "definizione":
        return "bg-primary text-primary-foreground";
      case "tonificazione":
        return "bg-accent text-accent-foreground";
      case "perdita peso":
        return "bg-destructive text-destructive-foreground";
      case "massa muscolare":
        return "bg-secondary text-secondary-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <section id="trasformazioni" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">
            Storie di Trasformazione
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Scopri le incredibili trasformazioni dei nostri membri. Questi risultati reali dimostrano cosa puoi raggiungere con dedizione e il nostro supporto.
          </p>
        </div>

        {/* Transformations Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {transformations.map((transformation) => (
            <div
              key={transformation.id}
              className="card-gradient rounded-xl border hover-lift transition-smooth cursor-pointer overflow-hidden"
              onClick={() => setSelectedTransformation(transformation)}
            >
              {/* Before/After Placeholder */}
              <div className="relative h-48 bg-gradient-to-r from-muted to-muted/60 flex items-center justify-center">
                <div className="text-center">
                  <div className="flex items-center justify-center space-x-4 mb-2">
                    <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center">
                      <span className="text-sm font-bold text-primary">PRIMA</span>
                    </div>
                    <ArrowRight className="w-6 h-6 text-muted-foreground" />
                    <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center">
                      <span className="text-sm font-bold text-accent">DOPO</span>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Clicca per vedere la trasformazione
                  </p>
                </div>
              </div>

              <div className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-secondary">
                      {transformation.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {transformation.age} anni
                    </p>
                  </div>
                  <Badge className={getGoalColor(transformation.goal)}>
                    {transformation.goal}
                  </Badge>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-1">
                      <Calendar className="w-4 h-4 text-primary mr-1" />
                    </div>
                    <p className="text-sm font-bold">{transformation.timeline}</p>
                    <p className="text-xs text-muted-foreground">Durata</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-1">
                      {transformation.endWeight > transformation.startWeight ? (
                        <TrendingUp className="w-4 h-4 text-accent mr-1" />
                      ) : (
                        <TrendingDown className="w-4 h-4 text-accent mr-1" />
                      )}
                    </div>
                    <p className="text-sm font-bold">
                      {Math.abs(transformation.endWeight - transformation.startWeight)}kg
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {transformation.endWeight > transformation.startWeight ? "Guadagnati" : "Persi"}
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-1">
                      <Zap className="w-4 h-4 text-destructive mr-1" />
                    </div>
                    <p className="text-sm font-bold">-{transformation.bodyFatLoss}%</p>
                    <p className="text-xs text-muted-foreground">Grasso</p>
                  </div>
                </div>

                {/* Weight Progress */}
                <div className="bg-muted rounded-lg p-3 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">
                      {transformation.startWeight}kg
                    </span>
                    <ArrowRight className="w-4 h-4 text-primary" />
                    <span className="font-bold text-primary">
                      {transformation.endWeight}kg
                    </span>
                  </div>
                </div>

                {/* Testimonial Preview */}
                <div className="relative">
                  <Quote className="w-4 h-4 text-primary mb-2" />
                  <p className="text-sm text-muted-foreground italic line-clamp-3">
                    {transformation.testimonial}
                  </p>
                </div>

                {/* CTA */}
                <Button className="w-full mt-4 hero-gradient text-white text-sm">
                  Leggi Storia Completa
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Success CTA */}
        <div className="text-center mt-16">
          <div className="max-w-2xl mx-auto card-gradient rounded-xl p-8 border">
            <h3 className="text-2xl font-bold text-secondary mb-4">
              Inizia la Tua Trasformazione
            </h3>
            <p className="text-muted-foreground mb-6">
              Unisciti ai nostri membri che hanno già raggiunto i loro obiettivi. 
              Il tuo percorso di trasformazione inizia con un solo passo.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                className="hero-gradient text-white font-semibold"
                onClick={() => document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Prova Gratuita 7 Giorni
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => document.getElementById('abbonamenti')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Vedi Abbonamenti
              </Button>
            </div>
          </div>
        </div>

        {/* Transformation Detail Modal */}
        {selectedTransformation && (
          <div 
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedTransformation(null)}
          >
            <div 
              className="card-gradient rounded-xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-secondary mb-2">
                  Trasformazione di {selectedTransformation.name}
                </h3>
                <Badge className={getGoalColor(selectedTransformation.goal)}>
                  {selectedTransformation.goal}
                </Badge>
              </div>

              {/* Before/After Visual */}
              <div className="bg-muted rounded-lg p-6 mb-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="w-32 h-32 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="font-bold text-primary">PRIMA</span>
                    </div>
                    <p className="text-xl font-bold">{selectedTransformation.startWeight}kg</p>
                    <p className="text-sm text-muted-foreground">Peso iniziale</p>
                  </div>
                  <div className="text-center">
                    <div className="w-32 h-32 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="font-bold text-accent">DOPO</span>
                    </div>
                    <p className="text-xl font-bold">{selectedTransformation.endWeight}kg</p>
                    <p className="text-sm text-muted-foreground">Peso finale</p>
                  </div>
                </div>
              </div>

              {/* Detailed Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="text-center bg-muted rounded-lg p-4">
                  <Calendar className="w-6 h-6 text-primary mx-auto mb-2" />
                  <p className="font-bold">{selectedTransformation.timeline}</p>
                  <p className="text-xs text-muted-foreground">Timeline</p>
                </div>
                <div className="text-center bg-muted rounded-lg p-4">
                  {selectedTransformation.endWeight > selectedTransformation.startWeight ? (
                    <TrendingUp className="w-6 h-6 text-accent mx-auto mb-2" />
                  ) : (
                    <TrendingDown className="w-6 h-6 text-accent mx-auto mb-2" />
                  )}
                  <p className="font-bold">
                    {Math.abs(selectedTransformation.endWeight - selectedTransformation.startWeight)}kg
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {selectedTransformation.endWeight > selectedTransformation.startWeight ? "Guadagnati" : "Persi"}
                  </p>
                </div>
                <div className="text-center bg-muted rounded-lg p-4">
                  <Zap className="w-6 h-6 text-destructive mx-auto mb-2" />
                  <p className="font-bold">-{selectedTransformation.bodyFatLoss}%</p>
                  <p className="text-xs text-muted-foreground">Grasso corporeo</p>
                </div>
                <div className="text-center bg-muted rounded-lg p-4">
                  <span className="text-2xl mb-2 block">🎯</span>
                  <p className="font-bold">{selectedTransformation.age}</p>
                  <p className="text-xs text-muted-foreground">Anni</p>
                </div>
              </div>

              {/* Full Testimonial */}
              <div className="bg-primary/5 rounded-lg p-6 mb-6">
                <Quote className="w-6 h-6 text-primary mb-3" />
                <p className="text-muted-foreground italic text-lg leading-relaxed">
                  "{selectedTransformation.testimonial}"
                </p>
                <p className="text-right text-sm font-semibold text-primary mt-4">
                  - {selectedTransformation.name}
                </p>
              </div>

              <div className="flex space-x-3">
                <Button 
                  className="flex-1 hero-gradient text-white"
                  onClick={() => {
                    setSelectedTransformation(null);
                    document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  Inizia la Tua Trasformazione
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setSelectedTransformation(null)}
                >
                  Chiudi
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};