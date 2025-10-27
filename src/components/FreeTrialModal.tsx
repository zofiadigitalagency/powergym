import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { it } from "date-fns/locale";
import { CalendarIcon, Trophy, Check, Download } from "lucide-react";
import { cn } from "@/lib/utils";

interface FreeTrialModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  startDate: Date | undefined;
  goal: string;
  source: string;
  privacy: boolean;
}

export const FreeTrialModal = ({ isOpen, onClose }: FreeTrialModalProps) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    startDate: undefined,
    goal: "",
    source: "",
    privacy: false
  });

  const resetForm = () => {
    setStep(1);
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      startDate: undefined,
      goal: "",
      source: "",
      privacy: false
    });
  };

  const handleSubmit = () => {
    // Simulate form submission
    setStep(2);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const downloadVoucher = () => {
    // Simulate voucher download
    alert("Voucher scaricato! Presentalo alla reception per iniziare la tua prova gratuita.");
    handleClose();
  };

  const isFormValid = () => {
    return (
      formData.firstName &&
      formData.lastName &&
      formData.email &&
      formData.phone &&
      formData.startDate &&
      formData.goal &&
      formData.source &&
      formData.privacy
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Trophy className="w-6 h-6 text-primary" />
            <span>Prova Gratuita 7 Giorni</span>
          </DialogTitle>
          <DialogDescription>
            {step === 1 ? "Compila il form per attivare la tua prova gratuita" : "La tua prova gratuita è attivata!"}
          </DialogDescription>
        </DialogHeader>

        {step === 1 ? (
          <div className="space-y-6">
            {/* Personal Info */}
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

            {/* Start Date */}
            <div>
              <Label>Quando vuoi iniziare? *</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !formData.startDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.startDate ? (
                      format(formData.startDate, "PPP", { locale: it })
                    ) : (
                      <span>Seleziona data</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={formData.startDate}
                    onSelect={(date) => setFormData({...formData, startDate: date})}
                    disabled={(date) => date < new Date()}
                    initialFocus
                    className="p-3 pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Goal */}
            <div>
              <Label>Obiettivo principale *</Label>
              <Select value={formData.goal} onValueChange={(value) => setFormData({...formData, goal: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleziona obiettivo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="perdere-peso">Perdere peso</SelectItem>
                  <SelectItem value="massa-muscolare">Aumentare massa muscolare</SelectItem>
                  <SelectItem value="tonificare">Tonificare</SelectItem>
                  <SelectItem value="resistenza">Migliorare resistenza</SelectItem>
                  <SelectItem value="salute">Migliorare salute generale</SelectItem>
                  <SelectItem value="stress">Ridurre stress</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Source */}
            <div>
              <Label>Come ci hai conosciuto? *</Label>
              <Select value={formData.source} onValueChange={(value) => setFormData({...formData, source: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleziona fonte" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="google">Google</SelectItem>
                  <SelectItem value="facebook">Facebook</SelectItem>
                  <SelectItem value="instagram">Instagram</SelectItem>
                  <SelectItem value="amici">Amici/Conoscenti</SelectItem>
                  <SelectItem value="passaggio">Passando davanti</SelectItem>
                  <SelectItem value="altro">Altro</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Privacy */}
            <div className="flex items-center space-x-2">
              <Checkbox
                id="privacy"
                checked={formData.privacy}
                onCheckedChange={(checked) => setFormData({...formData, privacy: !!checked})}
              />
              <Label htmlFor="privacy" className="text-sm">
                Accetto il trattamento dei dati personali secondo la Privacy Policy *
              </Label>
            </div>

            <Button
              onClick={handleSubmit}
              className="w-full hero-gradient text-white font-semibold"
              disabled={!isFormValid()}
            >
              <Trophy className="w-4 h-4 mr-2" />
              Attiva Prova Gratuita
            </Button>
          </div>
        ) : (
          <div className="space-y-6 text-center">
            {/* Success Icon */}
            <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto">
              <Check className="w-8 h-8 text-white" />
            </div>

            {/* Success Message */}
            <div>
              <h3 className="text-xl font-bold text-secondary mb-2">
                🎉 Prova Gratuita Attivata!
              </h3>
              <p className="text-muted-foreground">
                Hai 7 giorni di accesso completo a PowerGym:
              </p>
            </div>

            {/* Benefits */}
            <div className="bg-muted rounded-lg p-4 space-y-2">
              <div className="flex items-center space-x-2">
                <Check className="w-4 h-4 text-accent" />
                <span className="text-sm">Sala pesi illimitata</span>
              </div>
              <div className="flex items-center space-x-2">
                <Check className="w-4 h-4 text-accent" />
                <span className="text-sm">3 corsi a scelta</span>
              </div>
              <div className="flex items-center space-x-2">
                <Check className="w-4 h-4 text-accent" />
                <span className="text-sm">Valutazione gratuita con PT</span>
              </div>
              <div className="flex items-center space-x-2">
                <Check className="w-4 h-4 text-accent" />
                <span className="text-sm">Tour guidato struttura</span>
              </div>
            </div>

            {/* Start Date */}
            <div className="bg-primary/10 rounded-lg p-4">
              <p className="text-sm text-muted-foreground mb-1">Ti aspettiamo il</p>
              <p className="text-lg font-bold text-primary">
                {formData.startDate && format(formData.startDate, "EEEE d MMMM yyyy", { locale: it })}
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                Porta questo voucher in reception!
              </p>
            </div>

            {/* Actions */}
            <div className="space-y-3">
              <Button
                onClick={downloadVoucher}
                className="w-full hero-gradient text-white font-semibold"
              >
                <Download className="w-4 h-4 mr-2" />
                Scarica Voucher
              </Button>
              <Button
                variant="outline"
                onClick={handleClose}
                className="w-full"
              >
                Chiudi
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};