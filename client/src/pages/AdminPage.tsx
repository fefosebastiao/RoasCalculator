import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Lead } from "@shared/schema";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDistanceToNow, format } from "date-fns";
import { ptBR } from "date-fns/locale";

export default function AdminPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const { data: leads, isLoading, error } = useQuery<Lead[]>({
    queryKey: ["/api/leads"],
  });

  // Ordenar leads por data de criação (mais recentes primeiro)
  const sortedLeads = leads?.slice().sort((a, b) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  // Paginação
  const totalPages = sortedLeads ? Math.ceil(sortedLeads.length / pageSize) : 0;
  const paginatedLeads = sortedLeads?.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  // Formatar valores para exibição
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  // Formatar data relativa
  const formatRelativeDate = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      return formatDistanceToNow(date, { addSuffix: true, locale: ptBR });
    } catch (e) {
      return dateStr;
    }
  };

  // Formatar data completa
  const formatFullDate = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      return format(date, "dd/MM/yyyy HH:mm", { locale: ptBR });
    } catch (e) {
      return dateStr;
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6">Painel Administrativo - Leads</h1>
        <p>Carregando dados...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6">Painel Administrativo - Leads</h1>
        <p className="text-red-500">Erro ao carregar dados: {(error as Error).message}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Painel Administrativo - Leads</h1>
      
      {/* Resumo */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Total de Leads</CardTitle>
            <CardDescription>Todos os leads capturados</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{leads?.length || 0}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Leads do WhatsApp</CardTitle>
            <CardDescription>Contatos via WhatsApp</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">
              {leads?.filter(lead => lead.channel === "whatsapp").length || 0}
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Leads do Site</CardTitle>
            <CardDescription>Contatos via formulário</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">
              {leads?.filter(lead => lead.channel === "website").length || 0}
            </p>
          </CardContent>
        </Card>
      </div>
      
      {/* Tabela de Leads */}
      <div className="border rounded-lg overflow-hidden mb-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">ID</TableHead>
              <TableHead>Nome/Email</TableHead>
              <TableHead>Telefone</TableHead>
              <TableHead>Canal</TableHead>
              <TableHead>Indústria</TableHead>
              <TableHead>Investimento</TableHead>
              <TableHead>Faturamento</TableHead>
              <TableHead>ROAS</TableHead>
              <TableHead>Data</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedLeads && paginatedLeads.length > 0 ? (
              paginatedLeads.map((lead) => (
                <TableRow key={lead.id}>
                  <TableCell>{lead.id}</TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{lead.name || "N/A"}</p>
                      <p className="text-sm text-gray-500">{lead.email}</p>
                    </div>
                  </TableCell>
                  <TableCell>{lead.phone || "N/A"}</TableCell>
                  <TableCell>
                    <span className={`inline-block px-2 py-1 rounded-full text-xs ${
                      lead.channel === "whatsapp" 
                        ? "bg-green-100 text-green-800" 
                        : "bg-blue-100 text-blue-800"
                    }`}>
                      {lead.channel === "whatsapp" ? "WhatsApp" : "Website"}
                    </span>
                  </TableCell>
                  <TableCell>{lead.industry}</TableCell>
                  <TableCell>{formatCurrency(lead.adSpend)}</TableCell>
                  <TableCell>{formatCurrency(lead.revenue)}</TableCell>
                  <TableCell>
                    <span className={`font-medium ${
                      parseFloat(lead.calculatedRoas) >= 2 
                        ? "text-green-600" 
                        : parseFloat(lead.calculatedRoas) >= 1 
                          ? "text-amber-600" 
                          : "text-red-600"
                    }`}>
                      {parseFloat(lead.calculatedRoas).toFixed(2)}x
                    </span>
                  </TableCell>
                  <TableCell>
                    <span title={formatFullDate(lead.createdAt)}>
                      {formatRelativeDate(lead.createdAt)}
                    </span>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={9} className="text-center py-4">
                  Nenhum lead encontrado
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      
      {/* Paginação */}
      {totalPages > 1 && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious 
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
              />
            </PaginationItem>
            
            {Array.from({ length: totalPages }).map((_, i) => (
              <PaginationItem key={i}>
                <PaginationLink 
                  onClick={() => setCurrentPage(i + 1)}
                  isActive={currentPage === i + 1}
                >
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            
            <PaginationItem>
              <PaginationNext 
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
}