document.addEventListener("DOMContentLoaded", function () {
  listarPedidos();
});

async function buscarCliente(clienteId) {
  try {
    const response = await fetch(`http://localhost:8080/clientes/${clienteId}`);
    if (!response.ok) {
      console.error(`Erro ao buscar cliente ${clienteId}: ${response.statusText}`);
      return `Cliente ${clienteId}`;
    }
    const cliente = await response.json();
    return cliente.nome || `Cliente ${clienteId}`;
  } catch (error) {
    console.error(`Erro de conexão ao buscar cliente ${clienteId}:`, error);
    return `Cliente ${clienteId}`;
  }
}

async function listarPedidos() {
  console.log("Iniciando a função listarPedidos");

  const pedidosSalvos = JSON.parse(localStorage.getItem("pedidosSalvos") || "[]");
  const listaUsuarios = document.getElementById("listaUsuarios");

  if (!listaUsuarios) {
    console.error("Elemento 'listaUsuarios' não encontrado no DOM.");
    return;
  }

  listaUsuarios.innerHTML = ""; // Limpar lista

  for (const pedido of pedidosSalvos) {
    const li = document.createElement("li");
    li.className = "div-usuario";

    const textoStatus = pedido.status ? "Concluído" : "Pendente";
    const classeStatus = pedido.status ? "status-concluido" : "status-pendente";

    const clienteNome = await buscarCliente(pedido.clienteId);

    li.innerHTML = `
      <span class="nome">${clienteNome}</span>
      <span class="email">${pedido.id}</span>
      <span class="status ${classeStatus}">${textoStatus}</span>
    `;

    listaUsuarios.appendChild(li);
  }
}