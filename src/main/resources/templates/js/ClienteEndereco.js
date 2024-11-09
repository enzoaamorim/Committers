document.addEventListener("DOMContentLoaded", function () {
    // Verificar ID do cliente na URL
    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get("id");
  
    if (!userId || isNaN(userId) || userId <= 0) {
      alert("ID de usuário inválido ou não fornecido.");
    } else {
      alert("ID do cliente: " + userId);
    }
  
    const cepInput = document.getElementById("cep");
    const logradouroInput = document.querySelector(".logradouro");
    const numeroInput = document.getElementById("numero");
    const complementoInput = document.getElementById("complemento");
    const bairroInput = document.getElementById("bairro");
    const cidadeInput = document.getElementById("cidade");
    const ufInput = document.getElementById("uf");
  
    cepInput.addEventListener("change", function () {
      const cep = cepInput.value.replace("-", "");
      fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then((response) => response.json())
        .then((data) => {
          logradouroInput.value = data.logradouro || "";
          complementoInput.value = data.complemento || "";
          bairroInput.value = data.bairro || "";
          cidadeInput.value = data.localidade || "";
          ufInput.value = data.uf || "";
        })
        .catch((error) => console.error("Erro ao buscar CEP:", error));
    });
  
    const formulario = document.getElementById("formCadastro");
  
    if (formulario) {
      formulario.addEventListener("submit", function (event) {
        event.preventDefault();
  
        const userData = {
          id: userId,
          cep: cepInput.value,
          logradouro: logradouroInput.value,
          numero: numeroInput.value,
          complemento: complementoInput.value,
          bairro: bairroInput.value,
          cidade: cidadeInput.value,
          uf: ufInput.value,
        };
  
        fetch("http://localhost:8080/endereco", {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify(userData),
        })
          .then(function (res) {
            if (res.ok) {
              return res.json();
            } else {
              throw new Error("Erro na resposta do servidor");
            }
          })
          .then(function (data) {
            console.log("Endereço cadastrado:", data);
            window.location.href = "ClienteMenu.html";
            limpar();
          })
          .catch(function (error) {
            console.error("Erro ao enviar os dados:", error);
          });
      });
  
      function limpar() {
        formulario.reset();
      }
    } else {
      console.error("Formulário não encontrado!");
    }
  });
  