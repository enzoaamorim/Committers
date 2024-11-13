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
          throw new Error("Erro ao carregar os endereços");
        }
        return resposta.json();
      })
      .then(function (enderecos) {
        const listaEnderecos = document.getElementById("listaEnderecos");
        listaEnderecos.innerHTML = "";
        enderecos.forEach(function (endereco) {
          const divEndereco = document.createElement("div");
          divEndereco.classList.add("endereco");
          divEndereco.className = "div-endereco";
          divEndereco.style.cursor = "pointer";
          divEndereco.addEventListener("click", function () {
            window.location.href = `ClienteProduto.html?id=${produto.id}`;
          });
  
          const cepEndereco = document.createElement("span");
          cepEndereco.textContent = `${endereco.cep}`;
  
          const ruaEndereco = document.createElement("span");
          ruaEndereco.textContent = `${endereco.logradouro}`;
          ruaEndereco.classList.add("rua-endereco");
  
          divEndereco.appendChild(cepEndereco);
          divEndereco.appendChild(ruaEndereco);
  
          listaEnderecos.appendChild(divEndereco);
        });
      })
      .catch(function (error) {
        console.error("Erro ao carregar os enderecos:", error);
      });
  }
  
  document.addEventListener("DOMContentLoaded", function () {
    listarEnderecos();
  });
  