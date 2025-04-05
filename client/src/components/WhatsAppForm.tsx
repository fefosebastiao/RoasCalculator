import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";

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

const whatsAppFormSchema = z.object({
  name: z.string().min(2, { message: "O nome deve ter pelo menos 2 caracteres" }),
  phone: z.string().min(11, { message: "Número inválido" }).max(15),
});

type WhatsAppFormValues = z.infer<typeof whatsAppFormSchema>;

const WhatsAppForm = () => {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  const form = useForm<WhatsAppFormValues>({
    resolver: zodResolver(whatsAppFormSchema),
    defaultValues: {
      name: "",
      phone: "",
    },
  });

  const onSubmit = (data: WhatsAppFormValues) => {
    // Formatar o número de telefone para garantir que ele comece com o código do país
    const phone = data.phone.startsWith("55") ? data.phone : `55${data.phone}`;
    
    // Criar mensagem personalizada
    const message = encodeURIComponent(
      `Olá! Meu nome é ${data.name} e estou interessado em saber mais sobre as soluções de ROAS.`
    );
    
    // Construir URL do WhatsApp com o número e a mensagem
    const whatsappUrl = `https://wa.me/${phone}?text=${message}`;
    
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