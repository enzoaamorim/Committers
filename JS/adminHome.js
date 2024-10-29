document.addEventListener('DOMContentLoaded', function() {
    // Função para confirmar a ação do usuário ao excluir um produto
    const deleteButtons = document.querySelectorAll('.btn-delete');
    deleteButtons.forEach(button => {
        button.addEventListener('click', function(event) {
            const confirmDelete = confirm('Você tem certeza que deseja excluir este produto?');
            if (!confirmDelete) {
                event.preventDefault(); // Cancela a ação se o usuário clicar em "Cancel"
            } else {
                // Adicione feedback visual aqui, se desejar
                alert('Produto excluído com sucesso!'); // Exemplo simples
            }
        });
    });
});
