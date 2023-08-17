class CaixaDaLanchonete {

    constructor() {
        this.cardapio = {
            'cafe': { descricao: 'Café', valor: 3.00 },
            'chantily': { descricao: 'Chantily (extra do Café)',secundarioDo:"cafe", valor: 1.50 },
            'suco': { descricao: 'Suco Natural', valor: 6.20 },
            'sanduiche': { descricao: 'Sanduíche', valor: 6.50 },
            'queijo': { descricao: 'Queijo (extra do Sanduíche)',secundarioDo:"sanduiche", valor: 2.00 },
            'salgado': { descricao: 'Salgado', valor: 7.25 },
            'combo1': { descricao: '1 Suco e 1 Sanduíche', valor: 9.50 },
            'combo2': { descricao: '1 Café e 1 Sanduíche', valor: 7.50 }
        };

        this.formasPagamento = ['dinheiro', 'debito', 'credito'];
    }

    calcularValorDaCompra(formaPagamento, itens) {
        const pedido = {};
        itens.forEach(item => {
            const [itemCod, quantidade] = item.split(',');
            pedido[itemCod] = parseInt(quantidade);
        });
        
        let total = 0;
        
        if (Object.keys(pedido).length === 0) {
            return "Não há itens no carrinho de compra!";
        }
        
        for (let itemCod in pedido) {
            if (!this.cardapio.hasOwnProperty(itemCod)) {
                return "Item inválido!";
            }
            
            const itemSecundario = this.cardapio[itemCod]?.secundarioDo
            const itemPrincipal = pedido[itemSecundario]
            if(itemSecundario && !itemPrincipal) {
                return "Item extra não pode ser pedido sem o principal"
            }
            const itemInfo = this.cardapio[itemCod];
            const valorItem = itemInfo.valor;
            const qtd = pedido[itemCod];

            if (qtd <= 0) {
                return "Quantidade inválida!";
            }

            total += valorItem * qtd;
        }

        if (!this.formasPagamento.includes(formaPagamento)) {
            return "Forma de pagamento inválida!";
        }

        if (formaPagamento === 'dinheiro') {
            total *= 0.95;
        } else if (formaPagamento === 'credito') {
            total *= 1.03;
        }

        return `R$ ${total.toFixed(2).replace('.', ',')}`;
    }
}

export { CaixaDaLanchonete };
   