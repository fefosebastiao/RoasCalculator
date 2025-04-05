import { Button } from "@/components/ui/button";
import { Link } from "wouter";

const CTASection = () => {
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
    <section className="py-16 bg-primary">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Transforme seu investimento em resultados</h2>
          <p className="text-xl text-primary-100 mb-8">
            Comece hoje mesmo a otimizar seu ROAS e maximize o retorno de cada real investido em publicidade.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button 
              variant="secondary" 
              size="lg"
              asChild
            >
              <Link href="#calculator" onClick={scrollToCalculator}>
                Calcular meu ROAS
              </Link>
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-white text-white hover:bg-primary-700"
            >
              Falar com especialista
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
