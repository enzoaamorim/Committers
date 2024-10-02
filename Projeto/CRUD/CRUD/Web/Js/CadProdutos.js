// Selecione o botão de cadastro
const cadastrarBtn = document.querySelector('.cadastrar input[type="submit"]');

// Adicione um ouvinte de evento para o botão de cadastro
cadastrarBtn.addEventListener('click', function(event) {
    event.preventDefault(); // Evita o envio do formulário

    // Capture os valores dos campos de cadastro
    const equipamento = document.querySelector('.equipamento input').value;
    const marca = document.querySelector('.marca input').value;
    const modelo = document.querySelector('.modelo input').value;
    const numeroSerie = document.querySelector('.numero-serie input').value;
    const localizacao = document.querySelector('.localizacao input').value;

    // Aqui você pode processar os dados capturados, como enviá-los para um servidor ou armazená-los localmente.

});