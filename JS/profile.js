// profile.js

document.getElementById('profileForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Impede o envio padrão do formulário

    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if (password && password !== confirmPassword) {
        alert("As senhas não correspondem!");
        return;
    }

    // Aqui você pode adicionar a lógica para enviar os dados para o servidor

    alert(`Perfil atualizado com sucesso!`);
    
    // Limpa os campos do formulário após o envio
    this.reset();
});
