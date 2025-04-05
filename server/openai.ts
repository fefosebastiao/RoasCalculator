import OpenAI from "openai";

// Inicializa a instância principal com a chave primária
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Inicializa a instância de backup com a chave secundária
const openaiBackup = new OpenAI({ apiKey: process.env.OPENAI_BACKUP_API_KEY });

// the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
export async function generateROASAnalysis(formData: any): Promise<string> {
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
  
  const systemMessage = {
    role: "system" as const,
    content: "Você é um especialista em marketing digital e análise de ROAS (Return on Ad Spend), com conhecimento profundo sobre otimização de campanhas publicitárias em diferentes setores. Seu papel é fornecer análises personalizadas, práticas e acionáveis para ajudar empresas a melhorar o retorno sobre seus investimentos em anúncios."
  };
  
  const userMessage = {
    role: "user" as const,
    content: prompt
  };
  
  const requestOptions = {
    model: "gpt-4o",
    messages: [systemMessage, userMessage],
    temperature: 0.7,
    max_tokens: 500,
  };

  // Primeiro, tenta usar a chave principal
  try {
    console.log("Tentando requisição com a chave principal da OpenAI...");
    const response = await openai.chat.completions.create(requestOptions);
    console.log("Requisição com chave principal bem-sucedida!");
    return response.choices[0].message.content || "Não foi possível gerar uma análise personalizada no momento.";
  } catch (primaryError) {
    console.error("Erro ao usar chave principal da OpenAI:", primaryError);
    
    // Se falhar, tenta usar a chave de backup
    try {
      console.log("Tentando requisição com a chave de backup da OpenAI...");
      const backupResponse = await openaiBackup.chat.completions.create(requestOptions);
      console.log("Requisição com chave de backup bem-sucedida!");
      return backupResponse.choices[0].message.content || "Não foi possível gerar uma análise personalizada no momento.";
    } catch (backupError) {
      console.error("Erro ao usar chave de backup da OpenAI:", backupError);
      
      // Se ambas as tentativas falharem, retorna uma mensagem amigável
      return `
        Com base nos dados fornecidos, seu ROAS de ${roas.toFixed(2)}x ${roas > benchmark ? 'está acima' : 'está abaixo'} da média do setor (${benchmark.toFixed(2)}x).

        Recomendamos revisar sua estratégia de anúncios para otimizar os custos de aquisição e melhorar a taxa de conversão. Considere segmentar melhor seu público-alvo e refinar suas campanhas.

        Para melhorar seu ROAS, sugerimos analisar quais canais de marketing estão trazendo os melhores resultados, investir em otimização de landing pages e trabalhar no funil de conversão para aumentar as taxas de conclusão de vendas.
      `;
    }
  }
}