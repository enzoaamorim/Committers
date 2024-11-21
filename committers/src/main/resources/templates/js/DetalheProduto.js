document.addEventListener("DOMContentLoaded", function () {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("id");

  function convertToStars(avaliacao) {
    let stars = "";
    for (let i = 0; i < avaliacao; i++) {
      stars += "⭐";
    }
    return stars;
  }

  fetch(`http://localhost:8080/produtos/${id}`)
    .then((response) => response.json())
    .then((produto) => {
      document.querySelector(".nome").innerText = produto.nome;
      document.querySelector(".valor").innerText = `${produto.valor}`;

      document.querySelector(".avaliacao").innerText = convertToStars(
        produto.avaliacao
      );
      document.querySelector(".descricao").innerText = produto.descricao;
      document.title = `${produto.nome}  GFY`;
    })
    .catch((error) => {
      console.error("Erro ao obter informações do produto:", error);
      Swal.fire({
        title: "Erro!",
        text: "Não foi possível carregar as informações do produto.",
        icon: "error",
        confirmButtonText: "Tentar novamente",
        confirmButtonColor: "#ff4d4d",
      });
    });

  fetch(`http://localhost:8080/produtos/${id}/imagem`)
    .then((response) => response.blob())
    .then((blob) => {
      const imageUrl = URL.createObjectURL(blob);

      const img = document.createElement("img");
      img.src = imageUrl;

      const fotosDiv = document.querySelector(".fotos");
      fotosDiv.className = "div-fotos";

      img.onload = function () {
        img.width = 500;
        img.height = 300;
        fotosDiv.appendChild(img);
      };
    })
    .catch((error) => {
      console.error("Erro ao obter imagem do produto:", error);
      Swal.fire({
        title: "Erro!",
        text: "Não foi possível carregar a imagem do produto.",
        icon: "error",
        confirmButtonText: "Entendi",
        confirmButtonColor: "#ff4d4d",
      });
    });
});

const buttonAdd = document.querySelector(".buttonadd");
buttonAdd.addEventListener("click", function () {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("id");

  const Inome = document.querySelector(".nome");
  const Ivalor = document.querySelector(".valor");

  fetch(`http://localhost:8080/produtos/${id}/imagem`)
    .then((response) => response.blob())
    .then((blob) => {
      const formData = new FormData();
      formData.append("nome", Inome.textContent);
      formData.append("valor", Ivalor.textContent);
      formData.append("imagem", blob);
      formData.append("quantidade", 1);

      fetch(`http://localhost:8080/carrinho`, {
        method: "POST",
        body: formData,
      })
        .then((response) => {
          if (response.ok) {
            Swal.fire({
              title: "Adicionado!",
              text: "Produto adicionado ao carrinho com sucesso!",
              icon: "success",
              confirmButtonText: "Ver Carrinho",
              confirmButtonColor: "#1c3a57",
            }).then(() => {
              window.location.href = "ClienteCarrinho.html";
            });
          } else {
            throw new Error("Erro ao adicionar produto ao carrinho");
          }
        })
        .catch((error) => {
          console.error("Erro ao adicionar produto ao carrinho:", error);
          Swal.fire({
            title: "Erro!",
            text: "Não foi possível adicionar o produto ao carrinho.",
            icon: "error",
            confirmButtonText: "Entendi",
            confirmButtonColor: "#ff4d4d",
          });
        });
    })
    .catch((error) => {
      console.error("Erro ao obter imagem do produto:", error);
      Swal.fire({
        title: "Erro!",
        text: "Não foi possível carregar a imagem do produto.",
        icon: "error",
        confirmButtonText: "Entendi",
        confirmButtonColor: "#ff4d4d",
      });
    });
});
