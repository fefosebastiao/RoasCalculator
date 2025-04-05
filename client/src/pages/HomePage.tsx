import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import Calculator from "@/components/Calculator";
import EducationalSection from "@/components/EducationalSection";
import CTASection from "@/components/CTASection";

const HomePage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <Calculator />
        <EducationalSection />
        <CTASection />
      </main>
    </div>
  );
};

export default HomePage;
