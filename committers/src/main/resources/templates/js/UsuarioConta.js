document.addEventListener("DOMContentLoaded", function () {
    const usuarioId = localStorage.getItem("usuarioId");
    const loggedIn = localStorage.getItem("loggedIn");

    if (!loggedIn) {
        // Redireciona para a página de login caso o usuário não esteja logado
        window.location.href = "LoginUsuario.html";
        return;
    }

    console.log("Usuário ID no localStorage:", usuarioId);

    if (usuarioId) {
        // Faz uma requisição ao endpoint para buscar os dados do usuário
        fetch(`http://localhost:8080/usuario/${usuarioId}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Erro na requisição. Status: " + response.status);
                }
                return response.json();
            })
            .then((usuario) => {
                // Preenche os campos com os dados do usuário
                document.querySelector(".nome").innerText = usuario.nome;
                document.querySelector(".email").innerText = usuario.email;
                document.querySelector(".cpf").innerText = usuario.cpf;

                // Atualiza o título da página com o nome do usuário
                document.title = `Conta de ${usuario.nome}`;
            })
            .catch((error) => {
                console.error("Erro ao obter informações do usuário:", error);
                alert("Não foi possível carregar os dados do usuário. Tente novamente mais tarde.");
            });
    }
});
