document.addEventListener("DOMContentLoaded", function () {
  let currentFormIndex = 0;
  const forms = document.querySelectorAll(".form-wrapper");
  const actionButton = document.getElementById("actionButton");

  // Função para alternar entre formulários
  function alternarFormulario() {
      // Enviar o formulário atual
      const currentForm = forms[currentFormIndex].querySelector("form");
      enviarFormulario(currentForm)
          .then(() => {
              if (currentFormIndex < forms.length - 1) {
                  // Avançar para o próximo formulário
                  forms[currentFormIndex].style.display = "none";
                  currentFormIndex++;
                  forms[currentFormIndex].style.display = "block";
                  actionButton.textContent = currentFormIndex === forms.length - 1 ? "Concluir" : "Próximo";
              } else {
                  // Redirecionar para a página de pagamento
                  window.location.href = "/committers/src/main/resources/templates/html/CheckCliente.html";
              }
          })
          .catch((error) => {
              Swal.fire("Erro", `Erro ao enviar o formulário: ${error.message}`, "error");
              console.error(error);
          });
  }

  // Configuração do botão de ação
  actionButton.addEventListener("click", alternarFormulario);

  // Função para enviar formulário
  function enviarFormulario(form) {
      return new Promise((resolve, reject) => {
          const endpoint = form.getAttribute("data-endpoint");
          const formData = new FormData(form);
          const data = {};
          formData.forEach((value, key) => {
              data[key] = value;
          });

          // Salvar no localStorage
          salvarNoLocalStorage(form.id, data);

          // Enviar para o backend
          fetch(`http://localhost:8080${endpoint}`, {
              method: "POST",
              headers: {
                  "Content-Type": "application/json",
              },
              body: JSON.stringify(data),
          })
          .then((response) => {
              if (!response.ok) {
                  throw new Error(`Erro no cadastro: ${response.status}`);
              }
              return response.json();
          })
          .then((result) => {
              Swal.fire("Sucesso", "Formulário enviado com sucesso!", "success");
              resolve();
          })
          .catch((error) => {
              reject(error);
          });
      });
  }

  // Função para salvar no localStorage
  function salvarNoLocalStorage(formId, data) {
      try {
          // Recuperar dados existentes do localStorage
          const storedData = JSON.parse(localStorage.getItem('userFormData') || '{}');

          // Adicionar ou atualizar dados do formulário específico
          if (formId === 'formEntrega') {
              storedData.enderecoEntrega = data;
          } else if (formId === 'formFaturamento') {
              storedData.enderecoFaturamento = data;
          }

          // Salvar de volta no localStorage
          localStorage.setItem('userFormData', JSON.stringify(storedData));
      } catch (error) {
          console.error('Erro ao salvar no localStorage:', error);
          Swal.fire("Erro", "Não foi possível salvar os dados localmente", "error");
      }
  }

  // Configurar autocomplete no CEP
  function buscarDadosCEP(cep, form) {
      const cepLimpo = cep.replace(/\D/g, "");
      if (!/^[0-9]{8}$/.test(cepLimpo)) {
          Swal.fire("Erro", "CEP inválido.", "error");
          return;
      }
      fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`)
          .then((response) => response.json())
          .then((data) => {
              if (data.erro) {
                  Swal.fire("Erro", "CEP não encontrado.", "error");
                  return;
              }
              form.querySelector('[name="logradouro"]').value = data.logradouro || "";
              form.querySelector('[name="bairro"]').value = data.bairro || "";
              form.querySelector('[name="cidade"]').value = data.localidade || "";
              form.querySelector('[name="uf"]').value = data.uf || "";
          })
          .catch((error) => {
              Swal.fire("Erro", "Não foi possível buscar os dados do CEP.", "error");
          });
  }

  // Adicionar evento de busca de CEP para cada formulário
  forms.forEach((formWrapper) => {
      const form = formWrapper.querySelector("form");
      const cepInput = form.querySelector('[name="cep"]');
      cepInput.addEventListener("change", () => {
          buscarDadosCEP(cepInput.value, form);
      });
  });
});