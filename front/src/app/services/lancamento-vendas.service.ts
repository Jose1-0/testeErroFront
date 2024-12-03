import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LancamentoVendasService {
  private baseUrl = 'http://localhost:8081/api/vendas'; // Base URL do backend
  private produtosUrl = 'http://localhost:8081/api/vendas/listar'; // Endpoint para listar produtos
  private apiUrl = 'http://localhost:8081/api';

  constructor(private http: HttpClient) {}

  // Lista todos os produtos disponíveis
  listarProdutos(): Observable<any[]> {
    return this.http.get<any[]>(this.produtosUrl).pipe(
      catchError(error => {
        console.error('Erro ao listar produtos:', error);
        return of([]); // Retorna um array vazio em caso de erro
      })
    );
  }

  // Verifica os detalhes de um produto
  verificarProduto(produtoId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/verificar-produto/${produtoId}`);
  }

  // Verifica o estoque de um produto
  verificarEstoque(produtoId: number, quantidadeVendida: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/verificar-estoque/${produtoId}/${quantidadeVendida}`);
  }

  // Calcula o valor da venda para um produto e quantidade específica
  calcularValorVenda(produtoId: number, quantidadeVendida: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/calcular-valor-venda/${produtoId}/${quantidadeVendida}`);
  }

  // Registra uma venda no backend
  realizarVenda(venda: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/realizar`, venda);
  }
  /**
   * Lista todas as vendas realizadas
   */
  listarVendas(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/listar`);
  }

listarVendasMensais(): Observable<any[]> {
  return this.http.get<any[]>(`${this.baseUrl}/vendas-mensais`).pipe(
    catchError(error => {
      console.error('Erro ao carregar vendas mensais:', error);
      return of([]); // Retorna um array vazio em caso de erro
    })
  );
}


}
