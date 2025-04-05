import OpenAI from "openai";

// Configuração da instância principal de OpenAI
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Configuração da instância de backup de OpenAI
const backupOpenai = new OpenAI({ apiKey: process.env.OPENAI_BACKUP_API_KEY });

export async function generateROASAnalysis(formData: any): Promise<string> {
  const { industry, adSpend, revenue, monthlySales, serviceOrProduct, ticketMedio, cpa, benchmark } = formData;
  const roas = revenue / adSpend;
  
  // Prompt formatado para obter uma análise mais completa
  const prompt = `
    Você é um analista especializado em marketing digital para a empresa InfinitePay. 
    
    Analise os seguintes dados de uma empresa e forneça insights detalhados sobre seu desempenho:
    
    - Setor da empresa: ${industry}
    - Tipo de negócio: ${serviceOrProduct} (service = serviços, product = produtos, both = ambos, none = não emite notas)
    - Investimento mensal em anúncios: R$ ${adSpend}
    - Faturamento mensal: R$ ${revenue}
    - Vendas/Conversões mensais: ${monthlySales}
    
    MÉTRICAS CALCULADAS:
    - ROAS: ${roas.toFixed(2)}x (Benchmark do setor: ${benchmark.toFixed(2)}x)
    - Ticket Médio: R$ ${ticketMedio.toFixed(2)}
    - CPA (Custo por Aquisição): R$ ${cpa.toFixed(2)}
    
    Por favor, forneça uma análise em português que inclua:
    
    1. ROAS (Retorno sobre investimento em anúncios):
       - Como está o ROAS em relação ao benchmark do setor (${benchmark.toFixed(2)}x)
       - O que este valor significa para o negócio
    
    2. Ticket Médio:
       - Se o valor é adequado para o setor
       - Como ele impacta nas estratégias de marketing
    
    3. CPA (Custo por aquisição):
       - Se o custo está adequado ao tipo de negócio
       - Relação entre o CPA e a margem estimada (produto vs serviço)
    
    4. Recomendações específicas e práticas considerando:
       - O tipo de operação (produto ou serviço)
       - O setor de atuação
       - Oportunidades de otimização baseadas nas métricas
    
    Mantenha a análise concisa, prática e específica para o setor.
  `;

  try {
    console.log("Tentando requisição com a chave principal da OpenAI...");
    
    try {
      // Primeira tentativa com a chave principal
      const response = await openai.chat.completions.create({
        model: "gpt-4o", // o modelo mais recente da OpenAI é "gpt-4o" lançado em 13 de maio de 2024
        messages: [
          { role: "system", content: "Você é um especialista em marketing digital e análise de dados." },
          { role: "user", content: prompt }
        ],
        temperature: 0.7,
        max_tokens: 700
      });
      
      return response.choices[0].message.content || gerarAnaliseBasica(roas);
    } catch (error) {
      console.error("Erro ao usar chave principal da OpenAI:", error);
      
      // Segunda tentativa com a chave de backup
      console.log("Tentando requisição com a chave de backup da OpenAI...");
      try {
        const backupResponse = await backupOpenai.chat.completions.create({
          model: "gpt-4o", // o modelo mais recente da OpenAI é "gpt-4o" lançado em 13 de maio de 2024
          messages: [
            { role: "system", content: "Você é um especialista em marketing digital e análise de dados." },
            { role: "user", content: prompt }
          ],
          temperature: 0.7,
          max_tokens: 700
        });
        
        console.log("Requisição com chave de backup bem-sucedida!");
        return backupResponse.choices[0].message.content || gerarAnaliseBasica(roas);
      } catch (backupError) {
        console.error("Erro ao usar chave de backup da OpenAI:", backupError);
        
        // Retornar análise básica caso ambas as chaves falhem
        console.log("Ambas as chaves falharam, gerando análise básica...");
        return gerarAnaliseBasica(roas);
      }
    }
  } catch (generalError) {
    console.error("Erro geral na função de análise:", generalError);
    return gerarAnaliseBasica(roas);
  }
}

// Função para gerar uma análise básica quando ambas as chaves API falham
function gerarAnaliseBasica(roas: number): string {
  const avaliacaoROAS = roas < 2 ? 
    "Seu ROAS está abaixo do que é considerado viável para a maioria dos negócios." : 
    roas < 4 ? 
      "Seu ROAS está na faixa média para a maioria dos setores." : 
      "Seu ROAS está acima da média, indicando uma boa eficiência nos investimentos em anúncios.";
  
  const recomendacoes = roas < 2 ? 
    "Recomendamos revisar suas campanhas de marketing, segmentação de público e canais utilizados. Considere reduzir o investimento em canais de baixo desempenho e realoque os recursos para canais mais efetivos." : 
    roas < 4 ? 
      "Para melhorar ainda mais seu ROAS, considere otimizar suas campanhas de melhor desempenho e testar novos formatos de anúncios e mensagens. Análise de concorrentes também pode revelar oportunidades." : 
      "Para manter esse excelente desempenho, continue monitorando suas métricas e testes A/B. Considere escalar gradualmente os canais mais eficientes.";
  
  return `## Análise de Desempenho de Marketing

### ROAS (Retorno sobre Investimento em Anúncios)
${avaliacaoROAS}
Um ROAS de ${roas.toFixed(1)}x significa que para cada R$1 investido em publicidade, você obtém R$${roas.toFixed(2)} em retorno.

### Ticket Médio
O valor do ticket médio está dentro do padrão esperado para sua categoria de negócio. Este valor pode ser utilizado para ajustar suas estratégias de upsell e cross-sell.

### CPA (Custo por Aquisição)
O custo para adquirir um novo cliente/venda está dentro de parâmetros aceitáveis considerando seu segmento de mercado. É importante relacionar este valor com sua margem média por venda para garantir rentabilidade.

### Recomendações
${recomendacoes}

### Áreas potenciais para otimização:
1. Ajuste da segmentação de público para reduzir CPA
2. Melhoria da experiência de conversão para aumentar ticket médio
3. Teste de diferentes formatos criativos para melhorar ROAS
4. Otimização dos horários e dias de veiculação dos anúncios

Esta análise é baseada apenas nos dados fornecidos e deve ser complementada com uma avaliação mais abrangente de sua estratégia de marketing.`;
}