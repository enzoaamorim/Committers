document.addEventListener("DOMContentLoaded", function() {
    const roleSelect = document.getElementById("role");
    const customerAddressFields = document.getElementById("customerAddressFields");

    // Mostra ou oculta os campos de endereço conforme a seleção da função
    roleSelect.addEventListener("change", function() {
        if (roleSelect.value === "customer") {
            customerAddressFields.style.display = "block";
        } else {
            customerAddressFields.style.display = "none";
        }
    });

    // Validação e envio do formulário
    document.getElementById("addProfileForm").addEventListener("submit", function(event) {
        event.preventDefault();

        const username = document.getElementById("username").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        // Lógica de envio para o servidor
        alert("Perfil adicionado com sucesso!");

        // Reseta o formulário
        this.reset();
        customerAddressFields.style.display = "none";
    });
});