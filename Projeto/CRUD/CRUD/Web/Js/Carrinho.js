// Array para armazenar os produtos no carrinho
const cart = [];
const cartItemsContainer = document.getElementById('cart-items');
const totalPriceContainer = document.getElementById('total-price');
const shippingCostContainer = document.getElementById('shipping-cost');
const zipcodeInput = document.getElementById('zipcode');
const calculateShippingButton = document.getElementById('calculate-shipping');

// Função para calcular o frete baseado no CEP
function calculateShipping(total, zipcode) {
   if (!zipcode) {
      return 0; // Sem CEP, não calcula frete
   }
   
   // Simulação de cálculo de frete
   if (total > 20) {
      return 0; // Frete grátis para compras acima de $20
   } else {
      return 5; // Frete de $5 para compras abaixo de $20
   }
}

// Função para atualizar o carrinho na tela
function updateCart() {
   cartItemsContainer.innerHTML = '';
   let total = 0;

   cart.forEach((item, index) => {
      const itemDiv = document.createElement('div');
      itemDiv.textContent = `${item.name} - $${item.price} x ${item.quantity}`;

      const increaseBtn = document.createElement('button');
      increaseBtn.textContent = '+';
      increaseBtn.addEventListener('click', () => {
         item.quantity++;
         updateCart();
      });

      const decreaseBtn = document.createElement('button');
      decreaseBtn.textContent = '-';
      decreaseBtn.addEventListener('click', () => {
         if (item.quantity > 1) {
            item.quantity--;
            updateCart();
         }
      });

      const removeBtn = document.createElement('button');
      removeBtn.textContent = 'Remover';
      removeBtn.addEventListener('click', () => {
         cart.splice(index, 1);
         updateCart();
      });

      itemDiv.appendChild(increaseBtn);
      itemDiv.appendChild(decreaseBtn);
      itemDiv.appendChild(removeBtn);
      cartItemsContainer.appendChild(itemDiv);

      total += item.price * item.quantity; // Calcula o total com base na quantidade
   });

   // Atualiza o total na tela
   totalPriceContainer.textContent = `Total: $${total.toFixed(2)}`;
}

// Adicionar evento de clique nos botões "Adicionar ao carrinho"
document.querySelectorAll('.add-to-cart').forEach(button => {
   button.addEventListener('click', () => {
      const productElement = button.parentElement;
      const productName = productElement.querySelector('h3').textContent;
      const productPrice = parseFloat(productElement.getAttribute('data-price'));

      const existingProduct = cart.find(item => item.name === productName);
      if (existingProduct) {
         existingProduct.quantity++;
      } else {
         cart.push({ name: productName, price: productPrice, quantity: 1 });
      }
      updateCart();
   });
});

// Evento para calcular o frete
calculateShippingButton.addEventListener('click', () => {
   const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
   const zipcode = zipcodeInput.value.trim();
   const shippingCost = calculateShipping(total, zipcode);
   shippingCostContainer.textContent = `Frete: $${shippingCost.toFixed(2)}`;
});

// Evento de clique no botão de finalização da compra
document.getElementById('checkout').addEventListener('click', () => {
   if (cart.length === 0) {
      alert('Seu carrinho está vazio!');
   } else {
      alert('Compra finalizada com sucesso!');
      cart.length = 0; // Limpa o carrinho
      updateCart();
      shippingCostContainer.textContent = 'Frete: $0.00'; // Reseta o frete
      zipcodeInput.value = ''; // Limpa o campo de CEP
   }
});
