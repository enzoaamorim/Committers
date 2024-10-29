document.getElementById("editOrderForm").addEventListener("submit", function(event) {
    event.preventDefault();
    // Aqui você pode adicionar a lógica para enviar os dados do pedido para o servidor
    // Exemplo: fetch('/api/orders/edit', { method: 'POST', body: new FormData(this) });
    alert("Pedido atualizado com sucesso!");
});
