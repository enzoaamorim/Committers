document.addEventListener("DOMContentLoaded", function () {
  const infoElement = document.querySelector(".info");

  document.getElementById("inputBoleto").style.display = "none";
  document.getElementById("inputNum").style.display = "none";
  document.getElementById("inputCod").style.display = "none";
  document.getElementById("inputNom").style.display = "none";
  document.getElementById("inputData").style.display = "none";
  document.getElementById("inputQuan").style.display = "none";

  document.getElementById("forma").addEventListener("change", function (event) {
    var selectedOption = event.target.value;

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

  const dadosPedido = {
    clienteId: 1, // Substituir pelo ID real do cliente logado
    enderecoEntregaId: 1, // Substituir pelo ID do endereço de entrega
    enderecoFaturamentoId: 1, // Substituir pelo ID do endereço de faturamento
    carrinho: [], // Preencher com os produtos do carrinho
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
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Erro ao finalizar o pedido");
      }
    })
    .then((data) => {
      alert("Pedido finalizado com sucesso!");
      window.location.href = "ClienteResumo.html";
    })
    .catch((error) => {
      console.error(error);
      alert("Erro ao finalizar o pedido.");
    });
}  