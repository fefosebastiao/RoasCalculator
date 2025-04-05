import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertLeadSchema, calculatorSchema, leadSchema } from "@shared/schema";
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
        channel: validatedData.channel,
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
      
      // Calculate ROAS
      const roas = validatedData.revenue / validatedData.adSpend;
      
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
      
      res.json({
        roas,
        benchmark,
        analysis,
        percentOfBenchmark
      });
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
