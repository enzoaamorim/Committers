function login() {
    var email = document.getElementById("email").value;
    var senha = document.getElementById("senha").value;
  
    var usuario = {
      email: email,
      senha: senha,
    };
  
    fetch("http://localhost:8080/usuarios/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(usuario),
    })
      .then((response) => {
        if (response.status === 200) {
          window.location.href = "/target/classes/templates/html/Backoffice.html";
        } else if (response.status === 400) {
          alert("Acesso negado. Verifique suas credenciais.");
        } else {
          throw new Error("Erro durante a requisição.");
        }
      })
      .catch((error) => {
        console.error("Erro durante a requisição:", error);
        alert("Ocorreu um erro durante o login. Tente novamente mais tarde.");
      });
  }
  