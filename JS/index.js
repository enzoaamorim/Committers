function adicionarAoCarrinho(nome, preco) {
    const produto = { nome, preco, quantidade: 1 };

    // Obtém o carrinho atual do localStorage ou cria um novo
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    const produtoExistente = carrinho.find(item => item.nome === nome);

    if (produtoExistente) {
        // Se o produto já está no carrinho, incrementa a quantidade
        produtoExistente.quantidade += 1;
    } else {
        // Caso contrário, adiciona o novo produto
        carrinho.push(produto);
    }

    // Salva o carrinho atualizado no localStorage
    localStorage.setItem('carrinho', JSON.stringify(carrinho));

    // Redireciona para a página do carrinho
    window.location.href = "../NovoCommitters/cart.html";
}

function toggleCategorias() {
    const categoriaContainer = document.getElementById('categorias');
    const toggleBtn = document.getElementById('toggleCategoriasBtn');

    if (categoriaContainer.style.display === 'block') {
        categoriaContainer.style.display = 'none';
        toggleBtn.textContent = 'Ver Categorias';
    } else {
        const categorias = [
            { nome: "Notebooks", descricao: "Os melhores notebooks para seu trabalho e lazer" },
            { nome: "Acessórios", descricao: "Acessórios essenciais para seu computador" },
            { nome: "Componentes", descricao: "Componentes de alta qualidade para montagem" }
        ];

        const listaCategorias = document.getElementById('categoria-lista');
        listaCategorias.innerHTML = ''; // Limpa a lista de categorias

        // Adiciona as categorias específicas
        categorias.forEach(categoria => {
            const categoriaCard = document.createElement('div');
            categoriaCard.classList.add('col-md-4');
            categoriaCard.innerHTML = `
                <div class="card mb-4 shadow-sm" onclick="filtrarProdutos('${categoria.nome}')">
                    <div class="card-body">
                        <h5 class="card-title">${categoria.nome}</h5>
                        <p class="card-text">${categoria.descricao}</p>
                    </div>
                </div>
            `;
            listaCategorias.appendChild(categoriaCard);
        });

        categoriaContainer.style.display = 'block';
        toggleBtn.textContent = 'Fechar Categorias';
    }
}

// Função para filtrar produtos pela categoria selecionada
function filtrarProdutos(categoriaSelecionada) {
    const produtos = document.querySelectorAll('.col-md-4[data-categoria]');
    let categoriaEncontrada = false;

    produtos.forEach(produto => {
        // Exibe apenas os produtos que correspondem à categoria selecionada
        if (produto.getAttribute('data-categoria') === categoriaSelecionada) {
            produto.style.display = 'block';
            categoriaEncontrada = true; // Categoria encontrada
        } else {
            produto.style.display = 'none';
        }
    });

    // Mostrar o botão "Ver Todos" apenas se uma categoria for selecionada
    const verTodosBtn = document.getElementById('verTodosBtn');
    if (verTodosBtn) {
        verTodosBtn.style.display = categoriaEncontrada ? 'block' : 'none';
    }
}

// Função para exibir todos os produtos
function mostrarTodosProdutos() {
    const produtos = document.querySelectorAll('.col-md-4[data-categoria]');

    produtos.forEach(produto => {
        produto.style.display = 'block';
    });

    // Esconde o botão "Ver Todos" após mostrar todos os produtos
    const verTodosBtn = document.getElementById('verTodosBtn');
    if (verTodosBtn) {
        verTodosBtn.style.display = 'none';
    }
}
