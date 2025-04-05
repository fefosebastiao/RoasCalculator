import { pgTable, text, serial, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const leads = pgTable("leads", {
  id: serial("id").primaryKey(),
  email: text("email").notNull(),
  adSpend: integer("ad_spend").notNull(),
  revenue: integer("revenue").notNull(),
  industry: text("industry").notNull(),
  channel: text("channel").notNull(),
  calculatedRoas: text("calculated_roas").notNull(),
  createdAt: text("created_at").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertLeadSchema = createInsertSchema(leads).pick({
  email: true,
  adSpend: true,
  revenue: true,
  industry: true,
  channel: true,
  calculatedRoas: true,
  createdAt: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertLead = z.infer<typeof insertLeadSchema>;
export type Lead = typeof leads.$inferSelect;

export const calculatorSchema = z.object({
  industry: z.string().min(1, "Insira um valor válido: selecione um setor"),
  monthlySales: z.number().min(1, "Insira um valor válido: o número deve ser maior que zero"),
  averageSaleValue: z.number().min(1, "Insira um valor válido: o valor deve ser maior que zero"),
  monthlyLeads: z.number().min(1, "Insira um valor válido: o número deve ser maior que zero"),
  adSpend: z.number().min(1, "Insira um valor válido: o valor deve ser maior que zero"),
  revenue: z.number().min(1, "Insira um valor válido: o valor deve ser maior que zero"),
});

export type CalculatorFormData = z.infer<typeof calculatorSchema>;

export const leadSchema = calculatorSchema.extend({
  email: z.string().email("Insira um valor válido: formato de email inválido"),
  channel: z.string().optional().default("website"),
});

export type CalculatorResults = {
  roas: number;
  benchmark: number;
  analysis: string;
  percentOfBenchmark: number;
};
