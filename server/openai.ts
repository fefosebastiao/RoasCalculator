import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
export async function generateROASAnalysis(formData: any): Promise<string> {
  try {
    const { industry, serviceOrProduct, monthlySales, adSpend, revenue, roas, benchmark } = formData;
    
    const prompt = `
      Como especialista em marketing digital e ROAS (Return on Ad Spend), forneça uma análise personalizada 
      dos seguintes dados de publicidade digital:
      
      - Setor/Indústria: ${industry}
      - Emite notas de: ${serviceOrProduct}
      - Vendas mensais: ${monthlySales}
      - Investimento em anúncios: R$ ${adSpend}
      - Faturamento mensal: R$ ${revenue}
      - ROAS atual: ${roas.toFixed(2)}x
      - Benchmark do setor: ${benchmark.toFixed(2)}x
      
      Forneça uma análise concisa e personalizada com no máximo 3 parágrafos que:
      1. Explique a performance atual comparando com a média do setor
      2. Identifique possíveis áreas de melhoria ou destaque pontos fortes
      3. Sugira estratégias específicas para otimizar o ROAS
      
      Responda em português, use linguagem acessível, e mantenha um tom profissional e encorajador.
      Seja específico e leve em consideração o setor em suas recomendações.
    `;
    
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "Você é um especialista em marketing digital e análise de ROAS (Return on Ad Spend), com conhecimento profundo sobre otimização de campanhas publicitárias em diferentes setores. Seu papel é fornecer análises personalizadas, práticas e acionáveis para ajudar empresas a melhorar o retorno sobre seus investimentos em anúncios."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 500,
    });
    
    return response.choices[0].message.content || "Não foi possível gerar uma análise personalizada no momento.";
  } catch (error) {
    console.error("Erro ao gerar análise com OpenAI:", error);
    return "Não foi possível gerar uma análise personalizada no momento. Por favor, tente novamente mais tarde.";
  }
}