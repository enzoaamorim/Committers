document.addEventListener('DOMContentLoaded', () => {
    const carrinhoItens = JSON.parse(localStorage.getItem('carrinho')) || [];
    const carrinhoTabela = document.getElementById('carrinho-itens');

    carrinhoItens.forEach(produto => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${produto.nome}</td>
            <td><input type="number" class="form-control" value="${produto.quantidade}" min="1"></td>
            <td>R$ ${produto.preco.toFixed(2).replace('.', ',')}</td>
            <td><button class="btn btn-primary btn-sm btn-remove">Remover</button></td>
        `;
        carrinhoTabela.appendChild(row);
    });

    updateTotal();

    // Atualizar total e quantidade
    const quantityInputs = document.querySelectorAll('input[type="number"]');
    quantityInputs.forEach(input => {
        input.addEventListener('input', updateTotal);
    });

    // Remover item do carrinho
    const removeButtons = document.querySelectorAll('.btn-remove');
    removeButtons.forEach(button => {
        button.addEventListener('click', function () {
            const row = this.closest('tr');
            const nomeProduto = row.cells[0].innerText;
            row.remove();
            atualizarCarrinhoLocalStorage(nomeProduto);
            updateTotal();
        });
    });

    function updateTotal() {
        let total = 0;
        document.querySelectorAll('#carrinho-itens tr').forEach(row => {
            const preco = parseFloat(row.cells[2].innerText.replace('R$ ', '').replace(',', '.'));
            const quantidade = parseInt(row.cells[1].querySelector('input').value);
            total += preco * quantidade;
        });
        document.getElementById('total').innerText = `R$ ${total.toFixed(2).replace('.', ',')}`;
    }

    function atualizarCarrinhoLocalStorage(nome) {
        let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
        carrinho = carrinho.filter(item => item.nome !== nome);
        localStorage.setItem('carrinho', JSON.stringify(carrinho));
    }
});
