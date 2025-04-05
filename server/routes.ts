import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertLeadSchema, calculatorSchema, leadSchema } from "@shared/schema";
import { generateROASAnalysis } from "./openai";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // API endpoint for saving a lead from calculator form
  app.post("/api/leads", async (req, res) => {
    try {
      // Validate the request body
      const validatedData = leadSchema.parse(req.body);
      
      // Calculate ROAS
      const roas = validatedData.revenue / validatedData.adSpend;
      
      // Create a lead
      const lead = await storage.createLead({
        email: validatedData.email,
        adSpend: validatedData.adSpend,
        revenue: validatedData.revenue,
        industry: validatedData.industry,
        channel: "website", // Default channel
        calculatedRoas: roas.toFixed(2),
        createdAt: new Date().toISOString(),
      });
      
      res.status(201).json(lead);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Validation error", errors: error.errors });
      }
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // API endpoint for calculating ROAS without saving a lead
  app.post("/api/calculate-roas", async (req, res) => {
    try {
      // Validate the request body
      const validatedData = calculatorSchema.parse(req.body);
      
      // 1. Calculate ROAS (Retorno sobre investimento em anúncios)
      const roas = validatedData.revenue / validatedData.adSpend;
      
      // 2. Calculate Ticket Médio (Valor médio por venda ou conversão)
      const ticketMedio = validatedData.revenue / validatedData.monthlySales;
      
      // 3. Calculate CPA (Custo por Aquisição)
      const cpa = validatedData.adSpend / validatedData.monthlySales;
      
      // Get benchmark for the industry
      const industryBenchmarks: Record<string, number> = {
        ecommerce: 4.0,
        retail: 3.5,
        saas: 5.0,
        finance: 4.2,
        education: 3.8,
        healthcare: 3.0,
        travel: 3.2,
        realestate: 2.8,
        other: 3.5
      };
      
      const benchmark = industryBenchmarks[validatedData.industry] || 3.5;
      
      // Generate basic analysis (fallback if OpenAI fails)
      let basicAnalysis = "";
      if (roas < benchmark * 0.8) {
        basicAnalysis = `Seu ROAS está abaixo da média para o setor (${benchmark.toFixed(1)}x). Considere revisar suas estratégias de segmentação e criativo para melhorar a eficiência.`;
      } else if (roas >= benchmark * 0.8 && roas <= benchmark * 1.2) {
        basicAnalysis = `Seu ROAS está dentro da média para o setor (${benchmark.toFixed(1)}x). Continue otimizando suas campanhas para maximizar o retorno.`;
      } else {
        basicAnalysis = `Seu ROAS está acima da média para o setor (${benchmark.toFixed(1)}x). Considere aumentar gradualmente seu orçamento publicitário para escalar seus resultados mantendo a eficiência.`;
      }

      // 4. Calculate percentage of benchmark (for the indicator)
      const percentOfBenchmark = Math.min(Math.max((roas / benchmark) * 100, 5), 100);
      
      // 5. Generate AI-powered personalized analysis
      try {
        // Create data object for OpenAI
        const analysisData = {
          ...validatedData,
          roas,
          benchmark,
          ticketMedio,
          cpa,
          monthlySales: validatedData.monthlySales,
          serviceOrProduct: validatedData.serviceOrProduct
        };
        
        // Get AI analysis
        const aiAnalysis = await generateROASAnalysis(analysisData);
        
        res.json({
          roas,
          benchmark,
          percentOfBenchmark,
          ticketMedio,
          cpa,
          analysis: aiAnalysis || basicAnalysis
        });
      } catch (aiError) {
        console.error("Error generating AI analysis:", aiError);
        // Fallback to basic analysis if AI fails
        res.json({
          roas,
          benchmark,
          percentOfBenchmark,
          ticketMedio,
          cpa,
          analysis: basicAnalysis
        });
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Validation error", errors: error.errors });
      }
      res.status(500).json({ message: "Internal server error" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
