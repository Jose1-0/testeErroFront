import { Component, OnInit } from '@angular/core';
import { VisualizacaoVendasService } from '../../services/visualizacao-vendas.service';
import { Chart, LinearScale, CategoryScale, PointElement, LineElement, Title, Tooltip, Legend, LineController } from 'chart.js';

@Component({
  selector: 'app-visualizacao-vendas',
  templateUrl: './visualizacao-vendas.component.html',
  styleUrls: ['./visualizacao-vendas.component.scss'],
})
export class VisualizacaoVendasComponent implements OnInit {
  vendas: any[] = [];

  constructor(private visualizacaoVendasService: VisualizacaoVendasService) {}

  ngOnInit() {
    // Registre os módulos necessários do Chart.js
    Chart.register(
      LinearScale,
      CategoryScale,
      PointElement,
      LineElement,
      Title,
      Tooltip,
      Legend,
      LineController // Registre o controlador de linha aqui
    );

    // Chame a função para buscar os dados da API
    this.visualizacaoVendasService.obterVendasMensais().subscribe(
      (dados) => {
        this.vendas = dados;
        this.criarGrafico();
      },
      (erro) => {
        console.error('Erro ao carregar dados das vendas mensais', erro);
      }
    );
  }

  criarGrafico() {
    const ctx = document.getElementById('graficoLinhas') as HTMLCanvasElement;

    if (ctx) {
      // Inicialize o gráfico de linhas
      const grafico = new Chart(ctx, {
        type: 'line', // Defina o tipo do gráfico como 'line'
        data: {
          labels: this.vendas.map((venda) => venda.mes), // Use os meses do retorno da API
          datasets: [
            {
              label: 'Valor de Vendas',
              data: this.vendas.map((venda) => venda.valorVenda), // Use o valorVenda da API
              fill: false,
              borderColor: 'rgb(75, 192, 192)',
              tension: 0.1,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            title: {
              display: true,
              text: 'Valor Mensal das Vendas',
            },
            tooltip: {
              callbacks: {
                label: function (context) {
                  // Asegure-se de que context.raw é um número
                  const value = context.raw as number; // Faça o cast do valor como número
                  return `R$ ${value.toFixed(2)}`;
                },
              },
            },
          },
        },
      });
    }
  }
}
