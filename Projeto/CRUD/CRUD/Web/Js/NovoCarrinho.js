const product = [
    {
        id: 0,
        image: 'image/gg-1.jpg',
        title: 'Z Flip Foldable Mobile',
        price: 120,
    },
    {
        id: 1,
        image: 'image/hh-2.jpg',
        title: 'Air Pods Pro',
        price: 60,
    },
    {
        id: 2,
        image: 'image/ee-3.jpg',
        title: '250D DSLR Camera',
        price: 230,
    },
    {
        id: 3,
        image: 'image/aa-1.jpg',
        title: 'Head Phones',
        price: 100,
    }
];
const categories = [...new Set(product.map((item)=>
    {return item}))]
    let i=0;
document.getElementById('root').innerHTML = categories.map((item)=>
{
    var {image, title, price} = item;
    return(
        `<div class='box'>
            <div class='img-box'>
                <img class='images' src=${image}></img>
            </div>
        <div class='bottom'>
        <p>${title}</p>
        <h2>$ ${price}.00</h2>`+
        "<button onclick='addtocart("+(i++)+")'>Add to cart</button>"+
        `</div>
        </div>`
    )
}).join('')

var cart =[];

function addtocart(a){
    cart.push({...categories[a]});
    displaycart();
}
function delElement(a){
    cart.splice(a, 1);
    displaycart();
}

function displaycart(){
    let j = 0, total=0;
    document.getElementById("count").innerHTML=cart.length;
    if(cart.length==0){
        document.getElementById('cartItem').innerHTML = "Your cart is empty";
        document.getElementById("total").innerHTML = "$ "+0+".00";
    }
    else{
        document.getElementById("cartItem").innerHTML = cart.map((items)=>
        {
            var {image, title, price} = items;
            total=total+price;
            document.getElementById("total").innerHTML = "$ "+total+".00";
            return(
                `<div class='cart-item'>
                <div class='row-img'>
                    <img class='rowimg' src=${image}>
                </div>
                <p style='font-size:12px;'>${title}</p>
                <h2 style='font-size: 15px;'>$ ${price}.00</h2>`+
                "<i class='fa-solid fa-trash' onclick='delElement("+ (j++) +")'></i></div>"
            );
        }).join('');
    }

    const cart = [];
    const cartItemsContainer = document.getElementById('cartItem');
    const totalPriceContainer = document.getElementById('total');
    const shippingCostContainer = document.getElementById('shipping-cost');
    const zipcodeInput = document.getElementById('zipcode');
    const calculateShippingButton = document.getElementById('calculate-shipping');
    
    // Função para calcular a distância e o frete
    function calculateDistance(zipcode) {
        const origem = "04696-000"; // CEP da Av. Eng. Eusébio Stevaux
        const endpoint = `https://viacep.com.br/ws/${zipcode}/json/`; // API ViaCEP para buscar a localização
    
        return fetch(endpoint)
            .then(response => response.json())
            .then(data => {
                if (data.erro) throw new Error("CEP inválido");
    
                // Simulação: cada 2 km, o frete aumenta R$ 2
                const distanceKm = Math.random() * 20 + 1; // Exemplo de distância aleatória
                const shippingCost = Math.ceil(distanceKm / 2) * 2;
    
                return shippingCost;
            })
            .catch(error => {
                alert("Erro ao calcular frete: " + error.message);
                return 0;
            });
    }
    
    // Atualiza o carrinho na tela
    function updateCart() {
        cartItemsContainer.innerHTML = '';
        let total = 0;
    
        cart.forEach((item, index) => {
            const itemDiv = document.createElement('div');
            itemDiv.textContent = `${item.name} - R$ ${item.price} x ${item.quantity}`;
    
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
    
            itemDiv.append(increaseBtn, decreaseBtn, removeBtn);
            cartItemsContainer.appendChild(itemDiv);
    
            total += item.price * item.quantity;
        });
    
        totalPriceContainer.textContent = `Total: R$ ${total.toFixed(2)}`;
    }
    
    // Evento de cálculo do frete
    calculateShippingButton.addEventListener('click', async () => {
        const zipcode = zipcodeInput.value.trim();
        const shippingCost = await calculateDistance(zipcode);
    
        shippingCostContainer.textContent = `Frete: R$ ${shippingCost.toFixed(2)}`;
    });
    
    // Finalização da compra
    document.getElementById('checkout').addEventListener('click', () => {
        if (cart.length === 0) {
            alert('Seu carrinho está vazio!');
        } else {
            alert('Compra finalizada com sucesso!');
            cart.length = 0;
            updateCart();
            shippingCostContainer.textContent = 'Frete: R$ 0,00';
            zipcodeInput.value = '';
        }
    });
    
    // Exemplo de evento para adicionar produtos ao carrinho
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
       
}