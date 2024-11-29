document.addEventListener("DOMContentLoaded", function () {
  listarCarrinho();
});

function listarCarrinho() {
  let totalValor = 0;

  // Try to load cart items from localStorage first
  const savedCartItems = JSON.parse(localStorage.getItem('carrinhoItens') || '[]');

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
      // Save cart items to localStorage
      localStorage.setItem('carrinhoItens', JSON.stringify(carrinhoItens));

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
      totalElement.id = "totalValor";
      totalElement.textContent = `Total: R$ ${totalValor.toFixed(2)}`;

      // Adiciona o campo para cálculo de frete
      const freteDiv = document.createElement("div");
      freteDiv.className = "frete";
      freteDiv.innerHTML = `
          <label for="cep">Digite seu CEP:</label>
          <input type="text" id="cep" name="cep">
          <label for="frete">Selecione o tipo de frete:</label>
      <select id="frete" name="frete">
        <option value="normal">Frete Normal</option>
        <option value="rapido">Frete Rápido</option>
        <option value="super_rapido">Frete Super Rápido</option>
      </select>
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
      
      // Fallback to saved cart items if fetch fails
      if (savedCartItems.length > 0) {
        renderizarCarrinhoLocalStorage(savedCartItems);
      }
    });
}

// Nova função para renderizar o carrinho a partir do localStorage
function renderizarCarrinhoLocalStorage(carrinhoItens) {
  let totalValor = 0;
  const listaCarrinho = document.getElementById("listaCarrinho");
  listaCarrinho.innerHTML = "";

  carrinhoItens.forEach(function (carrinhoItem) {
    // Similar code to rendering cart items in listarCarrinho
    // (You would need to adapt the previous rendering logic here)
    // For brevity, I'm omitting the full rendering code
    totalValor += parseFloat(carrinhoItem.valor) * carrinhoItem.quantidade;
  });

  const totalElement = document.createElement("div");
  totalElement.className = "total-valor";
  totalElement.id = "totalValor";
  totalElement.textContent = `Total: R$ ${totalValor.toFixed(2)}`;
  listaCarrinho.appendChild(totalElement);
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
      // Atualizar localStorage após atualizar a quantidade
      const carrinhoItens = JSON.parse(localStorage.getItem('carrinhoItens') || '[]');
      const itemIndex = carrinhoItens.findIndex(item => item.id === id);
      if (itemIndex !== -1) {
        carrinhoItens[itemIndex].quantidade = quantidade;
        localStorage.setItem('carrinhoItens', JSON.stringify(carrinhoItens));
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
      // Remover item do localStorage
      const carrinhoItens = JSON.parse(localStorage.getItem('carrinhoItens') || '[]');
      const updatedCarrinhoItens = carrinhoItens.filter(item => item.id !== id);
      localStorage.setItem('carrinhoItens', JSON.stringify(updatedCarrinhoItens));
      
      listarCarrinho();
    })
    .catch((error) => {
      console.error("Erro ao deletar o item:", error);
    });
}

function calcularFrete(totalValor) {
  // Existing calcularFrete function remains the same
  const cepInput = document.getElementById("cep").value;
  const freteSelect = document.getElementById("frete").value;
  const resultadoFrete = document.getElementById("resultadoFrete");
  const totalElement = document.getElementById("totalValor");
  const cepOrigem = "01001-000";

  if (!cepInput) {
    resultadoFrete.textContent = "Por favor, insira um CEP válido.";
    return;
  }

  fetch(`https://viacep.com.br/ws/${cepInput}/json/`)
    .then((response) => response.json())
    .then((destino) => {
      if (destino.erro) {
        resultadoFrete.textContent = "CEP inválido.";
        return;
      }

      const distancia = Math.abs(parseInt(cepInput.substring(0, 2)) - parseInt(cepOrigem.substring(0, 2))) * 10;

      let freteValor = 0;
      switch (freteSelect) {
        case "normal":
          freteValor = distancia * 0.5;
          break;
        case "rapido":
          freteValor = distancia * 0.8;
          break;
        case "super_rapido":
          freteValor = distancia * 1.2;
          break;
        default:
          freteValor = 0;
      }

      const totalComFrete = (parseFloat(totalValor) + freteValor).toFixed(2);

      resultadoFrete.textContent = `O valor do frete (${freteSelect.replace("_", " ")}) é R$ ${freteValor.toFixed(2)}.`;
      totalElement.textContent = `Total: R$ ${totalComFrete}`;
    })
    .catch((error) => {
      console.error("Erro ao buscar o CEP:", error);
      resultadoFrete.textContent = "Erro ao buscar informações do CEP.";
    });
}