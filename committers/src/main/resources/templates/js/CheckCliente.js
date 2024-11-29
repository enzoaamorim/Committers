document.addEventListener("DOMContentLoaded", function () {
  const infoElement = document.querySelector(".info");
  document.getElementById("inputBoleto").style.display = "none";
  document.getElementById("inputNum").style.display = "none";
  document.getElementById("inputCod").style.display = "none";
  document.getElementById("inputNom").style.display = "none";
  document.getElementById("inputData").style.display = "none";
  document.getElementById("inputQuan").style.display = "none";

  // Carregar método de pagamento salvo do localStorage, se existir
  const savedPaymentMethod = JSON.parse(localStorage.getItem('userFormData') || '{}').metodoPagamento;
  if (savedPaymentMethod) {
    document.getElementById("forma").value = savedPaymentMethod.formaId;
    
    // Simular mudança para exibir campos corretos
    const event = new Event('change');
    document.getElementById("forma").dispatchEvent(event);

    // Preencher campos salvos se existirem
    if (savedPaymentMethod.formaId === "1") {
      document.getElementById("inputBoleto").value = savedPaymentMethod.boletoInfo || "";
    } else if (savedPaymentMethod.formaId === "2") {
      document.getElementById("inputNum").value = savedPaymentMethod.cartaoInfo.numero || "";
      document.getElementById("inputCod").value = savedPaymentMethod.cartaoInfo.codigo || "";
      document.getElementById("inputNom").value = savedPaymentMethod.cartaoInfo.nome || "";
      document.getElementById("inputData").value = savedPaymentMethod.cartaoInfo.vencimento || "";
      document.getElementById("inputQuan").value = savedPaymentMethod.cartaoInfo.parcelas || "";
    }
  }

  document.getElementById("forma").addEventListener("change", function (event) {
    var selectedOption = event.target.value;
    
    // Esconder todos os campos primeiro
    document.getElementById("inputBoleto").style.display = "none";
    document.getElementById("inputNum").style.display = "none";
    document.getElementById("inputCod").style.display = "none";
    document.getElementById("inputNom").style.display = "none";
    document.getElementById("inputData").style.display = "none";
    document.getElementById("inputQuan").style.display = "none";

    if (selectedOption === "1") {
      document.getElementById("inputBoleto").style.display = "block";
      infoElement.style.height = "400px";
    } else if (selectedOption === "2") {
      infoElement.style.height = "700px";
      document.getElementById("inputNum").style.display = "block";
      document.getElementById("inputCod").style.display = "block";
      document.getElementById("inputNom").style.display = "block";
      document.getElementById("inputData").style.display = "block";
      document.getElementById("inputQuan").style.display = "block";
    }
  });
});

function finalizarPagamento() {
  const formaPagamento = document.getElementById("forma").value;
  const boletoInfo = document.getElementById("inputBoleto").value;
  const cartaoInfo = {
    numero: document.getElementById("inputNum").value,
    codigo: document.getElementById("inputCod").value,
    nome: document.getElementById("inputNom").value,
    vencimento: document.getElementById("inputData").value,
    parcelas: document.getElementById("inputQuan").value,
  };

  // Salvar método de pagamento no localStorage
  try {
    // Recuperar dados existentes do localStorage
    const storedData = JSON.parse(localStorage.getItem('userFormData') || '{}');

    // Adicionar dados do método de pagamento
    storedData.metodoPagamento = {
      formaId: formaPagamento,
      boletoInfo: formaPagamento === "1" ? boletoInfo : null,
      cartaoInfo: formaPagamento === "2" ? cartaoInfo : null
    };

    // Salvar de volta no localStorage
    localStorage.setItem('userFormData', JSON.stringify(storedData));
  } catch (error) {
    console.error('Erro ao salvar método de pagamento:', error);
    Swal.fire("Erro", "Não foi possível salvar o método de pagamento", "error");
  }

  // Buscar dados salvos anteriormente de endereço e carrinho
  const storedData = JSON.parse(localStorage.getItem('userFormData') || '{}');
  const carrinhoItens = JSON.parse(localStorage.getItem('carrinhoItens') || '[]');

  const dadosPedido = {
    clienteId: 1, // Substituir pelo ID real do cliente logado
    enderecoEntregaId: storedData.enderecoEntrega?.id || 1, // Usar ID do endereço salvo
    enderecoFaturamentoId: storedData.enderecoFaturamento?.id || 1, // Usar ID do endereço salvo
    carrinho: carrinhoItens, // Usar itens do carrinho salvos
    formaPagamento: formaPagamento === "1" ? "Boleto" : "Cartão",
    boletoInfo: formaPagamento === "1" ? boletoInfo : null,
    cartaoInfo: formaPagamento === "2" ? cartaoInfo : null,
  };

  fetch("/api/pedidos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dadosPedido),
  })
  .then((response) => {
    if (response) {
      return response.json();
    } else {
      throw new Error("Erro ao finalizar o pedido");
    }
  })
  .then((data) => {
    // Limpar dados do localStorage após finalizar o pedido
    localStorage.removeItem('carrinhoItens');
    const storedData = JSON.parse(localStorage.getItem('userFormData') || '{}');
    delete storedData.metodoPagamento;
    localStorage.setItem('userFormData', JSON.stringify(storedData));

    alert("Pedido finalizado com sucesso!");
    window.location.href = "ClienteResumo.html";
  })
  .catch((error) => {
    console.error(error);
    alert("Erro ao finalizar o pedido.");
  });
}