function listarProdutos() {
  // Carrega os produtos da API e exibe apenas na área de produtos
  fetch("http://localhost:8080/produtos", {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "GET",
  })
    .then((resposta) => {
      if (!resposta.ok) {
        throw new Error("Erro ao carregar os produtos");
      }
      return resposta.json();
    })
    .then((produtos) => {
      const listaProdutos = document.getElementById("listaProdutos");

      // Adiciona os produtos na lista sem limpar ou reiniciar outras partes da página
      produtos.forEach((produto) => {
        const divProduto = document.createElement("div");
        divProduto.className = "div-produto";
        divProduto.style.cursor = "pointer";

        divProduto.addEventListener("click", function () {
          window.location.href = `DetalheProduto.html?id=${produto.id}`;
        });

        const nomeProduto = document.createElement("span");
        nomeProduto.textContent = produto.nome;

        const precoProduto = document.createElement("span");
        precoProduto.textContent = `R$ ${produto.valor}`;
        precoProduto.classList.add("preco-produto");

        // Fetch da imagem do produto
        fetch(`http://localhost:8080/produtos/${produto.id}/imagem`)
          .then((response) => response.blob())
          .then((blob) => {
            const imageUrl = URL.createObjectURL(blob);

            const imagemProduto = document.createElement("img");
            imagemProduto.src = imageUrl;
            imagemProduto.alt = produto.nome;

            // Adiciona a imagem, o nome e o preço ao contêiner do produto
            divProduto.appendChild(imagemProduto);
            divProduto.appendChild(nomeProduto);
            divProduto.appendChild(precoProduto);
          })
          .catch((error) => {
            console.error("Erro ao carregar a imagem do produto:", error);
          });

        // Adiciona o produto ao contêiner de produtos sem alterar outras partes
        listaProdutos.appendChild(divProduto);
      });
    })
    .catch((error) => {
      console.error("Erro ao carregar os produtos:", error);
    });
}

// Inicializa o carrossel e carrega produtos sem interferência entre eles
document.addEventListener("DOMContentLoaded", function () {
  listarProdutos();

  // Carrossel - apenas manipula os slides sem afetar outras partes da página
  const slides = document.querySelectorAll(".carousel-slide");
  let currentSlide = 0;

  function showSlide(n) {
    slides.forEach((slide) => {
      slide.classList.remove("active");
      slide.style.opacity = "0"; // Garante que o slide começa com opacidade zero
    });
    slides[n].classList.add("active");
    slides[n].style.opacity = "1"; // Mostra o slide atual
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  }

  showSlide(currentSlide); // Exibe o primeiro slide
  setInterval(nextSlide, 5000); // Alterna os slides a cada 5 segundos
});