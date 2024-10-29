// product_detail.js

// Aqui você pode adicionar qualquer lógica específica para os detalhes do produto, se necessário

// Exemplo: Adicionar funcionalidade para o botão "Adicionar ao Carrinho"
document.querySelector('.btn-primary').addEventListener('click', function () {
    alert('Produto adicionado ao carrinho!');
});

// Exemplo: Deixe sua avaliação
document.querySelector('.btn-info').addEventListener('click', function () {
    const userRating = prompt("Deixe sua avaliação (1 a 5 estrelas):");
    if (userRating) {
        alert(`Obrigado pela sua avaliação de ${userRating} estrelas!`);
    }
});
