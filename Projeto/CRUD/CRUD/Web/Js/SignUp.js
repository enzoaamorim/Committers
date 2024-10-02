document.addEventListener('DOMContentLoaded', function() {    
    document.getElementById('btnSignup').addEventListener('click', function() {
        // Recupera os valores dos campos de nome, CPF, e-mail e senha
        var nome = document.querySelector('.input-group.nome input').value;
        var cpf = document.querySelector('.input-group.cpf input').value;
        var email = document.querySelector('.input-group.email input').value;
        var password = document.querySelector('.input-group.senha input').value;
        var repeatPassword = document.querySelector('.input-group.repetirsenha input').value;

        // Validação dos valores inseridos (exemplo simples)
        if (nome && cpf && email && password && repeatPassword && password === repeatPassword) {
            // Armazena as informações do novo usuário (exemplo: enviar para um servidor ou banco de dados)
            // Redireciona o usuário para a página de login
            window.location.href = 'login.html';
        } else {
            // Exibe uma mensagem de erro
            alert('Por favor, preencha todos os campos corretamente e verifique se as senhas coincidem.');
        }
    });
});    