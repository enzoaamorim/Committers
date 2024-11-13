document.addEventListener("DOMContentLoaded", function () {
    listarCarrinho();
  });
  
  function listarCarrinho() {
    let totalValor = 0;
  
    fetch("http://localhost:8080/carrinho", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "GET",
    })
      .then(function (res) {
        if (!res.ok) {
          throw new Error("Erro ao carregar o carrinho");
        }
        return res.json();
      })
      .then(function (carrinhoItens) {
        const listaCarrinho = document.getElementById("listaCarrinho");
        listaCarrinho.innerHTML = "";
  
        carrinhoItens.forEach(function (carrinhoItem) {
          const divCarrinho = document.createElement("div");
          divCarrinho.className = "div-carrinho";
  
          const divQuantidade = document.createElement("div");
          divQuantidade.className = "div-quantidade";
  
          const pNome = document.createElement("span");
          pNome.textContent = `${carrinhoItem.nome}`;
  
          const pValor = document.createElement("span");
          pValor.textContent = `R$${carrinhoItem.valor}`;
  
          const pQuantidade = document.createElement("span");
          pQuantidade.textContent = `${carrinhoItem.quantidade}`;
          pQuantidade.className = "quantidade";
  
          totalValor += parseFloat(carrinhoItem.valor) * carrinhoItem.quantidade;
  
          const img = document.createElement("img");
  
          fetch(`http://localhost:8080/carrinho/${carrinhoItem.id}/imagem`)
            .then((response) => response.blob())
            .then((blob) => {
              const imageUrl = URL.createObjectURL(blob);
              img.src = imageUrl;
  
              img.width = 200;
              img.height = 100;
            })
            .catch((error) => {
              console.error("Erro ao obter imagem do produto:", error);
            });
  
          // Botão Mais
          const btnMais = document.createElement("button");
          btnMais.textContent = "+";
          btnMais.className = "btnMais";
          btnMais.addEventListener("click", function () {
            atualizarQuantidade(carrinhoItem.id, carrinhoItem.quantidade + 1);
          });
  
          // Botão Menos
          const btnMenos = document.createElement("button");
          btnMenos.textContent = "-";
          btnMenos.className = "btnMenos";
          btnMenos.addEventListener("click", function () {
            if (carrinhoItem.quantidade > 1) {
              atualizarQuantidade(carrinhoItem.id, carrinhoItem.quantidade - 1);
            }
          });
  
          // Botão Deletar
          const btnDeletar = document.createElement("button");
          btnDeletar.textContent = "X";
          btnDeletar.className = "btnDeletar";
          btnDeletar.addEventListener("click", function () {
            deletarItem(carrinhoItem.id);
          });
  
          divCarrinho.appendChild(img);
          divCarrinho.appendChild(pNome);
          divCarrinho.appendChild(pValor);
          divQuantidade.appendChild(btnMais);
          divQuantidade.appendChild(pQuantidade);
          divQuantidade.appendChild(btnMenos);
          divCarrinho.appendChild(divQuantidade);
          divCarrinho.appendChild(btnDeletar);
  
          listaCarrinho.appendChild(divCarrinho);
        });
  
        const totalElement = document.createElement("div");
        totalElement.className = "total-valor";
        totalElement.id = "totalValor"; // Adiciona o ID aqui
        totalElement.textContent = `Total: R$ ${totalValor.toFixed(2)}`;
  
        // Adiciona o campo para cálculo de frete
        const freteDiv = document.createElement("div");
        freteDiv.className = "frete";
        freteDiv.innerHTML = `
          <label for="cep">Digite seu CEP:</label>
          <input type="text" id="cep" name="cep">
          <button class="buttoncalc">Calcular Frete</button>
          <p id="resultadoFrete"></p>
          <p id="endereco"></p>
        `;
        listaCarrinho.appendChild(freteDiv);
        listaCarrinho.appendChild(totalElement);
  
        // Adiciona evento ao botão de calcular frete
        document
          .querySelector(".buttoncalc")
          .addEventListener("click", function () {
            calcularFrete(totalValor);
          });
      })
      .catch(function (error) {
        console.error("Erro ao carregar o carrinho:", error);
      });
  }
  
  function atualizarQuantidade(id, quantidade) {
    fetch(`http://localhost:8080/carrinho/${id}/quantidade`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "PUT",
      body: JSON.stringify({ quantidade: quantidade }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Erro ao atualizar a quantidade do item");
        }
        listarCarrinho();
      })
      .catch((error) => {
        console.error("Erro ao atualizar a quantidade do item:", error);
      });
  }
  
  function deletarItem(id) {
    fetch(`http://localhost:8080/carrinho/${id}`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "DELETE",
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Erro ao deletar o item");
        }
        listarCarrinho();
      })
      .catch((error) => {
        console.error("Erro ao deletar o item:", error);
      });
  }
  
  function calcularFrete(totalValor) {
    const cepInput = document.getElementById("cep");
    const resultadoFrete = document.getElementById("resultadoFrete");
    const enderecoDisplay = document.getElementById("endereco");
    const totalElement = document.getElementById("totalValor"); // Obtém o elemento pelo ID
    const cep = cepInput.value;
  
    // Verifica se o CEP foi preenchido
    if (cep === "") {
      resultadoFrete.textContent = "Por favor, insira um CEP.";
      return;
    }
  
    // Busca o endereço pelo CEP usando a API do ViaCEP
    fetch(`https://viacep.com.br/ws/${cep}/json/`)
      .then((response) => response.json())
      .then((data) => {
        if (data.erro) {
          enderecoDisplay.textContent = "CEP inválido.";
          return;
        }
  
        // Exibe o nome da rua
        enderecoDisplay.textContent = `Endereço: ${data.logradouro}, ${data.bairro}, ${data.localidade} - ${data.uf}`;
  
        // Gera um valor aleatório para o frete
        const frete = (Math.random() * (50 - 10) + 10).toFixed(2); // Gera valor entre 10 e 50
  
        // Calcula o valor total com frete
        const totalComFrete = (
          parseFloat(totalValor) + parseFloat(frete)
        ).toFixed(2);
  
        // Exibe o valor do frete e o total com frete
        resultadoFrete.innerHTML = `O valor do frete é R$ ${frete}.`;
        totalElement.textContent = `Total: R$ ${totalComFrete}`;
      })
      .catch((error) => {
        console.error("Erro ao buscar o endereço:", error);
        enderecoDisplay.textContent =
          "Erro ao buscar o endereço. Tente novamente mais tarde.";
      });
  }
  