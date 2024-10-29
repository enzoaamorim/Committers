// login.js

document.querySelector("form").addEventListener("submit", function(event) {
    event.preventDefault(); // Impede o envio padrão do formulário
    // Aqui você pode adicionar a lógica para autenticar o usuário
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    console.log("Usuário:", username);
    console.log("Senha:", password);

    // Adicione sua lógica de autenticação aqui
});
