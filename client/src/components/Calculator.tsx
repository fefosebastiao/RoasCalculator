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
      industry: "",
      monthlySales: undefined,
      averageSaleValue: undefined,
      monthlyLeads: undefined,
      adSpend: undefined,
      revenue: undefined
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
                          <FormLabel>Investimento mensal (R$)</FormLabel>
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
                          <FormLabel>Receita mensal (R$)</FormLabel>
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
                          <FormLabel>Qual é o seu setor?</FormLabel>
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
                      name="monthlySales"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Quantas vendas seu negócio faz no mês?</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="50" 
                              type="number" 
                              {...field} 
                              onChange={(e) => field.onChange(e.target.valueAsNumber)}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="averageSaleValue"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Qual é o valor médio de uma venda? (R$)</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <span className="text-gray-500 sm:text-sm">R$</span>
                              </div>
                              <Input 
                                placeholder="400" 
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
                      name="monthlyLeads"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Quantos compradores entram em contato por mês?</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="150" 
                              type="number" 
                              {...field} 
                              onChange={(e) => field.onChange(e.target.valueAsNumber)}
                            />
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
