import { useState } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import Calculator from "@/components/Calculator";
import EducationalSection from "@/components/EducationalSection";
import CTASection from "@/components/CTASection";

const HomePage = () => {
  const [isCalculatorSubmitted, setIsCalculatorSubmitted] = useState(false);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <Calculator 
          onResultsShow={() => setIsCalculatorSubmitted(true)} 
          onCalculatorReset={() => setIsCalculatorSubmitted(false)}
        />
        {!isCalculatorSubmitted && (
          <>
            <EducationalSection />
            <CTASection />
          </>
        )}
      </main>
    </div>
  );
};

export default HomePage;
