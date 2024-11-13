function listarPedidos() {
    console.log("Iniciando a função listarPedidos");
  
    fetch("http://localhost:8080/pedido", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "GET",
    })
      .then(function (res) {
        console.log("Resposta recebida do servidor:", res);
        if (!res.ok) {
          throw new Error("Erro ao carregar os pedidos, status: " + res.status);
        }
        return res.json();
      })
      .then(function (pedidos) {
        console.log("Dados dos pedidos recebidos:", pedidos);
        const listaPedidos = document.getElementById("listaPedidos");
        if (!listaPedidos) {
          console.error("Elemento 'listaPedidos' não encontrado no DOM.");
          return;
        }
        listaPedidos.innerHTML = "";
        pedidos.forEach(function (pedido) {
          const divPedido = document.createElement("li");
          divPedido.className = "div-pedido";
  
          const textoStatus = pedido.status ? "Concluído" : "Pendente";
  
          const pId = document.createElement("span");
          pId.textContent = `ID: ${pedido.id}`;
          const pCliente = document.createElement("span");
          pCliente.textContent = `Cliente: ${pedido.cliente}`;
          const pData = document.createElement("span");
          pData.textContent = `Data: ${pedido.data}`;
          const pStatus = document.createElement("span");
          pStatus.textContent = `Status: ${textoStatus}`;
  
          divPedido.appendChild(pId);
          divPedido.appendChild(pCliente);
          divPedido.appendChild(pData);
          divPedido.appendChild(pStatus);
  
          const divButtons = document.createElement("div");
          divButtons.className = "div-buttons";
  
          const btnAlterar = document.createElement("button");
          btnAlterar.textContent = "Alterar";
          btnAlterar.onclick = function () {
            window.location.href = `AlterarPedido.html?id=${pedido.id}`;
          };
          divButtons.appendChild(btnAlterar);
  
          const btnConcluir = document.createElement("button");
          btnConcluir.textContent = "Concluir";
          btnConcluir.disabled = pedido.status;
          btnConcluir.onclick = function () {
            concluirPedido(pedido.id);
          };
          divButtons.appendChild(btnConcluir);
  
          divPedido.appendChild(divButtons);
          listaPedidos.appendChild(divPedido);
        });
      })
      .catch(function (error) {
        console.error("Erro ao carregar os pedidos:", error);
      });
  }
  
  function concluirPedido(pedidoId) {
    fetch(`http://localhost:8080/pedido/${pedidoId}/concluir`, {
      method: "PUT",
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Erro ao concluir o pedido, status: " + response.status);
        }
      })
      .then((data) => {
        console.log("Pedido concluído:", data);
        listarPedidos(); // Atualiza a lista de pedidos
      })
      .catch((error) => {
        console.error("Erro ao concluir o pedido:", error);
      });
  }
  
  document.addEventListener("DOMContentLoaded", function () {
    console.log("DOM totalmente carregado, chamando listarPedidos");
    listarPedidos();
  });
  