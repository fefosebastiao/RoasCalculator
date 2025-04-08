# Calculadora ROAS - InfinitePay

Uma calculadora avançada de ROAS (Return on Ad Spend), fornecendo análises personalizadas e insights gerados por IA para otimizar campanhas de marketing.

![Calculadora ROAS](generated-icon.png)

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
