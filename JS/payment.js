// payment.js

// Aqui você pode adicionar qualquer lógica específica para o pagamento, se necessário

// Exemplo: Validação do formulário antes do envio
document.querySelector('form').addEventListener('submit', function (event) {
    const cardNumber = document.getElementById('cardNumber').value;
    const cardholderName = document.getElementById('cardholderName').value;
    const expiryDate = document.getElementById('expiryDate').value;
    const cvv = document.getElementById('cvv').value;

    // Validação simples dos campos
    if (!cardNumber || !cardholderName || !expiryDate || !cvv) {
        event.preventDefault(); // Impede o envio do formulário se algum campo estiver vazio
        alert('Por favor, preencha todos os campos.');
    }
});
