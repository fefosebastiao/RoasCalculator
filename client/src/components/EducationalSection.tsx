import { Card, CardContent } from "@/components/ui/card";
import { CheckIcon, BarChart2Icon, LightbulbIcon, TargetIcon } from "lucide-react";

const EducationalSection = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold text-gray-800 mb-5">Entenda o poder do ROAS</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              O Return on Ad Spend (ROAS) é um dos indicadores mais importantes para avaliar a eficácia das suas campanhas de marketing digital e otimizar seus investimentos.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="h-12 w-12 bg-primary-100 rounded-lg flex items-center justify-center text-primary mb-4">
                  <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                    <line x1="12" y1="17" x2="12.01" y2="17"></line>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">O que é ROAS?</h3>
                <p className="text-gray-600 text-base">
                  ROAS significa Return on Ad Spend, ou Retorno sobre o Investimento em Anúncios. É calculado dividindo a receita gerada por anúncios pelo custo desses anúncios.
                </p>
                <div className="mt-4 p-3 bg-gray-50 rounded-lg border border-gray-100">
                  <div className="font-medium text-gray-800 mb-1">Fórmula:</div>
                  <div className="text-primary font-semibold">ROAS = Receita / Investimento em Anúncios</div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="h-12 w-12 bg-primary-100 rounded-lg flex items-center justify-center text-primary mb-4">
                  <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 3v18h18"></path>
                    <path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">Por que o ROAS importa?</h3>
                <p className="text-gray-600 text-base">
                  O ROAS ajuda a avaliar a eficiência de suas campanhas publicitárias e orienta decisões de orçamento. Um ROAS maior indica melhor retorno sobre investimento.
                </p>
                <ul className="mt-4 space-y-2">
                  <li className="flex items-start">
                    <CheckIcon className="h-5 w-5 text-green-500 mt-0.5 mr-2" />
                    <span className="text-gray-700 text-base">Identifica campanhas lucrativas</span>
                  </li>
                  <li className="flex items-start">
                    <CheckIcon className="h-5 w-5 text-green-500 mt-0.5 mr-2" />
                    <span className="text-gray-700 text-base">Otimiza alocação de orçamento</span>
                  </li>
                  <li className="flex items-start">
                    <CheckIcon className="h-5 w-5 text-green-500 mt-0.5 mr-2" />
                    <span className="text-gray-700 text-base">Estabelece metas realistas</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="h-12 w-12 bg-primary-100 rounded-lg flex items-center justify-center text-primary mb-4">
                  <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5"></rect>
                    <path d="M16 12h.01M12 12h.01M8 12h.01"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">Como interpretamos?</h3>
                <p className="text-gray-600 text-base">
                  Nossa calculadora utiliza dados de benchmark do setor para contextualizar seu ROAS e fornecer recomendações personalizadas para melhorar seus resultados.
                </p>
                <div className="mt-5 space-y-4">
                  <div className="flex items-center">
                    <div className="w-4 h-4 rounded-full bg-red-500 mr-3"></div>
                    <span className="text-base font-medium">ROAS &lt; 2x: Abaixo do ideal</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-4 h-4 rounded-full bg-yellow-500 mr-3"></div>
                    <span className="text-base font-medium">ROAS 2-4x: Dentro da média</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-4 h-4 rounded-full bg-green-500 mr-3"></div>
                    <span className="text-base font-medium">ROAS &gt; 4x: Excelente performance</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card className="mt-12 shadow-md overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <CardContent className="p-6 md:p-8 flex flex-col justify-center">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Otimize suas campanhas com dados precisos</h3>
                <p className="text-gray-600 mb-6 text-lg">
                  Nossa calculadora de ROAS combina seus dados com benchmarks de indústria para fornecer insights acionáveis que ajudam a otimizar sua estratégia de marketing e aumentar seu ROI.
                </p>
                <div className="space-y-7">
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <div className="h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center">
                        <svg className="h-5 w-5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M12 20v-6M6 20V10M18 20V4" />
                        </svg>
                      </div>
                    </div>
                    <div className="ml-3">
                      <h4 className="text-lg font-medium text-gray-800">Comparação com benchmarks</h4>
                      <p className="mt-2 text-base text-gray-600">Entenda como seu desempenho se compara ao de outras empresas do seu setor e identifique oportunidades de melhoria significativas.</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <div className="h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center">
                        <LightbulbIcon className="h-5 w-5 text-primary" />
                      </div>
                    </div>
                    <div className="ml-3">
                      <h4 className="text-lg font-medium text-gray-800">Recomendações personalizadas</h4>
                      <p className="mt-2 text-base text-gray-600">Receba sugestões estratégicas baseadas no seu ROAS atual e siga um plano de ação detalhado para maximizar seus resultados em marketing digital.</p>
                    </div>
                  </div>
                </div>
              </CardContent>
              <div className="bg-primary-50 flex items-center justify-center p-6">
                <div className="p-6 md:p-8 flex flex-col justify-center items-center text-center">
                  <div className="mb-5 rounded-full bg-primary-100 h-20 w-20 flex items-center justify-center">
                    <BarChart2Icon className="h-10 w-10 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">Resultados tangíveis</h3>
                  <p className="text-gray-700 font-medium max-w-md">
                    Tome decisões baseadas em dados concretos e aumente seu retorno sobre investimento em anúncios. Nossa calculadora fornece números precisos para otimizar sua estratégia.
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default EducationalSection;
