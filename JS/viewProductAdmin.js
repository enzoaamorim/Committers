// viewProductAdmin.js

console.log("Página de detalhes do produto (Admin) carregada.");

// Exemplo de ação ao clicar no botão "Editar Produto"
document.querySelector('.btn-warning').addEventListener('click', function() {
    alert('Redirecionando para a página de edição do produto...');
    // Aqui você pode adicionar a lógica para redirecionar para a página de edição
});

// Exemplo de ação ao clicar no botão "Remover Produto"
document.querySelector('.btn-danger').addEventListener('click', function() {
    if (confirm('Tem certeza que deseja remover este produto?')) {
        alert('Produto removido com sucesso!');
        // Aqui você pode adicionar a lógica para remover o produto
    }
});
