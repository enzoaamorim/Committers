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
          divProduto.style.cursor = "pointer";
          divProduto.addEventListener("click", function () {
            window.location.href = `DetalheProduto.html?id=${produto.id}`;
          });
  
          const nomeProduto = document.createElement("span");
          nomeProduto.textContent = `${produto.nome}`;
  
          const precoProduto = document.createElement("span");
          precoProduto.textContent = `${"R$" + produto.valor}`;
          precoProduto.classList.add("preco-produto");
  
          fetch(`http://localhost:8080/produtos/${produto.id}/imagem`)
            .then((response) => response.blob())
            .then((blob) => {
              const imageUrl = URL.createObjectURL(blob);
  
              const imagemProduto = document.createElement("img");
              imagemProduto.src = imageUrl;
  
              divProduto.appendChild(imagemProduto);
              divProduto.appendChild(nomeProduto);
              divProduto.appendChild(precoProduto);
            })
            .catch((error) => {
              console.error("Erro ao carregar a imagem do produto:", error);
            });
  
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
  