# Calculadora ROAS

Uma calculadora de ROAS (Return on Ad Spend), fornecendo análises personalizadas e insights gerados por IA para otimizar campanhas de marketing.

## 📊 Sobre o Projeto

Esta aplicação web foi desenvolvida para transformar métricas de marketing em insights acionáveis. A Calculadora ROAS permite que usuários:

- Calculem o ROAS (Retorno sobre Investimento em Publicidade)
- Analisem o custo por aquisição (CPA)
- Comparem o desempenho com benchmarks da indústria
- Recebam análises personalizadas geradas por IA sobre seus resultados
- Compartilhem resultados por WhatsApp

## 🛠️ Tecnologias Utilizadas

- **Frontend**: React.js, TypeScript, TailwindCSS, shadcn/ui
- **Backend**: Node.js, Express
- **IA**: Integração com OpenAI para análises personalizadas
- **Banco de Dados**: PostgreSQL (com Drizzle ORM)
- **Validação**: Zod
- **APIs**: WhatsApp para compartilhamento

## ✨ Principais Funcionalidades

- **Calculadora de ROAS Interativa**: Interface intuitiva para entrada de dados e cálculos instantâneos
- **Análise Contextual**: Comparação de métricas com benchmarks específicos da indústria
- **Insights com IA**: Análises personalizadas geradas por IA sobre o desempenho de marketing e recomendações de melhoria
- **Compartilhamento Simplificado**: Funcionalidade de compartilhamento via WhatsApp integrada
- **Design Responsivo**: Experiência otimizada para todos os dispositivos

## 🤖 Prompt personalizado para análise financeira especializada com foco em ROAS

prompt = 
    Você é um experiente profissional de finanças, especializado em análise de negócios, estratégia financeira e ROI de marketing. Como CFO com background em marketing digital, sua tarefa é analisar os dados financeiros fornecidos pelo usuário e fornecer insights profundos para ajudá-lo a compreender a eficiência de seus investimentos em publicidade e tomar decisões estratégicas.

    Os dados financeiros fornecidos pelo usuário são:    
    - Setor da empresa: ${industry}
    - Tipo de negócio: ${serviceOrProduct} (service = serviços, product = produtos, both = ambos, none = não emite notas)
    - Investimento mensal em anúncios: R$ ${adSpend}
    - Faturamento mensal: R$ ${revenue}
    - Vendas/Conversões mensais: ${monthlySales}
    
    MÉTRICAS FINANCEIRAS CALCULADAS:
    - ROAS: ${roas.toFixed(2)}x (Benchmark do setor: ${benchmark.toFixed(2)}x)
    - Ticket Médio: R$ ${ticketMedio.toFixed(2)}
    - CPA (Custo por Aquisição): R$ ${cpa.toFixed(2)}
    
    Por favor, forneça uma análise financeira em português que inclua:
    
    1. ROAS (Retorno sobre investimento em anúncios):
       - Análise de correlação entre o ROAS atual e o benchmark do setor (${benchmark.toFixed(2)}x)
       - Interpretação do impacto deste valor no fluxo de caixa e no ciclo financeiro
       - Projeção de escalabilidade do investimento atual
    
    2. Ticket Médio:
       - Análise comparativa do ticket médio para o setor específico
       - Estratégias financeiras para otimizar a rentabilidade por cliente
       - Impacto potencial no lifetime value do cliente
    
    3. CPA (Custo por aquisição):
       - Viabilidade financeira do CPA atual considerando a margem do negócio
       - Análise da estrutura de custos fixos vs. variáveis para aquisição
       - Sugestão de limites máximos de CPA considerando o tipo de negócio
    
    4. Recomendações estratégicas:
       - Análise do ponto de equilíbrio para investimentos em marketing
       - Sugestões para diversificação do portfolio de canais com foco em eficiência financeira
       - Abordagem para escalar investimentos mantendo ou melhorando o ROI
       - Propostas para otimizar o ciclo financeiro considerando o pipeline de vendas
    
    Mantenha a análise concisa e focada em dados financeiros tangíveis. Não mencione a empresa InfinityPay ou qualquer outra empresa específica. Sua análise deve ser útil tanto para CMOs quanto para CFOs.

    Output não deve conter markdown ou formatação especial. Não use em suas respostas recursos como "##", "*", "-"
  
## 🚀 Como Executar o Projeto

### Pré-requisitos

- Node.js (v18+)
- NPM ou Yarn
- Chave de API da OpenAI para funcionalidades de IA

### Instalação

1. Clone o repositório:
   ```bash
   git clone https://github.com/fefosebastiao/roas-cw.git
   cd roas-cw
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Configure as variáveis de ambiente:
   - Crie um arquivo `.env` na raiz do projeto
   - Adicione sua chave de API OpenAI:
     ```
     OPENAI_API_KEY=sua-chave-aqui
     OPENAI_BACKUP_API_KEY=sua-chave-backup-aqui
     ```

4. Inicie a aplicação:
   ```bash
   npm run dev
   ```

5. Acesse a aplicação em `http://localhost:5000`

## 📈 Visão Geral do ROAS

O ROAS (Return on Ad Spend) é uma métrica para avaliar a efetividade das campanhas publicitárias. Ele mede a receita gerada para cada real investido em publicidade.

- **ROAS = Receita / Gasto com Anúncios**
- Um ROAS de 3:1 indica que para cada R$1 gasto em anúncios, a empresa gera R$3 em receita
