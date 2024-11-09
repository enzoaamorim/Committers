const formulario = document.querySelector("form");
const Inome = document.querySelector(".nome");
const Iemail = document.querySelector(".email");
const Icpf = document.querySelector(".cpf");
const Isenha = document.querySelector(".senha");
const Igenero = document.querySelector(".genero");
const Idata = document.querySelector(".data");


function cadastrar (){

fetch("http://localhost:8080/clientes",
{
    headers:{
        'Accept': 'application/json',
        'Content-Type': 'application/json'   
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

.then(function (res) { console.log(res)})
.catch(function (res) { console.log(res)})
};

function limpar(){
    Inome.value = "";
    Iemail.value = "";
    Icpf.value = "";
    Isenha.value = "";
    Igenero.value = "";
    Idata.value = "";
};

formulario.addEventListener('submit', function (event){
    event.preventDefault();
   
 cadastrar();
});