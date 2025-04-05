import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { calculatorSchema, CalculatorFormData, CalculatorResults } from "@shared/schema";
import { industryOptions } from "@/data/industryBenchmarks";

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

const Calculator = () => {
  const [results, setResults] = useState<CalculatorResults | null>(null);
  const { toast } = useToast();

  const form = useForm<CalculatorFormData>({
    resolver: zodResolver(calculatorSchema),
    defaultValues: {
      adSpend: undefined,
      revenue: undefined,
      industry: "",
      channel: ""
    },
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

  const onSubmit = (data: CalculatorFormData) => {
    calculateRoasMutation.mutate(data);
  };

  return (
    <section id="calculator" className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16">
            {/* Calculator Form */}
            <Card className="shadow-lg">
              <CardContent className="p-6 md:p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Calculadora de ROAS</h2>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="adSpend"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Investimento Mensal em Anúncios (R$)</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <span className="text-gray-500 sm:text-sm">R$</span>
                              </div>
                              <Input 
                                placeholder="5.000" 
                                type="number" 
                                className="pl-10"
                                {...field} 
                                onChange={(e) => field.onChange(e.target.valueAsNumber)}
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="revenue"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Receita Mensal (R$)</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <span className="text-gray-500 sm:text-sm">R$</span>
                              </div>
                              <Input 
                                placeholder="20.000" 
                                type="number" 
                                className="pl-10"
                                {...field} 
                                onChange={(e) => field.onChange(e.target.valueAsNumber)}
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="industry"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Setor ou Tipo de Negócio</FormLabel>
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
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="channel"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Principal Canal de Anúncios</FormLabel>
                          <FormControl>
                            <RadioGroup 
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              className="grid grid-cols-2 gap-4"
                            >
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <RadioGroupItem value="google" id="channel-google" className="sr-only peer" />
                                </FormControl>
                                <FormLabel className="flex items-center p-3 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-50 transition-all peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary-50 w-full">
                                  <svg className="h-5 w-5 mr-2 text-gray-400" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5.46 8.12l-1.19-.24c-.2-.04-.26-.13-.26-.27V9.38c0-.13.07-.21.14-.11l1.26 1.33c.06.06.08.18-.07.28-.15.11-.11.21.12.24zm-12.33.11l1.26-1.33c.07-.09.14-.02.14.11v.23c0 .14-.06.23-.26.27l-1.19.24c-.23-.03-.19-.13-.07-.24.12-.1.11-.22.12-.28zM12 18.76c-1.63 0-3.12-.58-4.29-1.53l3.28-3.28c.74.73 1.73 1.19 2.82 1.19s2.08-.46 2.82-1.19l3.28 3.28c-1.17.95-2.66 1.53-4.29 1.53zm-6.76-4.29l3.28-3.28c.73.74 1.19 1.73 1.19 2.82s-.46 2.08-1.19 2.82l-3.28-3.28c-.01-.03-.01-.05 0-.08zm13.52 0c.01.03.01.05 0 .08l-3.28 3.28c-.73-.74-1.19-1.73-1.19-2.82s.46-2.08 1.19-2.82l3.28 3.28z" />
                                  </svg>
                                  <span className="text-sm">Google Ads</span>
                                </FormLabel>
                              </FormItem>
                              
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <RadioGroupItem value="facebook" id="channel-facebook" className="sr-only peer" />
                                </FormControl>
                                <FormLabel className="flex items-center p-3 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-50 transition-all peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary-50 w-full">
                                  <svg className="h-5 w-5 mr-2 text-gray-400" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z" />
                                  </svg>
                                  <span className="text-sm">Facebook Ads</span>
                                </FormLabel>
                              </FormItem>
                              
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <RadioGroupItem value="instagram" id="channel-instagram" className="sr-only peer" />
                                </FormControl>
                                <FormLabel className="flex items-center p-3 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-50 transition-all peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary-50 w-full">
                                  <svg className="h-5 w-5 mr-2 text-gray-400" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 2c2.717 0 3.056.01 4.122.06 1.065.05 1.79.217 2.428.465.66.254 1.216.598 1.772 1.153a4.908 4.908 0 0 1 1.153 1.772c.247.637.415 1.363.465 2.428.047 1.066.06 1.405.06 4.122 0 2.717-.01 3.056-.06 4.122-.05 1.065-.218 1.79-.465 2.428a4.883 4.883 0 0 1-1.153 1.772 4.915 4.915 0 0 1-1.772 1.153c-.637.247-1.363.415-2.428.465-1.066.047-1.405.06-4.122.06-2.717 0-3.056-.01-4.122-.06-1.065-.05-1.79-.218-2.428-.465a4.89 4.89 0 0 1-1.772-1.153 4.904 4.904 0 0 1-1.153-1.772c-.248-.637-.415-1.363-.465-2.428C2.013 15.056 2 14.717 2 12c0-2.717.01-3.056.06-4.122.05-1.066.217-1.79.465-2.428a4.88 4.88 0 0 1 1.153-1.772A4.897 4.897 0 0 1 5.45 2.525c.638-.248 1.362-.415 2.428-.465C8.944 2.013 9.283 2 12 2zm0 1.802c-2.67 0-2.986.01-4.04.059-.976.045-1.505.207-1.858.344-.466.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.055-.059 1.37-.059 4.04 0 2.67.01 2.986.059 4.04.045.976.207 1.505.344 1.858.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.047 1.37.059 4.04.059 2.67 0 2.987-.01 4.04-.059.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.047-1.055.059-1.37.059-4.04 0-2.67-.01-2.986-.059-4.04-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 0 0-.748-1.15 3.098 3.098 0 0 0-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.055-.047-1.37-.059-4.04-.059M12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 1.802a3.198 3.198 0 1 0 0 6.396 3.198 3.198 0 0 0 0-6.396zm6.244-3.036a1.2 1.2 0 1 1-2.4 0 1.2 1.2 0 0 1 2.4 0z" />
                                  </svg>
                                  <span className="text-sm">Instagram Ads</span>
                                </FormLabel>
                              </FormItem>
                              
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <RadioGroupItem value="other" id="channel-other" className="sr-only peer" />
                                </FormControl>
                                <FormLabel className="flex items-center p-3 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-50 transition-all peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary-50 w-full">
                                  <svg className="h-5 w-5 mr-2 text-gray-400" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm12 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
                                  </svg>
                                  <span className="text-sm">Outros</span>
                                </FormLabel>
                              </FormItem>
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <Button 
                      type="submit" 
                      className="w-full font-medium" 
                      disabled={calculateRoasMutation.isPending}
                    >
                      {calculateRoasMutation.isPending ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Calculando...
                        </>
                      ) : (
                        results ? "Recalcular" : "Calcular meu ROAS"
                      )}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
            
            {/* Results Display */}
            <Card className="bg-gray-50 shadow-lg">
              <CardContent className="p-6 md:p-8 flex flex-col justify-center">
                {!results ? (
                  <div className="text-center">
                    <div className="rounded-lg mx-auto mb-6 shadow-md bg-gray-200 h-48 flex items-center justify-center">
                      <svg className="w-16 h-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
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
                ) : (
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
                    
                    <div className="bg-white rounded-lg p-4 mb-6 border border-gray-200">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-gray-700">Benchmark do setor:</span>
                        <span className="font-semibold">{results.benchmark.toFixed(1)}x</span>
                      </div>
                      <Progress value={results.percentOfBenchmark} className="h-2" />
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>Abaixo da média</span>
                        <span>Acima da média</span>
                      </div>
                    </div>
                    
                    <div className="bg-primary-50 border border-primary-100 rounded-lg p-4 mb-6">
                      <div className="flex">
                        <div className="flex-shrink-0">
                          <LightbulbIcon className="h-5 w-5 text-primary" />
                        </div>
                        <div className="ml-3">
                          <h4 className="text-sm font-medium text-primary-800">Análise personalizada</h4>
                          <p className="mt-1 text-sm text-primary-700">
                            {results.analysis}
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-center">
                      <Button className="inline-flex items-center justify-center">
                        Fale com um especialista
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Calculator;
