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
                <span className="text-sm uppercase text-primary font-medium">A CONTA PARA QUEM PRECISA VENDER</span>
                
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 my-4">
                  Lucre mais com nossa tecnologia: Maquininha, Tap e Link de Pagamento
                </h2>
                
                <p className="text-gray-600 mb-8">
                  Receba na hora ou em 1 dia útil com taxas a partir de:
                </p>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full mb-8">
                <div className="bg-gray-50 p-4 rounded-md text-center">
                  <p className="text-2xl font-bold text-primary">0,00%</p>
                  <p className="text-sm text-gray-500">no Pix</p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-md text-center">
                  <p className="text-2xl font-bold text-primary">0,75%</p>
                  <p className="text-sm text-gray-500">no Débito</p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-md text-center">
                  <p className="text-2xl font-bold text-primary">2,69%</p>
                  <p className="text-sm text-gray-500">no Crédito 1x</p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-md text-center">
                  <p className="text-2xl font-bold text-primary">8,99%</p>
                  <p className="text-sm text-gray-500">no Crédito 12x</p>
                </div>
              </div>
              
              <div className="text-center mb-6">
                <p className="text-gray-500 line-through">De: 12x de R$ 79,90</p>
                <p className="text-xl font-bold">por: <span className="text-primary">12x de R$ 16,58</span> ou <span className="text-primary">R$ 199</span> pela Maquininha Smart com Pix grátis, conta digital e suporte RA1000</p>
              </div>
              
              <Button 
                size="lg" 
                className="bg-[#DAFE12] hover:bg-[#DAFE12]/90 text-gray-900 px-8 py-6 rounded-full text-lg font-bold"
                asChild
              >
                <Link href="#calculator" onClick={scrollToCalculator}>
                  Compre agora sua Maquininha
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
