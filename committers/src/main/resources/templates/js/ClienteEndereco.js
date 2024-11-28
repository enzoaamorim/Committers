document.addEventListener("DOMContentLoaded", function () {
  // Configurar CEP e envio individual de formulário
  function configurarFormulario(idForm, prefixo) {
      const formulario = document.getElementById(idForm);
      const cepInput = document.getElementById(`cep${prefixo}`);
      const logradouroInput = formulario.querySelector(".logradouro");
      const numeroInput = document.getElementById(`numero${prefixo}`);
      const complementoInput = document.getElementById(`complemento${prefixo}`);
      const bairroInput = document.getElementById(`bairro${prefixo}`);
      const cidadeInput = document.getElementById(`cidade${prefixo}`);
      const ufInput = document.getElementById(`uf${prefixo}`);

      // Buscar informações do CEP
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

      // Envio do formulário individual
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
  configurarFormulario("formFaturamento", "Faturamento");

  // Navegação entre etapas do formulário
  const nextButtons = document.querySelectorAll(".next-step");
  const prevButtons = document.querySelectorAll(".prev-step");
  const steps = document.querySelectorAll(".form-step");

  nextButtons.forEach((button) => {
      button.addEventListener("click", () => {
          const nextStep = document.getElementById(button.dataset.next);
          steps.forEach((step) => step.classList.remove("active"));
          nextStep.classList.add("active");
      });
  });

  prevButtons.forEach((button) => {
      button.addEventListener("click", () => {
          const prevStep = document.getElementById(button.dataset.prev);
          steps.forEach((step) => step.classList.remove("active"));
          prevStep.classList.add("active");
      });
  });

  // Enviar ambos os formulários combinados
  document.getElementById("submitBoth").addEventListener("click", function () {
      const formEntrega = new FormData(document.getElementById("formEntrega"));
      const dadosEntrega = Object.fromEntries(formEntrega.entries());

      const formFaturamento = new FormData(document.getElementById("formFaturamento"));
      const dadosFaturamento = Object.fromEntries(formFaturamento.entries());

      const dadosCombinados = {
          entrega: dadosEntrega,
          faturamento: dadosFaturamento,
      };

      fetch("http://localhost:8080/endereco", {
          headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify(dadosCombinados),
      })
          .then((res) => {
              if (res.ok) {
                  return res.json();
              } else {
                  throw new Error("Erro na resposta do servidor");
              }
          })
          .then((data) => {
              console.log("Endereços cadastrados:", data);
              alert("Endereços enviados com sucesso!");
              document.getElementById("formEntrega").reset();
              document.getElementById("formFaturamento").reset();
          })
          .catch((error) => console.error("Erro ao enviar endereços:", error));
  });
});
