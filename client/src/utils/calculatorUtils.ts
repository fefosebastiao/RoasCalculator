import { CalculatorFormData, CalculatorResults } from "@shared/schema";
import { industryBenchmarks } from "@/data/industryBenchmarks";

export const calculateRoas = (data: CalculatorFormData): CalculatorResults => {
  const { adSpend, revenue, industry } = data;
  
  // Calculate ROAS
  const roas = revenue / adSpend;
  
  // Get benchmark for the industry
  const benchmark = industryBenchmarks[industry] || 3.5;
  
  // Generate analysis
  let analysis = "";
  if (roas < benchmark * 0.8) {
    analysis = `Seu ROAS está abaixo da média para o setor (${benchmark.toFixed(1)}x). Considere revisar suas estratégias de segmentação e criativo para melhorar a eficiência.`;
  } else if (roas >= benchmark * 0.8 && roas <= benchmark * 1.2) {
    analysis = `Seu ROAS está dentro da média para o setor (${benchmark.toFixed(1)}x). Continue otimizando suas campanhas para maximizar o retorno.`;
  } else {
    analysis = `Seu ROAS está acima da média para o setor (${benchmark.toFixed(1)}x). Considere aumentar gradualmente seu orçamento publicitário para escalar seus resultados mantendo a eficiência.`;
  }
  
  // Calculate percentage of benchmark (for the indicator)
  const percentOfBenchmark = Math.min(Math.max((roas / (benchmark * 2)) * 100, 5), 100);
  
  return {
    roas,
    benchmark,
    analysis,
    percentOfBenchmark
  };
};
