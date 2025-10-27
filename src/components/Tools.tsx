import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calculator, Target, TrendingUp, Calendar, User, Weight } from "lucide-react";

interface BMIResult {
  bmi: number;
  category: string;
  description: string;
  recommendations: string[];
}

interface GoalPlan {
  membership: string;
  classes: string[];
  frequency: string;
  trainer: string;
  duration: string;
}

export const Tools = () => {
  const [bmiData, setBmiData] = useState({ weight: "", height: "" });
  const [bmiResult, setBmiResult] = useState<BMIResult | null>(null);
  
  const [goalData, setGoalData] = useState({
    goal: "",
    currentWeight: "",
    targetWeight: "",
    timeline: ""
  });
  const [goalPlan, setGoalPlan] = useState<GoalPlan | null>(null);

  const calculateBMI = () => {
    const weight = parseFloat(bmiData.weight);
    const height = parseFloat(bmiData.height) / 100; // cm to m
    
    if (!weight || !height) return;
    
    const bmi = weight / (height * height);
    let category = "";
    let description = "";
    let recommendations: string[] = [];
    
    if (bmi < 18.5) {
      category = "Sottopeso";
      description = "Il tuo BMI indica che sei sottopeso";
      recommendations = [
        "Considera l'abbonamento TRIMESTRALE con Personal Training",
        "Focus su allenamenti di forza per massa muscolare",
        "Consulta i nostri trainer per un piano nutrizionale"
      ];
    } else if (bmi < 25) {
      category = "Normopeso";
      description = "Il tuo BMI è nella norma, ottimo!";
      recommendations = [
        "Abbonamento MENSILE perfetto per mantenere la forma",
        "Varia tra cardio e tonificazione",
        "Prova i nostri corsi di gruppo"
      ];
    } else if (bmi < 30) {
      category = "Sovrappeso";
      description = "Il tuo BMI indica sovrappeso leggero";
      recommendations = [
        "Abbonamento TRIMESTRALE con corsi illimitati",
        "Focus su cardio e functional training",
        "Considera il Personal Training per risultati mirati"
      ];
    } else {
      category = "Obesità";
      description = "Il tuo BMI indica obesità, iniziamo insieme!";
      recommendations = [
        "Abbonamento ANNUALE con 3 sedute PT gratuite",
        "Approccio graduale con supporto professionale",
        "Piano alimentare personalizzato incluso"
      ];
    }
    
    setBmiResult({ bmi, category, description, recommendations });
  };

  const generateGoalPlan = () => {
    if (!goalData.goal || !goalData.currentWeight || !goalData.targetWeight || !goalData.timeline) return;
    
    const plans: Record<string, GoalPlan> = {
      "perdere-peso": {
        membership: "TRIMESTRALE",
        classes: ["HIIT", "Spinning", "Zumba", "GAG"],
        frequency: "4-5 volte a settimana",
        trainer: "Andrea Verdi (Cardio Specialist)",
        duration: goalData.timeline
      },
      "massa-muscolare": {
        membership: "ANNUALE",
        classes: ["Pump", "CrossFit", "Functional Training"],
        frequency: "4-6 volte a settimana",
        trainer: "Marco Rossi (Bodybuilding Coach)",
        duration: goalData.timeline
      },
      "tonificare": {
        membership: "TRIMESTRALE",
        classes: ["Pilates", "GAG", "TRX", "Yoga"],
        frequency: "3-4 volte a settimana",
        trainer: "Laura Bianchi (Functional Coach)",
        duration: goalData.timeline
      },
      "resistenza": {
        membership: "MENSILE",
        classes: ["Spinning", "HIIT", "Bootcamp", "Acquagym"],
        frequency: "3-5 volte a settimana",
        trainer: "Andrea Verdi (Cardio Specialist)",
        duration: goalData.timeline
      }
    };
    
    setGoalPlan(plans[goalData.goal] || plans["tonificare"]);
  };

  const getBMIColor = (category: string) => {
    switch (category) {
      case "Sottopeso": return "text-blue-600";
      case "Normopeso": return "text-accent";
      case "Sovrappeso": return "text-primary";
      case "Obesità": return "text-destructive";
      default: return "text-muted-foreground";
    }
  };

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">
            Strumenti Fitness
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Calcola il tuo BMI e ricevi un piano personalizzato per raggiungere i tuoi obiettivi fitness.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* BMI Calculator */}
          <Card className="card-gradient border">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calculator className="w-6 h-6 text-primary" />
                <span>Calcolatore BMI</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="weight">Peso (kg)</Label>
                  <Input
                    id="weight"
                    type="number"
                    placeholder="70"
                    value={bmiData.weight}
                    onChange={(e) => setBmiData({...bmiData, weight: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="height">Altezza (cm)</Label>
                  <Input
                    id="height"
                    type="number"
                    placeholder="175"
                    value={bmiData.height}
                    onChange={(e) => setBmiData({...bmiData, height: e.target.value})}
                  />
                </div>
              </div>

              <Button 
                onClick={calculateBMI}
                className="w-full hero-gradient text-white"
                disabled={!bmiData.weight || !bmiData.height}
              >
                <Calculator className="w-4 h-4 mr-2" />
                Calcola BMI
              </Button>

              {bmiResult && (
                <div className="space-y-4 p-4 bg-muted rounded-lg">
                  <div className="text-center">
                    <p className="text-3xl font-bold text-primary mb-1">
                      {bmiResult.bmi.toFixed(1)}
                    </p>
                    <Badge className={getBMIColor(bmiResult.category)}>
                      {bmiResult.category}
                    </Badge>
                    <p className="text-sm text-muted-foreground mt-2">
                      {bmiResult.description}
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2 flex items-center">
                      <Target className="w-4 h-4 mr-2 text-primary" />
                      Raccomandazioni
                    </h4>
                    <ul className="space-y-1">
                      {bmiResult.recommendations.map((rec, index) => (
                        <li key={index} className="text-sm text-muted-foreground flex items-start">
                          <span className="text-primary mr-2">•</span>
                          {rec}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Button 
                    size="sm" 
                    className="w-full"
                    onClick={() => document.getElementById('abbonamenti')?.scrollIntoView({ behavior: 'smooth' })}
                  >
                    Vedi Abbonamenti Consigliati
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Goal Planner */}
          <Card className="card-gradient border">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Target className="w-6 h-6 text-primary" />
                <span>Pianificatore Obiettivi</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label>Obiettivo Principale</Label>
                <Select value={goalData.goal} onValueChange={(value) => setGoalData({...goalData, goal: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleziona obiettivo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="perdere-peso">Perdere peso</SelectItem>
                    <SelectItem value="massa-muscolare">Aumentare massa muscolare</SelectItem>
                    <SelectItem value="tonificare">Tonificare</SelectItem>
                    <SelectItem value="resistenza">Migliorare resistenza</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Peso Attuale (kg)</Label>
                  <Input
                    type="number"
                    placeholder="70"
                    value={goalData.currentWeight}
                    onChange={(e) => setGoalData({...goalData, currentWeight: e.target.value})}
                  />
                </div>
                <div>
                  <Label>Peso Obiettivo (kg)</Label>
                  <Input
                    type="number"
                    placeholder="65"
                    value={goalData.targetWeight}
                    onChange={(e) => setGoalData({...goalData, targetWeight: e.target.value})}
                  />
                </div>
              </div>

              <div>
                <Label>Timeline</Label>
                <Select value={goalData.timeline} onValueChange={(value) => setGoalData({...goalData, timeline: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleziona durata" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="3 mesi">3 mesi</SelectItem>
                    <SelectItem value="6 mesi">6 mesi</SelectItem>
                    <SelectItem value="12 mesi">12 mesi</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button 
                onClick={generateGoalPlan}
                className="w-full hero-gradient text-white"
                disabled={!goalData.goal || !goalData.currentWeight || !goalData.targetWeight || !goalData.timeline}
              >
                <Target className="w-4 h-4 mr-2" />
                Genera Piano
              </Button>

              {goalPlan && (
                <div className="space-y-4 p-4 bg-muted rounded-lg">
                  <h4 className="font-semibold text-center mb-4">Il Tuo Piano Personalizzato</h4>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <TrendingUp className="w-4 h-4 mr-2 text-primary" />
                        <span className="text-sm font-medium">Abbonamento</span>
                      </div>
                      <Badge className="bg-primary text-primary-foreground">
                        {goalPlan.membership}
                      </Badge>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-2 text-primary" />
                        <span className="text-sm font-medium">Frequenza</span>
                      </div>
                      <span className="text-sm text-muted-foreground">{goalPlan.frequency}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <User className="w-4 h-4 mr-2 text-primary" />
                        <span className="text-sm font-medium">Trainer</span>
                      </div>
                      <span className="text-sm text-muted-foreground">{goalPlan.trainer}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Weight className="w-4 h-4 mr-2 text-primary" />
                        <span className="text-sm font-medium">Durata</span>
                      </div>
                      <span className="text-sm text-muted-foreground">{goalPlan.duration}</span>
                    </div>
                  </div>

                  <div>
                    <h5 className="font-medium mb-2">Corsi Consigliati:</h5>
                    <div className="flex flex-wrap gap-2">
                      {goalPlan.classes.map((className, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {className}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <Button 
                    size="sm" 
                    className="w-full"
                    onClick={() => document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' })}
                  >
                    Inizia Percorso
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};