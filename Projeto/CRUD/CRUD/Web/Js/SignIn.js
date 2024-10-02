document.getElementById('btnSignin').addEventListener('click', function() {
    // Recupera os valores dos campos de e-mail e senha
    var email = document.querySelector('.input-group.email input').value;
    var password = document.querySelector('.input-group.senha input').value;

    // Validação dos valores inseridos (exemplo simples)
    if (email === 'user@example.com' && password === 'password') {
        // Redireciona o usuário para a página de destino
        window.location.href = 'Home.html';
    } else {
        // Exibe uma mensagem de erro
        alert('E-mail ou senha incorretos. Tente novamente.');
    }
});