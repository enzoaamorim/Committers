const nome = document.querySelector(".nome")
const cpf = document.querySelector(".cpf")
const senha = document.querySelector(".senha")
const nivel = document.querySelector(".nivel")

document.addEventListener("DOMContentLoaded", function () {
  const url = new URLSearchParams(document.location.search);
  const usuarioId = url.get("id");

  fetch(`http://localhost:8080/usuario/${usuarioId}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Erro ao obter informações do usuário");
      }
      return response.json();
    })
    .then((usuario) => {
      nome.value = usuario.nome;
      cpf.value = usuario.cpf;
      senha.value = usuario.senha;
      nivel.value = usuario.nivel;
    })
    .catch((error) => {
      console.error("Erro ao obter informações do usuário:", error);
    });

  document.querySelector("#botaoEditar").addEventListener("click", function (e) {
    e.preventDefault(); // Evita o comportamento padrão do formulário

    const nomeValue = nome.value;
    const cpfValue = cpf.value;
    const senhaValue = senha.value;
    const nivelValue = nivel.value;

    const usuario = {
      nome: nomeValue,
      cpf: cpfValue,
      senha: senhaValue,
      nivel: nivelValue,
    };

    fetch(`http://localhost:8080/usuario/${usuarioId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(usuario),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erro ao editar usuário");
        }
        console.log("Usuário editado com sucesso!");
        window.location.href = "ListaUsuario.html";
      })
      .catch((error) => {
        console.error("Erro ao editar usuário:", error);
      });
  });
});
