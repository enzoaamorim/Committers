document.addEventListener("DOMContentLoaded", function() {
  renderizarResumo();
});

function renderizarResumo() {
  const containerResumo = document.getElementById("resumoEndereco");
  containerResumo.innerHTML = ""; // Limpa o conteúdo existente

  // Recuperar dados do localStorage
  const storedData = JSON.parse(localStorage.getItem('userFormData') || '{}');
  const carrinhoItens = JSON.parse(localStorage.getItem('carrinhoItens') || '[]');
  const clienteId = JSON.parse(localStorage.getItem('clienteId') || '[]');
  
  // Calcular valor total do carrinho
  const valorTotal = carrinhoItens.reduce((total, item) => {
    return total + (parseFloat(item.valor) * item.quantidade);
  }, 0);

  // Recuperar dados de endereço de entrega
  const enderecoEntrega = storedData.enderecoEntrega || {};
  const enderecoFAT = storedData.enderecoFaturamento || {};
  const metodoPagamento = storedData.metodoPagamento || {};

  // Buscar informações do cliente
  fetch(`http://localhost:8080/clientes/${clienteId}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Erro ao buscar informações do cliente');
      }
      return response.json();
    })
    .then(cliente => {
      // Criar div para resumo do pedido
      const pedidoDiv = document.createElement("div");
      pedidoDiv.className = "pedido";

      // Preparar HTML com informações do pedido e do cliente
      pedidoDiv.innerHTML = `
        <h2>Resumo do Pedido</h2>
        
        <h3>Informações do Cliente</h3>
        <p>
          <strong>Nome:</strong> ${cliente.nome}<br>
          <strong>CPF:</strong> ${cliente.cpf}<br>
          <strong>Email:</strong> ${cliente.email}<br>
        </p>

        <br>
        
        <h3>Produtos</h3>
        ${carrinhoItens.map(item => `
          <p>
            <strong>${item.nome}</strong> - 
            Quantidade: ${item.quantidade} - 
            Valor unitário: R$ ${parseFloat(item.valor).toFixed(2)}
          </p>
        `).join('')}
        
        <p><strong>Valor Total:</strong> R$ ${valorTotal.toFixed(2)}</p>

        <br>
        
        <h3>Endereço de Entrega</h3>
        <p>
          <strong>Logradouro:</strong> ${enderecoEntrega.logradouro || 'N/A'}<br>
          <strong>Número:</strong> ${enderecoEntrega.numero || 'S/N'}<br>
          <strong>Bairro:</strong> ${enderecoEntrega.bairro || 'N/A'}<br>
          <strong>Cidade:</strong> ${enderecoEntrega.cidade || 'N/A'}<br>
          <strong>UF:</strong> ${enderecoEntrega.uf || 'N/A'}<br>
          <strong>CEP:</strong> ${enderecoEntrega.cep || 'N/A'}<br>
          <strong>Complemento:</strong> ${enderecoEntrega.complemento || 'N/A'}
        </p>

        <br>

    <h3>Endereço de Faturamento</h3>
    <p>
      <strong>Logradouro:</strong> ${enderecoFAT.logradouro || 'N/A'}<br>
      <strong>Número:</strong> ${enderecoFAT.numero || 'S/N'}<br>
      <strong>Bairro:</strong> ${enderecoFAT.bairro || 'N/A'}<br>
      <strong>Cidade:</strong> ${enderecoFAT.cidade || 'N/A'}<br>
      <strong>UF:</strong> ${enderecoFAT.uf || 'N/A'}<br>
      <strong>CEP:</strong> ${enderecoFAT.cep || 'N/A'}<br>
      <strong>Complemento:</strong> ${enderecoFAT.complemento || 'N/A'}
    </p>

    <br>
        
        <h3>Método de Pagamento</h3>
        <p>
          <strong>Forma:</strong> ${metodoPagamento.formaId === '1' ? 'Boleto' : 'Cartão'}
          ${metodoPagamento.formaId === '2' ? `
            <br><strong>Número do Cartão:</strong> **** **** **** ${metodoPagamento.cartaoInfo.numero.slice(-4)}
            <br><strong>Nome no Cartão:</strong> ${metodoPagamento.cartaoInfo.nome}
            <br><strong>Parcelas:</strong> ${metodoPagamento.cartaoInfo.parcelas}x
          ` : ''}
        </p>
      `;

      containerResumo.appendChild(pedidoDiv);
    })
    .catch(error => {
      console.error('Erro:', error);
      alert('Não foi possível carregar as informações do cliente');
    });

  // Adicionar evento ao botão de confirmação
  const buttonConfirmar = document.querySelector(".buttonadd");
  buttonConfirmar.addEventListener("click", confirmarPedido);
}

function confirmarPedido() {
  const storedData = JSON.parse(localStorage.getItem('userFormData') || '{}');
  const carrinhoItens = JSON.parse(localStorage.getItem('carrinhoItens') || '[]');
  const metodoPagamento = storedData.metodoPagamento || {};

  // Gerar número aleatório para o pedido
  const numeroPedido = Math.floor(100000 + Math.random() * 900000); // Número de 6 dígitos

  // Preparar dados do pedido
  const dadosPedido = {
    id: numeroPedido, // Número do pedido
    clienteId: storedData.clienteId || 1,
    enderecoEntregaId: storedData.enderecoEntrega?.id || 1,
    enderecoFaturamentoId: storedData.enderecoFaturamento?.id || 1,
    carrinho: carrinhoItens,
    formaPagamento: metodoPagamento.formaId === '1' ? 'Boleto' : 'Cartão',
    boletoInfo: metodoPagamento.formaId === '1' ? metodoPagamento.boletoInfo : null,
    cartaoInfo: metodoPagamento.formaId === '2' ? metodoPagamento.cartaoInfo : null,
    status: 'A Confirmar', // Status inicial
  };

  // Recuperar pedidos antigos
  const pedidosAntigos = JSON.parse(localStorage.getItem('pedidosSalvos') || '[]');

  // Adicionar novo pedido à lista
  pedidosAntigos.push(dadosPedido);
  localStorage.setItem('pedidosSalvos', JSON.stringify(pedidosAntigos));

  // Limpar dados do localStorage relacionados ao carrinho e formulário
  localStorage.removeItem('carrinhoItens');
  delete storedData.metodoPagamento;
  delete storedData.enderecoEntrega;
  delete storedData.enderecoFaturamento;
  localStorage.setItem('userFormData', JSON.stringify(storedData));

  alert(`Pedido finalizado com sucesso! Número do pedido: ${numeroPedido}`);
  window.location.href = "meusPedidos.html";
}


