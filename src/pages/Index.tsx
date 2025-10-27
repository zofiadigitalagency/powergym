import { useState } from "react";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { ClassSchedule } from "@/components/ClassSchedule";
import { Memberships } from "@/components/Memberships";
import { Trainers } from "@/components/Trainers";
import { Transformations } from "@/components/Transformations";
import { Tools } from "@/components/Tools";
import { FreeTrialModal } from "@/components/FreeTrialModal";
import { Footer } from "@/components/Footer";

const Index = () => {
  const [isTrialModalOpen, setIsTrialModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Header onOpenFreeTrial={() => setIsTrialModalOpen(true)} />
      <Hero onOpenFreeTrial={() => setIsTrialModalOpen(true)} />
      <ClassSchedule />
      <Memberships />
      <Trainers />
      <Transformations />
      <Tools />
      <Footer />
      
      <FreeTrialModal 
        isOpen={isTrialModalOpen} 
        onClose={() => setIsTrialModalOpen(false)} 
      />
    </div>
  );
};

export default Index;
