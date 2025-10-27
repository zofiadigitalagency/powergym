import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { LoginModal } from "./LoginModal";
import { useHeaderLayout } from "@/hooks/use-header-layout";
import logo from "@/assets/powergym-logo.png";

interface HeaderProps {
  onOpenFreeTrial: () => void;
}

export const Header = ({ onOpenFreeTrial }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const { layout, showFullNav, showMobileMenu } = useHeaderLayout();

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      setIsMenuOpen(false);
    }
  };

  const navigation = [
    { name: "Home", href: "#home" },
    { name: "Corsi", href: "#corsi" },
    { name: "Trainer", href: "#trainer" },
    { name: "Abbonamenti", href: "#abbonamenti" },
    { name: "Trasformazioni", href: "#trasformazioni" },
  ];

  return (
    <header className="fixed top-0 w-full z-50 bg-background/95 backdrop-blur-sm border-b">
      <div className="container mx-auto px-4">
        <div className={cn(
          "flex items-center h-16",
          showFullNav ? "justify-between gap-4" : "justify-between"
        )}>
          {/* Logo */}
          <button 
            onClick={() => scrollToSection("#home")}
            className="flex items-center space-x-3 group"
          >
            <img 
              src={logo} 
              alt="PowerGym Logo" 
              className="w-12 h-12 rounded-lg shadow-lg group-hover:scale-105 transition-transform"
            />
            <div className="text-left">
              <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                PowerGym
              </h1>
              <p className="text-xs text-muted-foreground font-medium">Pescara</p>
            </div>
          </button>

          {/* Desktop Navigation */}
          {showFullNav && (
            <nav className={cn(
              "flex items-center",
              layout === "desktop" ? "space-x-8" : "space-x-4"
            )}>
              {navigation.map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className={cn(
                    "text-foreground hover:text-primary transition-smooth font-medium relative",
                    "after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0",
                    "hover:after:w-full after:bg-primary after:transition-all",
                    layout === "intermediate" && "text-sm"
                  )}
                >
                  {item.name}
                </button>
              ))}
            </nav>
          )}

          {/* Desktop Actions */}
          {showFullNav && (
            <div className={cn(
              "flex items-center shrink-0",
              layout === "desktop" ? "space-x-4" : "space-x-2"
            )}>
              <Button
                onClick={() => setIsLoginOpen(true)}
                variant="outline"
                size={layout === "intermediate" ? "sm" : "default"}
                className="border-2 border-primary text-primary hover:bg-primary hover:text-white font-semibold transition-smooth"
              >
                <User className={cn("mr-2", layout === "intermediate" ? "w-3 h-3" : "w-4 h-4")} />
                {layout === "desktop" ? "Area Soci" : "Soci"}
              </Button>
              <Button
                onClick={onOpenFreeTrial}
                size={layout === "intermediate" ? "sm" : "default"}
                className="hero-gradient text-white font-semibold hover:opacity-90 transition-smooth shadow-lg hover:shadow-xl whitespace-nowrap"
              >
                {layout === "desktop" ? "Prova Gratis" : "Prova"}
              </Button>
            </div>
          )}

          {/* Mobile Menu Button */}
          {showMobileMenu && (
            <button
              className="p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          )}
        </div>

        {/* Mobile Navigation */}
        {showMobileMenu && (
          <div
            className={cn(
              "overflow-hidden transition-all duration-300",
              isMenuOpen ? "max-h-96 pb-4" : "max-h-0"
            )}
          >
          <nav className="flex flex-col space-y-3 pt-4">
            {navigation.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className="text-foreground hover:text-primary transition-smooth font-medium py-2 text-left"
              >
                {item.name}
              </button>
            ))}
            <div className="flex flex-col space-y-3 pt-4">
              <Button
                onClick={() => {
                  setIsLoginOpen(true);
                  setIsMenuOpen(false);
                }}
                variant="outline"
                size="sm"
                className="border-2 border-primary text-primary hover:bg-primary hover:text-white font-semibold"
              >
                <User className="w-4 h-4 mr-2" />
                Area Soci
              </Button>
              <Button
                onClick={() => {
                  onOpenFreeTrial();
                  setIsMenuOpen(false);
                }}
                className="hero-gradient text-white font-semibold"
              >
                Prova Gratis
              </Button>
            </div>
          </nav>
          </div>
        )}
      </div>

      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </header>
  );
};