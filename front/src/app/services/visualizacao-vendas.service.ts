import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class VisualizacaoVendasService {
  private baseUrl = 'http://localhost:8081/api/vendas';

  constructor(private http: HttpClient) {}

  // Método para obter as vendas mensais
  obterVendasMensais(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/vendas-mensais`).pipe(
      catchError((error) => {
        console.error('Erro ao obter vendas mensais:', error);
        return throwError(() => new Error('Falha ao obter vendas mensais.'));
      })
    );
  }
}
