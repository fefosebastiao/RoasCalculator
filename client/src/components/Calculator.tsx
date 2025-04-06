import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { calculatorSchema, CalculatorFormData, CalculatorResults } from "@shared/schema";
import { industryOptions } from "@/data/industryBenchmarks";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { NumericInput } from "./NumericInput";
import { CustomFormMessage } from "@/components/ui/custom-form-message";
import WhatsAppForm from "./WhatsAppForm";

interface CalculatorProps {
  onResultsShow?: () => void;
  onCalculatorReset?: () => void;
}

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { Loader2, LightbulbIcon, ArrowRight } from "lucide-react";

const Calculator = ({ onResultsShow, onCalculatorReset }: CalculatorProps) => {
  const [results, setResults] = useState<CalculatorResults | null>(null);
  const [step, setStep] = useState(1);
  const totalSteps = 5;
  const { toast } = useToast();
  
  // Notificar o componente pai quando os resultados são exibidos ou redefinidos
  useEffect(() => {
    if (results && onResultsShow) {
      onResultsShow();
    }
  }, [results, onResultsShow]);

  // Estado para rastrear quando os campos foram tocados
  const [touchedFields, setTouchedFields] = useState<Record<string, boolean>>({
    industry: false,
    serviceOrProduct: false,
    adSpend: false,
    revenue: false,
    monthlySales: false
  });

  const form = useForm<CalculatorFormData>({
    resolver: zodResolver(calculatorSchema),
    defaultValues: {
      industry: "",
      serviceOrProduct: "",
      adSpend: undefined,
      revenue: undefined,
      monthlySales: undefined
    },
    // Desabilita a validação na primeira renderização
    mode: 'onTouched'
  });

  const calculateRoasMutation = useMutation({
    mutationFn: async (data: CalculatorFormData) => {
      const response = await apiRequest("POST", "/api/calculate-roas", data);
      return response.json();
    },
    onSuccess: (data) => {
      setResults(data);
    },
    onError: (error) => {
      toast({
        title: "Erro ao calcular ROAS",
        description: error instanceof Error ? error.message : "Ocorreu um erro inesperado.",
        variant: "destructive",
      });
    },
  });

  const nextStep = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };
  
  const resetCalculator = () => {
    setResults(null);
    setStep(1);
    form.reset();
    if (onCalculatorReset) {
      onCalculatorReset();
    }
  };
  
  const onSubmit = (data: CalculatorFormData) => {
    if (step < totalSteps) {
      nextStep();
    } else {
      calculateRoasMutation.mutate(data);
    }
  };
  
  // Função para permitir o avanço com botões independente do submit do formulário
  const handleNext = () => {
    const currentFieldName = getCurrentFieldName();
    
    // Marca o campo como tocado
    setTouchedFields(prev => ({
      ...prev,
      [currentFieldName]: true
    }));
    
    // Verifica se o campo atual é válido
    form.trigger(currentFieldName).then(isValid => {
      if (isValid) {
        nextStep();
      }
    });
  };
  
  // Função auxiliar para obter o nome do campo atual com base no passo
  const getCurrentFieldName = (): keyof CalculatorFormData => {
    switch (step) {
      case 1: return "industry";
      case 2: return "serviceOrProduct";
      case 3: return "adSpend";
      case 4: return "revenue";
      case 5: return "monthlySales";
      default: return "industry";
    }
  };
  
  // Função para verificar se deve mostrar erros para um campo específico
  const shouldShowError = (fieldName: keyof CalculatorFormData) => {
    return touchedFields[fieldName];
  };

  return (
    <section id="calculator" className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {!results ? (
            // Formulário e informações iniciais
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16">
              {/* Calculator Form */}
              <Card className="shadow-lg">
                <CardContent className="p-6 md:p-8">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">Calculadora de ROAS</h2>
                  {/* Progress indicator */}
                  <div className="mb-6">
                    <div className="flex justify-between text-sm text-gray-500 mb-2">
                      <span>Questão {step} de {totalSteps}</span>
                      <span>{Math.round((step / totalSteps) * 100)}%</span>
                    </div>
                    <Progress value={(step / totalSteps) * 100} className="h-2" />
                  </div>
                  
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      
                      {step === 1 && (
                        <FormField
                          control={form.control}
                          name="industry"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Em qual setor seu negócio atua?</FormLabel>
                              <Select 
                                onValueChange={field.onChange} 
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Selecione seu setor" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {industryOptions.map(option => (
                                    <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <CustomFormMessage variant="default" />
                            </FormItem>
                          )}
                        />
                      )}
                      
                      {step === 2 && (
                        <FormField
                          control={form.control}
                          name="serviceOrProduct"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Emite notas de serviços ou produto?</FormLabel>
                              <Select 
                                onValueChange={field.onChange} 
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Selecione uma opção" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="service">Serviços</SelectItem>
                                  <SelectItem value="product">Produtos</SelectItem>
                                  <SelectItem value="both">Ambos</SelectItem>
                                  <SelectItem value="none">Não emite notas</SelectItem>
                                </SelectContent>
                              </Select>
                              <CustomFormMessage variant="default" />
                            </FormItem>
                          )}
                        />
                      )}
                      
                      {step === 3 && (
                        <FormField
                          control={form.control}
                          name="adSpend"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Quanto é investido em anúncios mensalmente? (R$)</FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <NumericInput 
                                    placeholder="Exemplo: 5000"
                                    prefix="R$"
                                    onValueChange={field.onChange}
                                    value={field.value}
                                  />
                                </div>
                              </FormControl>
                              {touchedFields.adSpend && <CustomFormMessage variant="default" />}
                            </FormItem>
                          )}
                        />
                      )}
                      
                      {step === 4 && (
                        <FormField
                          control={form.control}
                          name="revenue"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Quanto é o faturamento mensal? (R$)</FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <NumericInput 
                                    placeholder="Exemplo: 20000" 
                                    prefix="R$"
                                    onValueChange={field.onChange}
                                    value={field.value}
                                  />
                                </div>
                              </FormControl>
                              {touchedFields.revenue && <CustomFormMessage variant="default" />}
                            </FormItem>
                          )}
                        />
                      )}
                      
                      {step === 5 && (
                        <FormField
                          control={form.control}
                          name="monthlySales"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Quantas vendas ou conversões por mês sua empresa realiza?</FormLabel>
                              <FormControl>
                                <NumericInput 
                                  placeholder="Informe o número médio mensal" 
                                  onValueChange={field.onChange}
                                  value={field.value}
                                />
                              </FormControl>
                              {touchedFields.monthlySales && <CustomFormMessage variant="default" />}
                            </FormItem>
                          )}
                        />
                      )}
                      
                      <div className="flex justify-between mt-6">
                        {step > 1 ? (
                          <Button 
                            type="button" 
                            variant="outline" 
                            onClick={prevStep}
                            className="space-x-2"
                          >
                            <ChevronLeft className="h-4 w-4" />
                            <span>Voltar</span>
                          </Button>
                        ) : (
                          <div></div>
                        )}
                        
                        {step < totalSteps ? (
                          <Button 
                            type="button" 
                            onClick={handleNext}
                            className="space-x-2"
                          >
                            <span>Próximo</span>
                            <ChevronRight className="h-4 w-4" />
                          </Button>
                        ) : (
                          <Button 
                            type="submit" 
                            disabled={calculateRoasMutation.isPending}
                            className="space-x-2"
                          >
                            {calculateRoasMutation.isPending ? (
                              <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                <span>Calculando...</span>
                              </>
                            ) : (
                              <>
                                <span>Calcular meu ROAS</span>
                                <ChevronRight className="h-4 w-4" />
                              </>
                            )}
                          </Button>
                        )}
                      </div>
                    </form>
                  </Form>
                </CardContent>
              </Card>
              
              {/* Info Column */}
              <Card className="bg-gray-50 shadow-lg">
                <CardContent className="p-6 md:p-8 flex flex-col justify-center">
                  <div className="text-center">
                    <div className="rounded-lg mx-auto mb-6 shadow-md bg-white h-48 flex flex-col p-3">
                      {/* Dashboard Header */}
                      <div className="flex justify-between items-center mb-2">
                        <div className="text-sm font-semibold text-gray-900">Dashboard de ROAS</div>
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 rounded-full bg-red-400"></div>
                          <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
                          <div className="w-2 h-2 rounded-full bg-green-400"></div>
                        </div>
                      </div>
                      
                      {/* Main Dashboard */}
                      <div className="flex flex-1 space-x-2">
                        {/* Left side - KPIs */}
                        <div className="w-1/3 flex flex-col space-y-2">
                          <div className="bg-gray-50 rounded-md p-2 flex-1 flex flex-col justify-center">
                            <div className="text-[10px] text-gray-500">ROAS Médio</div>
                            <div className="text-primary font-bold text-xl">3.2x</div>
                          </div>
                          <div className="bg-gray-50 rounded-md p-2 flex-1 flex flex-col justify-center">
                            <div className="text-[10px] text-gray-500">Conversão</div>
                            <div className="text-primary font-bold text-xl">4.7%</div>
                          </div>
                        </div>
                        
                        {/* Right side - Chart */}
                        <div className="w-2/3 bg-gray-50 rounded-md p-2 flex flex-col">
                          <div className="text-[10px] text-gray-500 mb-1">Evolução do ROAS</div>
                          <div className="flex-1 flex items-end pt-2 relative">
                            {/* Barras */}
                            <div className="h-30% w-1/6 bg-primary-300 rounded-t-sm mx-0.5"></div>
                            <div className="h-40% w-1/6 bg-primary-300 rounded-t-sm mx-0.5"></div>
                            <div className="h-35% w-1/6 bg-primary-300 rounded-t-sm mx-0.5"></div>
                            <div className="h-60% w-1/6 bg-primary-400 rounded-t-sm mx-0.5"></div>
                            <div className="h-75% w-1/6 bg-primary-500 rounded-t-sm mx-0.5"></div>
                            <div className="h-90% w-1/6 bg-primary-600 rounded-t-sm mx-0.5"></div>
                            
                            {/* Linha de evolução do ROAS */}
                            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                              <polyline
                                points="8,70 25,60 41,65 58,40 75,25 92,10"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                className="text-primary-600"
                              />
                              {/* Pontos da linha */}
                              <circle cx="8" cy="70" r="2" className="fill-primary-600" />
                              <circle cx="25" cy="60" r="2" className="fill-primary-600" />
                              <circle cx="41" cy="65" r="2" className="fill-primary-600" />
                              <circle cx="58" cy="40" r="2" className="fill-primary-600" />
                              <circle cx="75" cy="25" r="2" className="fill-primary-600" />
                              <circle cx="92" cy="10" r="2" className="fill-primary-600" />
                            </svg>
                          </div>
                          <div className="flex text-[8px] text-gray-400 pt-1 justify-between px-1">
                            <span>Jan</span>
                            <span>Fev</span>
                            <span>Mar</span>
                            <span>Abr</span>
                            <span>Mai</span>
                            <span>Jun</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-3">Descubra o potencial do seu ROAS</h3>
                    <p className="text-gray-600 mb-6">Preencha o formulário ao lado para calcular seu ROAS atual e receber insights personalizados para melhorar seus resultados.</p>
                    <div className="flex items-center justify-center text-sm text-gray-500">
                      <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                        <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                      </svg>
                      <span>Seus dados estão seguros e não são compartilhados</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : (
            // Exibição dos resultados
            <>
              <div className="text-center mb-8">
                <h3 className="text-xl font-bold text-gray-800 mb-2">Seu Resultado de ROAS</h3>
                <div className="relative inline-flex">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="h-32 w-32 rounded-full border-8 border-primary-100 flex items-center justify-center">
                      <span className="text-4xl font-bold text-primary">
                        {results.roas.toFixed(1)}x
                      </span>
                    </div>
                  </div>
                  <svg className="h-32 w-32 transform -rotate-90" viewBox="0 0 100 100">
                    <circle className="text-gray-200" strokeWidth="8" stroke="currentColor" fill="transparent" r="46" cx="50" cy="50" />
                    <circle 
                      className="text-primary" 
                      strokeWidth="8" 
                      stroke="currentColor" 
                      fill="transparent" 
                      r="46" 
                      cx="50" 
                      cy="50" 
                      strokeDasharray="289.02" 
                      strokeDashoffset={289.02 - (Math.min(results.roas, 6) / 6) * 289.02} 
                    />
                  </svg>
                </div>
              </div>
              
              <Card className="shadow-sm bg-white mb-10">
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-4">Resultados da Análise</h3>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-10 gap-y-6">
                    {/* ROAS e Benchmark */}
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm font-semibold text-gray-600 mb-1">ROAS</h4>
                        <div className="flex items-baseline">
                          <span className="text-2xl font-bold text-gray-900 mr-2">{results.roas.toFixed(2)}x</span>
                          <span className="text-sm text-gray-500">
                            (Meta: {results.benchmark.toFixed(2)}x)
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
                          <div 
                            className={`h-1.5 rounded-full ${results.roas >= results.benchmark ? 'bg-green-500' : 'bg-amber-500'}`}
                            style={{ width: `${results.percentOfBenchmark}%` }}
                          ></div>
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          {results.percentOfBenchmark.toFixed(2)}% da meta do setor
                        </div>
                      </div>
                    </div>
                    
                    {/* Ticket Médio */}
                    <div>
                      <h4 className="text-sm font-semibold text-gray-600 mb-1">Ticket Médio</h4>
                      <div className="text-2xl font-bold text-gray-900">R$ {results.ticketMedio.toFixed(2)}</div>
                      <p className="text-xs text-gray-500 mt-1">Valor médio por venda</p>
                    </div>
                    
                    {/* CPA */}
                    <div>
                      <h4 className="text-sm font-semibold text-gray-600 mb-1">Custo por Aquisição</h4>
                      <div className="text-2xl font-bold text-gray-900">R$ {results.cpa.toFixed(2)}</div>
                      <p className="text-xs text-gray-500 mt-1">Investimento por cliente adquirido</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="mb-8 shadow-md">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-3 mb-4">
                    <LightbulbIcon className="h-6 w-6 text-yellow-500 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="text-lg font-bold text-gray-800 mb-2">Insights Financeiros com IA</h4>
                      <div className="text-gray-600 prose prose-sm max-w-none">
                        {results.analysis.includes('##') 
                          ? <div dangerouslySetInnerHTML={{ 
                              __html: results.analysis
                                .replace(/##\s(.*)/g, '<h2 class="text-lg font-bold mt-4 mb-2 text-gray-800">$1</h2>')
                                .replace(/###\s(.*)/g, '<h3 class="text-md font-bold mt-3 mb-1 text-gray-700">$1</h3>')
                                .replace(/\n\n/g, '<p class="mb-3"></p>')
                                .split('\n').join('<br />')
                            }} />
                          : results.analysis.split('\n\n').map((paragraph, index) => (
                              <p key={index} className="mb-3">{paragraph}</p>
                            ))
                        }
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <div className="text-center mt-8">
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    variant="outline" 
                    onClick={resetCalculator} 
                    className="inline-flex items-center justify-center"
                  >
                    Calcular Novamente
                  </Button>
                  <WhatsAppForm 
                    calculatorData={form.getValues()}
                    calculatorResults={results}
                  />
                </div>
                
                {/* Seção de CTA dentro do componente Calculator quando os resultados estão visíveis */}
                <div className="mt-12">
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
                        className="bg-[#CDFB27] hover:bg-[#CDFB27]/90 text-gray-900 px-8 py-6 rounded-full text-lg font-bold"
                        asChild
                      >
                        <a href="https://buy.infinitepay.io/" target="_blank" rel="noopener noreferrer">
                          Compre agora sua Maquininha
                        </a>
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default Calculator;
