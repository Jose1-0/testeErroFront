import { Component, OnInit } from '@angular/core';
import { LancamentoVendasService } from '../../services/lancamento-vendas.service';

@Component({
  selector: 'app-lancamento-vendas',
  templateUrl: './lancamento-vendas.component.html',
  styleUrls: ['./lancamento-vendas.component.scss'],
})
export class LancamentoVendasComponent implements OnInit {
  produtos: any[] = []; // Lista de produtos disponíveis
  carrinho: any[] = []; // Itens no carrinho
  total: number = 0; // Total da venda

  constructor(private vendasService: LancamentoVendasService) {}

  ngOnInit() {
    this.carregarProdutos();

  }

  // Carrega a lista de produtos do backend
  carregarProdutos() {
    this.vendasService.listarProdutos().subscribe((response: any[]) => {
      this.produtos = response;
    });
  }

  adicionarAoCarrinho(produto: any) {
    const itemExistente = this.carrinho.find(
      (item) => item.id === produto.id
    );
  
    // Caso o produto já esteja no carrinho
    if (itemExistente) {
      console.log(itemExistente.quantidade, "35");
      if (itemExistente.quantidade >= produto.quantidade) {
        console.log(produto, "37");
        alert(`Estoque insuficiente para o produto: ${produto.nome}`);
        return;
      }
      itemExistente.quantidade++;
      itemExistente.subtotal += produto.precoVenda;
    } else {
      // Caso o produto não esteja no carrinho
      if (produto.estoque <= 0) {
        console.log("if verifica quanrtidade ", produto);
        alert(`O produto ${produto.nome} está sem estoque.`);
        return;
      }
      this.carrinho.push({
        id: produto.id,
        nome: produto.nome,
        preco: produto.precoVenda,
        quantidade: 1,
        subtotal: produto.precoVenda,
      });
    }
  
    // Atualiza o total do carrinho
    this.calcularTotal();
  }
  
  // Calcula o total da venda
  calcularTotal() {
    this.total = this.carrinho.reduce(
      (acc, item) => acc + item.subtotal,
      0
    );
  }

  // Finaliza a venda e envia para o backend
  finalizarVenda() {
    const venda = {
      itens: this.carrinho.map((item) => ({
        produtoId: item.id,
        quantidade: item.quantidade,
      })),
    };
    this.vendasService.realizarVenda(venda).subscribe(() => {
      alert('Venda realizada com sucesso!');
      this.carrinho = [];
      this.total = 0;
    });
  }

  // Remove um produto do carrinho
  removerDoCarrinho(produtoId: number) {
    const index = this.carrinho.findIndex((item) => item.id === produtoId);
    if (index !== -1) {
      this.carrinho.splice(index, 1); // Remove o item do array
      this.calcularTotal(); // Recalcula o total após a remoção
    }
  }
}
