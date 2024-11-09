document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");
  
    fetch(`http://localhost:8080/produtos/${id}`)
      .then((response) => response.json())
      .then((produto) => {
        document.querySelector(".nome").value = produto.nome;
        document.querySelector(".valor").value = produto.valor;
        document.querySelector(".quantidade").value = produto.quantidade;
        document.querySelector(".avaliacao").value = produto.avaliacao;
        document.querySelector(".descricao").value = produto.descricao;
      })
      .catch((error) => {
        console.error("Erro ao obter informações do produto:", error);
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
          fotosDiv.appendChild(img);
        };
      })
      .catch((error) => {
        console.error("Erro ao obter imagem do produto:", error);
      });
  });
  
  const form = document.getElementById("formAltProdutos");
  
  function getUserIdFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get("id");
  }
  
  const userId = getUserIdFromUrl();
  
  form.addEventListener("submit", function (event) {
    console.log("Evento submit detectado");
    event.preventDefault();
  
    const formData = {
      nome: form.nome.value,
      valor: form.valor.value,
      quantidade: form.quantidade.value,
      avaliacao: form.avaliacao.value,
      descricao: form.descricao.value,
    };
  
    const userId = getUserIdFromUrl();
  
    fetch(`http://localhost:8080/produtos/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (response.ok) {
          window.location.href = "LitaProduto.html";
          return response.json();
        } else {
          throw new Error("Erro na solicitação: " + response.statusText);
        }
      })
      .then((data) => {
        console.log("Usuário atualizado:", data);
      })
      .catch((error) => {
        console.error("Erro:", error);
      });
  });
  