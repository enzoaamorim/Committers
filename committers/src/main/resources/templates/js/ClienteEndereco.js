document.addEventListener("DOMContentLoaded", function () {
  function configurarFormulario(idForm, prefixo) {
    const formulario = document.getElementById(idForm);
    const cepInput = document.getElementById(`cep${prefixo}`);
    const logradouroInput = formulario.querySelector(".logradouro");
    const numeroInput = document.getElementById(`numero${prefixo}`);
    const complementoInput = document.getElementById(`complemento${prefixo}`);
    const bairroInput = document.getElementById(`bairro${prefixo}`);
    const cidadeInput = document.getElementById(`cidade${prefixo}`);
    const ufInput = document.getElementById(`uf${prefixo}`);

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

    formulario.addEventListener("submit", function (event) {
      event.preventDefault();

      const endereco = {
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
        body: JSON.stringify(endereco),
      })
        .then((res) => {
          if (res.ok) {
            return res.json();
          } else {
            throw new Error("Erro na resposta do servidor");
          }
        })
        .then((data) => {
          console.log(`${prefixo} cadastrado:`, data);
          formulario.reset();
        })
        .catch((error) => console.error(`Erro ao enviar ${prefixo}:`, error));
    });
  }

  configurarFormulario("formEntrega", "Entrega");
});
