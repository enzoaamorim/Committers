document.addEventListener("DOMContentLoaded", function () {
  const clienteId = localStorage.getItem("clienteId");
  const loggedIn = localStorage.getItem("loggedIn");

  if (!loggedIn) {
    window.location.href = 'LoginCliente.html';
  } else {
    listarEnderecos();
  }
});

function listarEnderecos() {
  fetch("http://localhost:8080/endereco", {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "GET",
  })
    .then(function (resposta) {
      if (!resposta.ok) {
        throw new Error(`Erro ao carregar os endereços: ${resposta.status}`);
      }
      return resposta.json();
    })
    .then(function (enderecos) {
      const listarEnderecosDiv = document.getElementById("listarEnderecos");
      listarEnderecosDiv.innerHTML = ""; // Limpar conteúdo anterior

      if (enderecos.length === 0) {
        listarEnderecosDiv.innerHTML = "<p>Nenhum endereço cadastrado.</p>";
      } else {
        enderecos.forEach(function (endereco) {
          const enderecoHTML = `
            <div class="endereco-item">
              <p><strong>CEP:</strong> ${endereco.cep}</p>
              <p><strong>Logradouro:</strong> ${endereco.logradouro}</p>
              <p><strong>Número:</strong> ${endereco.numero}</p>
              <p><strong>Complemento:</strong> ${endereco.complemento || "N/A"}</p>
              <p><strong>Bairro:</strong> ${endereco.bairro}</p>
              <p><strong>Cidade:</strong> ${endereco.cidade}</p>
              <p><strong>UF:</strong> ${endereco.uf}</p>
              <hr>
              <button class="botao-selecionar" onclick="selecionarEndereco('${endereco.id}')">Selecionar</button>
            </div>
          `;
          listarEnderecosDiv.innerHTML += enderecoHTML;
        });
      }
    })
    .catch(function (erro) {
      console.error("Erro ao buscar endereços:", erro);
      document.getElementById("listarEnderecos").innerHTML = "<p>Erro ao carregar os endereços.</p>";
    });
}

function selecionarEndereco(enderecoId) {
  console.log("ID do endereço selecionado:", enderecoId); // Log para depuração

  // Primeiro, busca o endereço de entrega
  fetch(`http://localhost:8080/endereco/${enderecoId}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then(function (resposta) {
      if (!resposta.ok) {
        throw new Error(`Erro ao buscar o endereço de entrega: ${resposta.status}`);
      }
      return resposta.json();
    })
    .then(function (enderecoEntrega) {
      // Após buscar o endereço de entrega, agora busca o endereço de faturamento
      return fetch(`http://localhost:8080/enderecofat/${enderecoId}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then(function (respostaFat) {
          if (!respostaFat.ok) {
            throw new Error(`Erro ao buscar o endereço de faturamento: ${respostaFat.status}`);
          }
          return respostaFat.json();
        })
        .then(function (enderecoFaturamento) {
          // Salvar os endereços no localStorage
          const userFormData = JSON.parse(localStorage.getItem("userFormData") || "{}");
          userFormData.enderecoEntrega = enderecoEntrega;
          userFormData.enderecoFaturamento = enderecoFaturamento;

          // Atualizar o localStorage
          localStorage.setItem("userFormData", JSON.stringify(userFormData));

          // Redirecionar para a página de resumo
          window.location.href = "CheckCliente.html";
        });
    })
    .catch(function (erro) {
      console.error("Erro ao buscar os endereços:", erro);
      alert("Não foi possível selecionar os endereços. Verifique sua conexão ou tente novamente.");
    });
}

