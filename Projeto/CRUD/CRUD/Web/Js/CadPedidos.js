document.addEventListener("DOMContentLoaded", function() {
    const pedidoForm = document.getElementById("pedidoForm");
  
    pedidoForm.addEventListener("submit", function(event) {
      event.preventDefault();
  
      const clienteNome = document.getElementById("clienteNome").value;
      const produto = document.getElementById("produto").value;
      const quantidade = document.getElementById("quantidade").value;
      const preco = document.getElementById("preco").value;
      const dataPedido = document.getElementById("dataPedido").value;

    });
  });