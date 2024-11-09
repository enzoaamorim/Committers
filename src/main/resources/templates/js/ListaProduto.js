function listarProdutos() {
  fetch("http://localhost:8080/produtos", {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "GET",
  })
    .then(function (resposta) {
      if (!resposta.ok) {
        throw new Error("Erro ao carregar os produtos");
      }
      return resposta.json();
    })
    .then(function (produtos) {
      const listaProdutos = document.getElementById("listaProdutos");
      listaProdutos.innerHTML = "";
      produtos.forEach(function (produto) {
        const divProduto = document.createElement("div");
        divProduto.classList.add("produto");
        divProduto.className = "div-produto";

        const divButtons = document.createElement("div");
        divButtons.className = "div-buttons";
        const divAlterar = document.createElement("div");
        divAlterar.className = "div-alterar";

        const id = document.createElement("span");
        id.textContent = `${produto.id}`;
        divProduto.appendChild(id);

        const nomeProduto = document.createElement("span");
        nomeProduto.textContent = `${produto.nome}`;
        divProduto.appendChild(nomeProduto);
        nomeProduto.style.cursor = "pointer";
        nomeProduto.addEventListener("click", function () {
          window.location.href = `telaProduto.html?id=${produto.id}`;
        });

        const precoProduto = document.createElement("span");
        precoProduto.textContent = `${produto.valor}`;
        divProduto.appendChild(precoProduto);

        const quantidadeProduto = document.createElement("span");
        quantidadeProduto.textContent = `${produto.quantidade}`;
        divProduto.appendChild(quantidadeProduto);

        const statusProduto = document.createElement("span");
        statusProduto.textContent = `${
          produto.status ? "Ativo" : "Desativado"
        }`;
        divProduto.appendChild(statusProduto);

        const btnAlterar = document.createElement("button");
        btnAlterar.textContent = "Alterar";
        btnAlterar.onclick = function () {
          window.location.href = `AlterarProduto.html?id=${produto.id}`;
        };
        divAlterar.appendChild(btnAlterar);
        divProduto.appendChild(divAlterar);

        const btnAtivar = document.createElement("button");
        btnAtivar.textContent = "Ativar";
        btnAtivar.disabled = produto.status;
        function ativarProduto(produtoId) {
          fetch(`http://localhost:8080/produtos/${produtoId}/ativar`, {
            method: "PUT",
          })
            .then((response) => {
              if (response.ok) {
                return response.json();
              } else {
                throw new Error("Erro ao ativar o produto:");
              }
            })
            .then((data) => {
              console.log("Produto ativado:", data);
              listarProdutos(); // Atualiza a lista de usuários
            })
            .catch((error) => {
              console.error("Erro:", error);
            });
        }
        btnAtivar.onclick = function () {
          ativarProduto(produto.id);
        };
        divButtons.appendChild(btnAtivar);

        const btnDesativar = document.createElement("button");
        btnDesativar.textContent = "Desativar";
        btnDesativar.disabled = !produto.status;
        function desativarProduto(produtoId) {
          fetch(`http://localhost:8080/produtos/${produtoId}/desativar`, {
            method: "PUT",
          })
            .then((response) => {
              if (response.ok) {
                return response.json();
              } else {
                throw new Error("Erro ao desativar o Produto");
              }
            })
            .then((data) => {
              console.log("Produto desativado:", data);
              listarProdutos(); // Atualiza a lista de usuários
            })
            .catch((error) => {
              console.error("Erro:", error);
            });
        }
        btnDesativar.onclick = function () {
          desativarProduto(produto.id);
        };
        divButtons.appendChild(btnDesativar);
        divProduto.appendChild(divButtons);

        listaProdutos.appendChild(divProduto);
      });
    })
    .catch(function (error) {
      console.error("Erro ao carregar os produtos:", error);
    });
}

document.addEventListener("DOMContentLoaded", function () {
  listarProdutos();
});
