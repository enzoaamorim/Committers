// productsAdd.js

document.getElementById('addProductForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Impede o envio padrão do formulário

    const productName = document.getElementById('productName').value;
    const productDescription = document.getElementById('productDescription').value;
    const productPrice = document.getElementById('productPrice').value;
    const productImage = document.getElementById('productImage').value;

    // Aqui você pode adicionar a lógica para enviar os dados para o servidor

    alert(`Produto ${productName} adicionado com sucesso!`);
    
    // Limpa os campos do formulário após o envio
    this.reset();
});
