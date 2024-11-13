const formulario = document.querySelector("form");
const Inome = document.querySelector(".nome");
const Iemail = document.querySelector(".email");
const Icpf = document.querySelector(".cpf");
const Isenha = document.querySelector(".senha");
const Igenero = document.querySelector(".genero");
const Idata = document.querySelector(".data");

function validarCampos() {
  if (!Inome.value || !Iemail.value || !Icpf.value || !Isenha.value || !Igenero.value || !Idata.value) {
    Swal.fire({
      icon: 'error',
      title: 'Erro!',
      text: 'Todos os campos precisam ser preenchidos!',
    });
    return false;
  }
  return true;
}

function cadastrar() {
  fetch("http://localhost:8080/clientes", {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    method: "POST",
    body: JSON.stringify({
      nome: Inome.value,
      email: Iemail.value,
      cpf: Icpf.value,
      senha: Isenha.value,
      genero: Igenero.value,
      data: Idata.value,
    })
  })
    .then(function (res) {
      if (res.ok) {
        Swal.fire({
          icon: 'success',
          title: 'Sucesso!',
          text: 'Cadastro realizado com sucesso!',
        });
        limpar();
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Erro!',
          text: 'Falha ao realizar o cadastro. Tente novamente.',
        });
      }
    })
    .catch(function (error) {
      Swal.fire({
        icon: 'error',
        title: 'Erro!',
        text: 'Ocorreu um erro ao conectar-se ao servidor. Tente novamente.',
      });
      console.error(error);
    });
}

function limpar() {
  Inome.value = "";
  Iemail.value = "";
  Icpf.value = "";
  Isenha.value = "";
  Igenero.value = "";
  Idata.value = "";
}

formulario.addEventListener('submit', function (event) {
  event.preventDefault();

  if (validarCampos()) {
    cadastrar();
  }
});