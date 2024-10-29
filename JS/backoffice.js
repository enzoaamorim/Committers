// backoffice.js

// Função para confirmar exclusão de produtos
document.querySelectorAll('.btn-delete').forEach(button => {
    button.addEventListener('click', function () {
        const confirmed = confirm("Você tem certeza que deseja excluir este produto?");
        if (confirmed) {
            // Aqui você pode implementar a lógica para excluir o produto
            alert("Produto excluído!");
        }
    });
});
