// products.js

// Aqui você pode adicionar qualquer lógica específica para a página de produtos, se necessário

// Exemplo: Adicionar funcionalidade para o botão "Ver Detalhes"
const detailButtons = document.querySelectorAll('.btn-primary');

detailButtons.forEach(button => {
    button.addEventListener('click', function () {
        alert('Redirecionando para os detalhes do produto...');
        // Aqui você pode redirecionar para a página de detalhes do produto
        // window.location.href = 'product_detail.html'; // Descomente para redirecionar
    });
});
