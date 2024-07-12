let cart = [];
let currentItem = {};

function addToCart(item, price) {
    cart.push({ item, price });
    alert(item + " añadido al carrito");
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartWindow(); // Actualiza la ventana del carrito
}

let cartWindow = null;

function openCart() {
    if (cartWindow === null || cartWindow.closed) {
        cartWindow = window.open("", "Carrito", "width=600,height=400");
    }
    updateCartWindow();
}

function updateCartWindow() {
    if (cartWindow && !cartWindow.closed) {
        cartWindow.document.open();
        cartWindow.document.write("<h1>Carrito de Compras</h1>");
        cartWindow.document.write("<ul>");
        cart.forEach((cartItem, index) => {
            cartWindow.document.write("<li>" + cartItem.item + " - " + cartItem.price.toFixed(2) + "$ <button onclick='window.opener.removeFromCart(" + index + ")'>Eliminar</button></li>");
        });
        cartWindow.document.write("</ul>");
        const total = cart.reduce((sum, cartItem) => sum + cartItem.price, 0);
        cartWindow.document.write("<p>Total: " + total.toFixed(2) + "$</p>");
        cartWindow.document.write("<button onclick='window.opener.sendOrderToWhatsApp()'>Enviar pedido por WhatsApp</button>");
        cartWindow.document.close();
    }
}

function sendOrderToWhatsApp() {
    let message = "Hola, me gustaría hacer el siguiente pedido:\n\n";
    cart.forEach(cartItem => {
        message += cartItem.item + " - " + cartItem.price.toFixed(2) + "$\n";
    });
    const total = cart.reduce((sum, cartItem) => sum + cartItem.price, 0);
    message += "\nTotal: " + total.toFixed(2) + "$";
    const phoneNumber = "8119103836"; // Reemplaza con tu número de teléfono de WhatsApp
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
}

function chooseSize(item, modalId, option1Price, option2Price, option3Price = null, option4Price = null) {
    currentItem = { item, option1Price, option2Price, option3Price, option4Price };
    document.getElementById('item-name' + modalId.replace('sizeModal', '')).innerText = item;
    document.getElementById(modalId).style.display = 'block';
    if (option3Price) {
        document.getElementById('option' + modalId.replace('sizeModal', '') + '3').style.display = 'inline-block';
    } else {
        document.getElementById('option' + modalId.replace('sizeModal', '') + '3').style.display = 'none';
    }
    if (option4Price) {
        document.getElementById('option' + modalId.replace('sizeModal', '') + '4').style.display = 'inline-block';
    } else {
        document.getElementById('option' + modalId.replace('sizeModal', '') + '4').style.display = 'none';
    }
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

window.onload = function () {
    document.getElementById('optionFlautas1').onclick = function () {
        addToCart(currentItem.item + " (Preparadas)", currentItem.option1Price);
        closeModal('sizeModalFlautas');
    };
    document.getElementById('optionFlautas2').onclick = function () {
        addToCart(currentItem.item + " (Con todo aparte)", currentItem.option2Price);
        closeModal('sizeModalFlautas');
    };

    document.getElementById('optionFrijoles1').onclick = function () {
        addToCart(currentItem.item + " (De 1/4)", currentItem.option1Price);
        closeModal('sizeModalFrijoles');
    };
    document.getElementById('optionFrijoles2').onclick = function () {
        addToCart(currentItem.item + " (De 1/2)", currentItem.option2Price);
        closeModal('sizeModalFrijoles');
    };
    document.getElementById('optionFrijoles3').onclick = function () {
        addToCart(currentItem.item + " (De 1 litro)", currentItem.option3Price);
        closeModal('sizeModalFrijoles');
    };

    document.getElementById('optionGuisos1').onclick = function () {
        addToCart(currentItem.item + " (Chicharron en salsa verde)", currentItem.option1Price);
        closeModal('sizeModalGuisos');
    };
    document.getElementById('optionGuisos2').onclick = function () {
        addToCart(currentItem.item + " (Picadillo con papas)", currentItem.option2Price);
        closeModal('sizeModalGuisos');
    };
    document.getElementById('optionGuisos3').onclick = function () {
        addToCart(currentItem.item + " (Pollo con chile colorado)", currentItem.option3Price);
        closeModal('sizeModalGuisos');
    };
    document.getElementById('optionGuisos4').onclick = function () {
        addToCart(currentItem.item + " (Frijoles con queso)", currentItem.option4Price);
        closeModal('sizeModalGuisos');
    };

    document.getElementById('optionEnchiladas1').onclick = function () {
        addToCart(currentItem.item + " (Con cebolla)", currentItem.option1Price);
        closeModal('sizeModalEnchiladas');
    };
    document.getElementById('optionEnchiladas2').onclick = function () {
        addToCart(currentItem.item + " (Sin cebolla)", currentItem.option2Price);
        closeModal('sizeModalEnchiladas');
    };



    document.getElementById('optionHamburguesas1').onclick = function () {
        addToCart(currentItem.item + " (Censilla)", currentItem.option1Price);
        closeModal('sizeModalHamburguesas');
    };
    document.getElementById('optionHamburguesas2').onclick = function () {
        addToCart(currentItem.item + " (Doble)", currentItem.option2Price);
        closeModal('sizeModalHamburguesas');
    };


    const viewCartButton = document.createElement("button");
    viewCartButton.textContent = "Ver Carrito";
    viewCartButton.id = "viewCartButton";
    viewCartButton.onclick = openCart;
    document.body.appendChild(viewCartButton);
};
