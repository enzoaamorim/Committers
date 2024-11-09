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
        throw new Error("Usuario não encontrado!");
      }
    })
    .then((data) => {
      
      const clienteId = data.clienteId;
      localStorage.setItem("loggedIn", true);
      localStorage.setItem("clienteId", clienteId);
      window.location.href = "ClienteMenu.html";
    })
    .catch((error) => {
      console.error("Usuario não encontrado:", error.message);
      alert(error.message);
    });
}
