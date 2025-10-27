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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Check, Star, Crown, Gift, CreditCard, Smartphone, Building2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface Membership {
  id: string;
  title: string;
  price: number;
  period: string;
  originalPrice?: number;
  features: string[];
  popular?: boolean;
  premium?: boolean;
  description: string;
}

const memberships: Membership[] = [
  {
    id: "monthly",
    title: "MENSILE",
    price: 49,
    period: "mese",
    features: [
      "Accesso illimitato sala pesi",
      "10 corsi inclusi/mese",
      "Spogliatoi e docce",
      "WiFi gratuito",
      "Consulenza iniziale"
    ],
    description: "Perfetto per iniziare il tuo percorso fitness"
  },
  {
    id: "quarterly",
    title: "TRIMESTRALE",
    price: 43,
    period: "mese",
    originalPrice: 49,
    popular: true,
    features: [
      "Tutto del mensile",
      "Corsi illimitati",
      "1 seduta PT gratuita",
      "Sconto 10% bar interno",
      "App mobile inclusa",
      "Programma nutrizionale base"
    ],
    description: "Il nostro piano più scelto dai membri"
  },
  {
    id: "annual",
    title: "ANNUALE",
    price: 33,
    period: "mese",
    originalPrice: 49,
    premium: true,
    features: [
      "Tutto del trimestrale",
      "3 sedute PT gratuite",
      "Accesso piscina",
      "Porta un amico gratis",
      "Borsa PowerGym omaggio",
      "Area wellness (sauna/bagno turco)",
      "Valutazione corporea mensile"
    ],
    description: "Massimo valore per i membri più dedicati"
  }
];

export const Memberships = () => {
  const [selectedMembership, setSelectedMembership] = useState<Membership | null>(null);
  const [checkoutStep, setCheckoutStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    paymentMethod: ""
  });

  const handlePurchase = (membership: Membership) => {
    setSelectedMembership(membership);
    setCheckoutStep(1);
  };

  const handleNextStep = () => {
    if (checkoutStep < 4) {
      setCheckoutStep(checkoutStep + 1);
    }
  };

  const handlePrevStep = () => {
    if (checkoutStep > 1) {
      setCheckoutStep(checkoutStep - 1);
    }
  };

  const completePurchase = () => {
    alert(`Abbonamento ${selectedMembership?.title} attivato con successo! Benvenuto in PowerGym!`);
    setSelectedMembership(null);
    setCheckoutStep(1);
    setFormData({ firstName: "", lastName: "", email: "", phone: "", paymentMethod: "" });
  };

  const getCardIcon = (membership: Membership) => {
    if (membership.premium) return <Crown className="w-6 h-6 text-primary" />;
    if (membership.popular) return <Star className="w-6 h-6 text-primary" />;
    return <Gift className="w-6 h-6 text-primary" />;
  };

  return (
    <section id="abbonamenti" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">
            Abbonamenti PowerGym
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Scegli il piano perfetto per i tuoi obiettivi fitness. Tutti gli abbonamenti includono accesso completo alle nostre strutture.
          </p>
        </div>

        {/* Membership Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-12">
          {memberships.map((membership) => (
            <div
              key={membership.id}
              className={cn(
                "relative card-gradient rounded-2xl p-8 border-2 hover-lift transition-smooth",
                membership.popular && "border-primary ring-2 ring-primary/20",
                membership.premium && "border-accent ring-2 ring-accent/20"
              )}
            >
              {/* Badge */}
              {membership.popular && (
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 hero-gradient text-white px-4 py-1">
                  PIÙ POPOLARE
                </Badge>
              )}
              {membership.premium && (
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 accent-gradient text-white px-4 py-1">
                  RISPARMIO 20%
                </Badge>
              )}

              {/* Header */}
              <div className="text-center mb-6">
                <div className="flex justify-center mb-3">
                  {getCardIcon(membership)}
                </div>
                <h3 className="text-xl font-bold text-secondary mb-2">
                  {membership.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {membership.description}
                </p>
                <div className="flex items-baseline justify-center space-x-2">
                  <span className="text-4xl font-bold text-primary">€{membership.price}</span>
                  <span className="text-muted-foreground">/{membership.period}</span>
                  {membership.originalPrice && (
                    <span className="text-lg text-muted-foreground line-through">
                      €{membership.originalPrice}
                    </span>
                  )}
                </div>
              </div>

              {/* Features */}
              <ul className="space-y-3 mb-8">
                {membership.features.map((feature, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <Check className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Button
                className={cn(
                  "w-full font-semibold",
                  membership.popular && "hero-gradient text-white",
                  membership.premium && "accent-gradient text-white"
                )}
                onClick={() => handlePurchase(membership)}
              >
                Acquista
              </Button>
            </div>
          ))}
        </div>

        {/* Personal Training */}
        <div className="max-w-2xl mx-auto card-gradient rounded-xl p-8 border">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-secondary mb-4">Personal Training</h3>
            <p className="text-muted-foreground mb-6">
              Raggiungi i tuoi obiettivi più velocemente con un trainer dedicato
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-primary">€200</p>
                <p className="text-sm text-muted-foreground mb-2">Pacchetto 5 sessioni</p>
                <p className="text-xs text-muted-foreground">€40 per sessione</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-primary">€350</p>
                <p className="text-sm text-muted-foreground mb-2">Pacchetto 10 sessioni</p>
                <p className="text-xs text-muted-foreground">€35 per sessione</p>
              </div>
            </div>
            <Button className="mt-6 hero-gradient text-white">
              Richiedi Info Personal Training
            </Button>
          </div>
        </div>

        {/* Checkout Modal */}
        <Dialog open={!!selectedMembership} onOpenChange={() => setSelectedMembership(null)}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>
                {checkoutStep === 1 && "Conferma Abbonamento"}
                {checkoutStep === 2 && "Dati Anagrafici"}
                {checkoutStep === 3 && "Metodo di Pagamento"}
                {checkoutStep === 4 && "Conferma Acquisto"}
              </DialogTitle>
              <DialogDescription>
                Step {checkoutStep} di 4
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-6">
              {/* Step 1: Conferma */}
              {checkoutStep === 1 && selectedMembership && (
                <div className="space-y-4">
                  <div className="bg-muted rounded-lg p-4">
                    <h4 className="font-semibold">{selectedMembership.title}</h4>
                    <p className="text-2xl font-bold text-primary">
                      €{selectedMembership.price}/{selectedMembership.period}
                    </p>
                    <p className="text-sm text-muted-foreground mt-2">
                      {selectedMembership.description}
                    </p>
                  </div>
                  <Button onClick={handleNextStep} className="w-full hero-gradient text-white">
                    Continua
                  </Button>
                </div>
              )}

              {/* Step 2: Dati */}
              {checkoutStep === 2 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">Nome *</Label>
                      <Input
                        id="firstName"
                        value={formData.firstName}
                        onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                        placeholder="Mario"
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Cognome *</Label>
                      <Input
                        id="lastName"
                        value={formData.lastName}
                        onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                        placeholder="Rossi"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      placeholder="mario@example.com"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Telefono *</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      placeholder="+39 123 456 7890"
                    />
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" onClick={handlePrevStep} className="flex-1">
                      Indietro
                    </Button>
                    <Button 
                      onClick={handleNextStep} 
                      className="flex-1 hero-gradient text-white"
                      disabled={!formData.firstName || !formData.lastName || !formData.email || !formData.phone}
                    >
                      Continua
                    </Button>
                  </div>
                </div>
              )}

              {/* Step 3: Pagamento */}
              {checkoutStep === 3 && (
                <div className="space-y-4">
                  <div>
                    <Label>Metodo di Pagamento</Label>
                    <Select value={formData.paymentMethod} onValueChange={(value) => setFormData({...formData, paymentMethod: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleziona metodo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="card">
                          <div className="flex items-center space-x-2">
                            <CreditCard className="w-4 h-4" />
                            <span>Carta di Credito</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="paypal">
                          <div className="flex items-center space-x-2">
                            <Smartphone className="w-4 h-4" />
                            <span>PayPal</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="bank">
                          <div className="flex items-center space-x-2">
                            <Building2 className="w-4 h-4" />
                            <span>Bonifico Bancario</span>
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" onClick={handlePrevStep} className="flex-1">
                      Indietro
                    </Button>
                    <Button 
                      onClick={handleNextStep} 
                      className="flex-1 hero-gradient text-white"
                      disabled={!formData.paymentMethod}
                    >
                      Continua
                    </Button>
                  </div>
                </div>
              )}

              {/* Step 4: Conferma */}
              {checkoutStep === 4 && selectedMembership && (
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                      <Check className="w-8 h-8 text-white" />
                    </div>
                    <h4 className="text-lg font-semibold mb-2">Abbonamento Attivato!</h4>
                    <p className="text-muted-foreground">
                      Benvenuto in PowerGym! Il tuo abbonamento {selectedMembership.title} è ora attivo.
                    </p>
                  </div>
                  <div className="bg-muted rounded-lg p-4 text-sm">
                    <p><strong>Nome:</strong> {formData.firstName} {formData.lastName}</p>
                    <p><strong>Email:</strong> {formData.email}</p>
                    <p><strong>Piano:</strong> {selectedMembership.title}</p>
                    <p><strong>Prezzo:</strong> €{selectedMembership.price}/{selectedMembership.period}</p>
                  </div>
                  <Button onClick={completePurchase} className="w-full hero-gradient text-white">
                    Chiudi
                  </Button>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};