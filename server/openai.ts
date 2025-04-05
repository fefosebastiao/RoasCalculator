import OpenAI from "openai";

// Configuração da instância principal de OpenAI
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Configuração da instância de backup de OpenAI
const backupOpenai = new OpenAI({ apiKey: process.env.OPENAI_BACKUP_API_KEY });

export async function generateROASAnalysis(formData: any): Promise<string> {
  const { industry, adSpend, revenue, monthlySales, serviceOrProduct } = formData;
  const roas = revenue / adSpend;
  
  // Prompt formatado para obter uma análise mais completa
  const prompt = `
    Você é um analista especializado em marketing digital para a empresa InfinitePay. 
    
    Analise os seguintes dados de uma empresa e dê insights sobre seu ROAS (Retorno sobre Investimento em Anúncios):
    
    - Setor da empresa: ${industry}
    - Tipo de negócio: ${serviceOrProduct} (service = serviços, product = produtos, both = ambos, none = não emite notas)
    - Investimento mensal em anúncios: R$ ${adSpend}
    - Faturamento mensal: R$ ${revenue}
    - Vendas/Conversões mensais: ${monthlySales}
    - ROAS calculado: ${roas.toFixed(2)}
    
    Por favor, forneça uma análise detalhada em português que inclua:
    1. Uma avaliação do ROAS atual da empresa
    2. Comparação com médias do setor
    3. Recomendações específicas para melhorar o ROAS
    4. Potenciais áreas de otimização
    
    Mantenha a análise concisa (máximo de 300 palavras), prática e específica para o setor.
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
  
  return `Análise básica do seu ROAS:

${avaliacaoROAS}

Um ROAS de ${roas.toFixed(1)}x significa que para cada R$1 investido em publicidade, você obtém R$${roas.toFixed(2)} em retorno.

${recomendacoes}

Áreas potenciais para otimização:
1. Ajuste da segmentação de público
2. Melhoria da experiência de conversão no site
3. Teste de diferentes formatos criativos
4. Otimização dos horários e dias de veiculação dos anúncios

Essa análise é baseada apenas nos dados fornecidos e deve ser complementada com uma avaliação mais abrangente de sua estratégia de marketing.`;
}