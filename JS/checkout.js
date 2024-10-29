// checkout.js

document.getElementById('checkoutForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Impede o envio padrão do formulário

    // Obtendo valores do formulário
    const fullName = document.getElementById('fullName').value;
    const address = document.getElementById('address').value;
    const city = document.getElementById('city').value;
    const zipCode = document.getElementById('zipCode').value;
    const paymentMethod = document.getElementById('paymentMethod').value;

    // Aqui você pode adicionar lógica para enviar esses dados para um servidor, por exemplo

    alert(`Obrigado, ${fullName}! Sua compra foi realizada com sucesso!`);
    // Redirecionar ou realizar outras ações após a compra
});
