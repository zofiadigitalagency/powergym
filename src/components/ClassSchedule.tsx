import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Clock, Users, User, Star, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";

interface ClassInfo {
  id: string;
  name: string;
  time: string;
  trainer: string;
  duration: number;
  level: "Principiante" | "Intermedio" | "Avanzato";
  spots: number;
  maxSpots: number;
  description: string;
  icon: string;
}

const schedule: Record<string, ClassInfo[]> = {
  Lunedì: [
    {
      id: "lun-9-yoga",
      name: "Yoga",
      time: "9:00",
      trainer: "Sofia Martini",
      duration: 60,
      level: "Principiante",
      spots: 12,
      maxSpots: 15,
      description: "Equilibrio corpo-mente attraverso posizioni e respirazione",
      icon: "🧘"
    },
    {
      id: "lun-10-pump",
      name: "Pump",
      time: "10:30",
      trainer: "Marco Rossi",
      duration: 45,
      level: "Intermedio",
      spots: 8,
      maxSpots: 12,
      description: "Allenamento con pesi e barre per tonificazione totale",
      icon: "💪"
    },
    {
      id: "lun-18-gag",
      name: "GAG",
      time: "18:00",
      trainer: "Laura Bianchi",
      duration: 50,
      level: "Intermedio",
      spots: 6,
      maxSpots: 15,
      description: "Gambe, Addominali, Glutei - Tonificazione mirata",
      icon: "🍑"
    },
    {
      id: "lun-19-spin",
      name: "Spinning",
      time: "19:30",
      trainer: "Andrea Verdi",
      duration: 45,
      level: "Avanzato",
      spots: 3,
      maxSpots: 20,
      description: "Allenamento intenso su bike stazionarie",
      icon: "🚴"
    },
  ],
  Martedì: [
    {
      id: "mar-9-spin",
      name: "Spinning",
      time: "9:00",
      trainer: "Andrea Verdi",
      duration: 45,
      level: "Intermedio",
      spots: 5,
      maxSpots: 20,
      description: "Allenamento intenso su bike stazionarie",
      icon: "🚴"
    },
    {
      id: "mar-10-pilates",
      name: "Pilates",
      time: "10:30",
      trainer: "Sofia Martini",
      duration: 55,
      level: "Principiante",
      spots: 10,
      maxSpots: 12,
      description: "Core strength e postura attraverso movimenti controllati",
      icon: "🧘‍♀️"
    },
    {
      id: "mar-18-zumba",
      name: "Zumba",
      time: "18:00",
      trainer: "Carmen Rodriguez",
      duration: 50,
      level: "Principiante",
      spots: 2,
      maxSpots: 25,
      description: "Fitness divertente a ritmo di musica latina",
      icon: "💃"
    },
    {
      id: "mar-19-crossfit",
      name: "CrossFit",
      time: "19:30",
      trainer: "Marco Rossi",
      duration: 60,
      level: "Avanzato",
      spots: 7,
      maxSpots: 15,
      description: "Allenamento funzionale ad alta intensità",
      icon: "🏋️"
    },
  ],
  // ... Altri giorni con struttura simile
};

const days = ["Lunedì", "Martedì", "Mercoledì", "Giovedì", "Venerdì", "Sabato", "Domenica"];

export const ClassSchedule = () => {
  const [selectedClass, setSelectedClass] = useState<ClassInfo | null>(null);
  const [selectedDay, setSelectedDay] = useState("Lunedì");

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Principiante":
        return "bg-accent text-accent-foreground";
      case "Intermedio":
        return "bg-primary text-primary-foreground";
      case "Avanzato":
        return "bg-destructive text-destructive-foreground";
      default:
        return "bg-muted";
    }
  };

  const getAvailabilityColor = (spots: number, maxSpots: number) => {
    const percentage = spots / maxSpots;
    if (percentage > 0.7) return "text-accent";
    if (percentage > 0.3) return "text-primary";
    return "text-destructive";
  };

  const bookClass = (classInfo: ClassInfo) => {
    // Simulazione prenotazione
    alert(`Prenotazione confermata per ${classInfo.name} ${selectedDay} alle ${classInfo.time}!`);
    setSelectedClass(null);
  };

  return (
    <section id="corsi" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">
            Corsi e Orari
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Oltre 30 corsi settimanali con istruttori qualificati. Prenota il tuo posto!
          </p>
        </div>

        {/* Day Selector */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {days.map((day) => (
            <Button
              key={day}
              variant={selectedDay === day ? "default" : "outline"}
              onClick={() => setSelectedDay(day)}
              className={cn(
                "transition-smooth",
                selectedDay === day && "hero-gradient text-white"
              )}
            >
              {day}
            </Button>
          ))}
        </div>

        {/* Schedule Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {schedule[selectedDay]?.map((classInfo) => (
            <div
              key={classInfo.id}
              className="card-gradient rounded-lg p-6 border hover-lift cursor-pointer transition-smooth"
              onClick={() => setSelectedClass(classInfo)}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{classInfo.icon}</span>
                  <div>
                    <h3 className="font-semibold text-lg">{classInfo.name}</h3>
                    <p className="text-sm text-muted-foreground">{classInfo.trainer}</p>
                  </div>
                </div>
                <Badge className={getLevelColor(classInfo.level)}>
                  {classInfo.level}
                </Badge>
              </div>

              <div className="flex items-center justify-between text-sm mb-4">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1 text-primary" />
                    {classInfo.time}
                  </div>
                  <div className="flex items-center">
                    <User className="w-4 h-4 mr-1 text-primary" />
                    {classInfo.duration} min
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Users className="w-4 h-4 mr-1" />
                  <span className={getAvailabilityColor(classInfo.spots, classInfo.maxSpots)}>
                    {classInfo.spots}/{classInfo.maxSpots} posti
                  </span>
                </div>
                <Button
                  size="sm"
                  className="hero-gradient text-white"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedClass(classInfo);
                  }}
                >
                  Prenota
                </Button>
              </div>
            </div>
          )) || (
            <div className="col-span-full text-center py-12">
              <p className="text-muted-foreground">Nessun corso programmato per {selectedDay}</p>
            </div>
          )}
        </div>

        {/* Class Detail Modal */}
        <Dialog open={!!selectedClass} onOpenChange={() => setSelectedClass(null)}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center space-x-2">
                <span className="text-2xl">{selectedClass?.icon}</span>
                <span>{selectedClass?.name}</span>
              </DialogTitle>
              <DialogDescription>
                {selectedDay} alle {selectedClass?.time}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              <p className="text-muted-foreground">{selectedClass?.description}</p>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Trainer</label>
                  <p className="font-semibold">{selectedClass?.trainer}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Durata</label>
                  <p className="font-semibold">{selectedClass?.duration} minuti</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Livello</label>
                  <Badge className={getLevelColor(selectedClass?.level || "")}>
                    {selectedClass?.level}
                  </Badge>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Disponibilità</label>
                  <p className={cn(
                    "font-semibold",
                    getAvailabilityColor(selectedClass?.spots || 0, selectedClass?.maxSpots || 1)
                  )}>
                    {selectedClass?.spots}/{selectedClass?.maxSpots} posti
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-2 pt-4">
                <Star className="w-4 h-4 text-primary" />
                <span className="text-sm text-muted-foreground">
                  Prenotazione gratuita • Cancellazione fino a 2h prima
                </span>
              </div>

              <Button
                className="w-full hero-gradient text-white font-semibold"
                onClick={() => selectedClass && bookClass(selectedClass)}
                disabled={selectedClass?.spots === 0}
              >
                <Calendar className="w-4 h-4 mr-2" />
                {selectedClass?.spots === 0 ? "Corso Completo" : "Prenota Posto"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};