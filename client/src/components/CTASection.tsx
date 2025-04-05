import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";

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
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Card className="shadow-lg border-gray-200">
            <CardContent className="p-8 flex flex-col items-center">
              <div className="text-center">
                <span className="text-sm uppercase text-primary font-medium">A CALCULADORA PARA QUEM PRECISA MENSURAR</span>
                
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 my-4">
                  Lucre mais com nossa tecnologia: Otimizador de ROAS
                </h2>
                
                <p className="text-gray-600 mb-8">
                  Receba na hora relatórios detalhados e insights personalizados:
                </p>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full mb-8">
                <div className="bg-gray-50 p-4 rounded-md text-center">
                  <p className="text-2xl font-bold text-primary">50%</p>
                  <p className="text-sm text-gray-500">mais conversões</p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-md text-center">
                  <p className="text-2xl font-bold text-primary">30%</p>
                  <p className="text-sm text-gray-500">menos custos</p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-md text-center">
                  <p className="text-2xl font-bold text-primary">2,5x</p>
                  <p className="text-sm text-gray-500">ROAS médio</p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-md text-center">
                  <p className="text-2xl font-bold text-primary">4,8x</p>
                  <p className="text-sm text-gray-500">ROAS potencial</p>
                </div>
              </div>
              
              <div className="text-center mb-6">
                <p className="text-gray-500 line-through">De: R$ 97,00 por análise</p>
                <p className="text-xl font-bold">por: <span className="text-primary">GRÁTIS</span> com acesso completo ao dashboard e consultoria inicial</p>
              </div>
              
              <Button 
                size="lg" 
                className="bg-primary hover:bg-primary/90 text-white px-8 py-6 rounded-full text-lg"
                asChild
              >
                <Link href="#calculator" onClick={scrollToCalculator}>
                  Calcular meu ROAS agora
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
