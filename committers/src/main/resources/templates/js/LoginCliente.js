function login() {
  var email = document.getElementById("email").value;
  var senha = document.getElementById("senha").value;

  var usuario = {
    email: email,
    senha: senha,
  };

  fetch("http://localhost:8080/clientes/login", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(usuario),
  })
    .then((response) => {
      if (response.ok) {
        return response.json(); 
      } else if (response.status === 400) {
        throw new Error("Acesso negado. Verifique suas credenciais.");
      } else {
        throw new Error("E-Mail ou Senha INCORRETA. Tente Novamente!");
      }
    })
    .then((data) => {
      // Exibe mensagem de sucesso com SweetAlert2
      Swal.fire({
        icon: 'success',
        title: 'Login realizado com sucesso!',
        text: 'Bem-vindo!',
        confirmButtonText: 'OK'
      }).then(() => {
        const clienteId = data.clienteId;
        localStorage.setItem("loggedIn", true);
        localStorage.setItem("clienteId", clienteId);
        
        // Redireciona após o usuário clicar em "OK"
        window.location.href = "ClienteMenu.html";
      });
    })
    .catch((error) => {
      console.error("Erro ao fazer login:", error.message);
      Swal.fire({
        icon: 'error',
        title: 'Erro ao fazer login',
        text: error.message,
        confirmButtonText: 'Tente novamente'
      });
    });
}