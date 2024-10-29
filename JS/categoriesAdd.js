// categoriesAdd.js

document.getElementById('addCategoryForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Impede o envio do formulário

    // Coleta os dados do formulário
    const categoryName = document.getElementById('categoryName').value;
    const categoryDescription = document.getElementById('categoryDescription').value;
    const categoryImage = document.getElementById('categoryImage').value;

    // Exibir uma mensagem de confirmação (pode ser substituído por uma lógica de envio para o servidor)
    alert(`Categoria "${categoryName}" adicionada com sucesso!`);

    // Limpa o formulário
    this.reset();
});
