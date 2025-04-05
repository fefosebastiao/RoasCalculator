import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const HeroSection = () => {
  const scrollToCalculator = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const calculatorSection = document.getElementById("calculator");
    if (calculatorSection) {
      window.scrollTo({
        top: calculatorSection.offsetTop - 80,
        behavior: "smooth"
      });
    }
  };

  return (
    <section className="bg-gradient-to-br from-primary to-primary-700 text-white py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-6">
            Qual o retorno real do seu investimento em anúncios?
          </h1>
          <p className="text-lg md:text-xl mb-8 text-primary-50 max-w-3xl mx-auto">
            Descubra seu ROAS (Return on Ad Spend) e compare com os benchmarks do seu setor para otimizar sua estratégia de marketing digital.
          </p>
          <Button 
            size="lg"
            variant="secondary"
            className="font-medium shadow-lg hover:shadow-xl transition-all duration-300"
            asChild
          >
            <Link href="#calculator" onClick={scrollToCalculator}>
              <div className="flex items-center">
                Calcular meu ROAS
                <ArrowRight className="ml-2 h-4 w-4" />
              </div>
            </Link>
          </Button>
          <div className="mt-8 text-sm text-primary-100">
            <p>Obtenha uma estimativa personalizada baseada no seu orçamento e objetivos de receita, comparada com referências da sua indústria.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
