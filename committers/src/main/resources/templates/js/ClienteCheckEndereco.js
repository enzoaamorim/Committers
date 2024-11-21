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
  // Salvar o ID do endereço no localStorage
  localStorage.setItem("enderecoSelecionado", enderecoId);

  // Redirecionar para a página de resumo
  window.location.href = "ClienteResumo.html";
}
