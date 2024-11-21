// Função para buscar pedidos da API
async function buscarPedidos() {
    try {
      // Substitua a URL pelo endpoint real do seu backend
      const response = await fetch("http://localhost:8080/pedido");
      if (!response.ok) {
        throw new Error("Erro ao buscar os pedidos");
      }
      const pedidos = await response.json();
      renderizarPedidos(pedidos);
    } catch (erro) {
      console.error(erro);
      alert("Não foi possível carregar os pedidos.");
    }
  }
  
  // Função para renderizar os pedidos na página
  function renderizarPedidos(pedidos) {
    const containerResumo = document.getElementById("resumoEndereco");
    containerResumo.innerHTML = ""; // Limpa o conteúdo existente
  
    pedidos.forEach((pedido) => {
      const pedidoDiv = document.createElement("div");
      pedidoDiv.className = "pedido";
  
      pedidoDiv.innerHTML = `
        <p><strong>Cliente:</strong> ${pedido.nomeDoCli}</p>
        <p><strong>Valor:</strong> R$ ${pedido.valor.toFixed(2)}</p>
        <p><strong>Quantidade:</strong> ${pedido.quantidade}</p>
        <p><strong>Endereço:</strong> ${pedido.logradouro}, ${pedido.numero || "S/N"} - ${pedido.bairro}, ${pedido.cidade} - ${pedido.uf}</p>
        <p><strong>CEP:</strong> ${pedido.cep}</p>
        <p><strong>Complemento:</strong> ${pedido.complemento || "N/A"}</p>
        <p><strong>Status:</strong> ${pedido.status}</p>
      `;
  
      containerResumo.appendChild(pedidoDiv);
    });
  }
  
  // Chama a função para buscar e exibir os pedidos ao carregar a página
  document.addEventListener("DOMContentLoaded", buscarPedidos);
  