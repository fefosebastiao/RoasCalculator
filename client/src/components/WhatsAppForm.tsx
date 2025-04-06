import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { whatsAppFormSchema, type CalculatorResults, type CalculatorFormData } from "@shared/schema";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";

type WhatsAppFormProps = {
  calculatorData?: CalculatorFormData;
  calculatorResults?: CalculatorResults;
};

type WhatsAppFormValues = z.infer<typeof whatsAppFormSchema>;

const WhatsAppForm = ({ calculatorData, calculatorResults }: WhatsAppFormProps = {}) => {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  const form = useForm<WhatsAppFormValues>({
    resolver: zodResolver(whatsAppFormSchema),
    defaultValues: {
      name: "",
      phone: "",
    },
  });

  // Mutation para salvar leads do WhatsApp
  const whatsAppLeadMutation = useMutation({
    mutationFn: async (data: WhatsAppFormValues) => {
      const response = await apiRequest("POST", "/api/whatsapp-leads", {
        ...data,
        calculatorData,
        calculatorResults,
      });
      return response.json();
    },
  });

  const onSubmit = (data: WhatsAppFormValues) => {
    // Salvar lead no banco de dados
    whatsAppLeadMutation.mutate(data, {
      onSuccess: () => {
        // Formatar o número de telefone para garantir que ele comece com o código do país
        const phone = data.phone.startsWith("55") ? data.phone : `55${data.phone}`;
        
        // Criar mensagem personalizada - versão mais curta
        let message = `Olá! Meu nome é ${data.name} e gostaria de mais informações.`;
        
        // Adicionar informações do cálculo se disponível - versão compacta
        if (calculatorResults) {
          message += ` ROAS: ${calculatorResults.roas.toFixed(2)}x`;
        }
        
        // Construir URL do WhatsApp com o número e a mensagem
        const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
        
        // Abrir WhatsApp em uma nova aba
        window.open(whatsappUrl, "_blank");
        
        // Fechar o dialog
        setOpen(false);
        
        // Exibir toast de confirmação
        toast({
          title: "Mensagem enviada!",
          description: "Você será redirecionado para o WhatsApp.",
        });
        
        // Limpar o formulário
        form.reset();
      },
      onError: (error) => {
        console.error("Erro ao salvar lead:", error);
        toast({
          title: "Erro ao processar solicitação",
          description: "Ocorreu um erro ao processar seus dados. Tente novamente.",
          variant: "destructive",
        });
      }
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="inline-flex items-center justify-center">
          Envie para meu WhatsApp
          <Send className="ml-2 h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Entre em contato via WhatsApp</DialogTitle>
          <DialogDescription>
            Preencha os dados abaixo para receber atendimento personalizado.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input placeholder="Digite seu nome" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>WhatsApp</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Ex: 11999999999" 
                      {...field} 
                      type="tel"
                      inputMode="numeric"
                    />
                  </FormControl>
                  <FormDescription>
                    Digite apenas números, incluindo DDD.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              Enviar
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default WhatsAppForm;