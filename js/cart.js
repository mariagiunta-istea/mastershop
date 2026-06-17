
// obtengo la referencia en el index.html para alojar el carrito renderizado
const cartItemsList = document.getElementById('cart-items-list');

// obtengo referencia del badge rojo en el index.html que se superpone al boton del carrito, con numero de elementos contenidos en el mismo.
const cartBadge = document.getElementById('cart-badge');

// obtengo referencia en el index.html del botón Elimina todos del carrito
const btnDeleteAll= document.getElementById('clear-cart-btn');

// obtengo referencia en el index.html del campo qu emuestra el monto total de la compra
const cartTotal = document.getElementById('cart-total');

// obtengo referencia en el index.html del boton de Finalizar compra del carrito   
const btnCheckout = document.getElementById('checkout-btn');





// esta funcion renderiza el carrito con los datos del localStorage
function renderCart() {

    // se obtiene el array carrito almacenado en el localStorage
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    let template = '';

    // bucle que itera un template html con datos interpolados del array carrito para renderizarlo
    carrito.forEach((item) => {
        template += `
            <div class="card mb-3">
                <div class="row g-0">
                    <div class="col-4 d-flex align-items-center">
                        <img src="${item.image}" class="img-fluid rounded-start" alt="${item.title}">
                    </div>

                    <div class="col-8">
                        <div class="card-body">
                            <h6 class="card-title">${item.title}</h6>
                            <p class="card-text mb-1">Cantidad: ${item.cantidad}</p>
                            <small class="text-body-secondary">Precio: $${item.price}</small>
                        </div>
                    </div>

                     <button class="btn btn-outline-danger btn-sm" id="delete-item-${item.id}">
                        <i class="bi bi-trash"></i>
                     </button>
                    
                </div>
            </div>
        `;
    });


    // se aloja el carrito renderizado en la sección correspondiente del index.html
    cartItemsList.innerHTML = template;

    
    // ejecuto funcion que asigna boton de eliminacion individualizado a cada uno de los productos del carrito
    addDeleteEvents(carrito);

    
    // ejecuto funcion que actualiza el indicador de cantidad productos en boton de carrito
    updateCartBadge();

   
    // ejecuto funcion que calcula importe total de compra mostrado al final del carrito
    cartTotal.textContent = `$${calcularTotal(carrito).toFixed(2)}`;


}




// esta funcion elimina del localStorage el producto identificado por el id suministrado como parametro
function deleteCartItem(idProducto) {

    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    const carritoActualizado = carrito.filter((item) => item.id !== idProducto);

    localStorage.setItem('carrito', JSON.stringify(carritoActualizado));
}


// esta funcion asigna a cada producto del carrito un boton que permite eliminarlo del localStorage y del carrito
function addDeleteEvents(carrito) {

    carrito.forEach((item) => {

        const deleteButton = document.getElementById(`delete-item-${item.id}`);

        deleteButton.addEventListener('click', () => {
            deleteCartItem(item.id);
            renderCart();
        });
    });

}



// funcion que calcula cantidad total de items del carrito y la muestra en el badge rojo del boton de carrito
function updateCartBadge() {

    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    let cantidadTotal = 0;

    carrito.forEach((item) => {
        cantidadTotal += item.cantidad;
    });

    cartBadge.textContent = cantidadTotal;
    
 // si la cantidad total es cero invisibilizo el badge indicador de cantidad del boton del carrito
    if (cantidadTotal > 0) {
        cartBadge.classList.remove('d-none');
    } else {
        cartBadge.classList.add('d-none');
    }
}




// esta funcion da funcionalidad al boton Eliminar todos del carrito. Vacia el carrito y el localStorage.
function btnEliminaTodo() {

    btnDeleteAll.addEventListener('click', () => {
        Swal.fire({

            title: '¿Vaciar carrito?',
            text: 'Se eliminarán todos los productos del carrito.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, eliminar todo',
            cancelButtonText: 'Cancelar',
            confirmButtonColor: '#dc3545',
            cancelButtonColor: '#6c757d'

        }).then((result) => {

            if (result.isConfirmed) {

                const carrito = [];

                localStorage.setItem('carrito', JSON.stringify(carrito));  

                renderCart();

                Swal.fire({
                    title: 'Carrito vacío',
                    text: 'Todos los productos fueron eliminados.',     
                    icon: 'success',
                    confirmButtonColor: '#0d6efd'
                });
            }
        });
    });

}


// esta funcion calcula el importe total de la compra hasta el momento
function calcularTotal(carrito) {

     return carrito.reduce((acc, item) => acc + item.price * item.cantidad, 0);

}


// aqui se da funcionalidad al boton de finalizar compra del carrito. Al pulsarlo muestra cantidad de productos e importe total, y pide confirmacion de compra
function btnFinalizarCompra() {

        btnCheckout.addEventListener('click', () => {
        const carrito = JSON.parse(localStorage.getItem('carrito')) || [];

        if (carrito.length === 0) {

            Swal.fire({
                title: 'Carrito vacío',
                text: 'Agregá productos antes de finalizar la compra.',
                icon: 'info',
                confirmButtonColor: '#0d6efd'
            });
            return;
        }

        const cantidadTotal = carrito.reduce((acc, item) => acc + item.cantidad, 0);

        Swal.fire({
            title: '¿Finalizar compra?',
            text: `Usted está por adquirir ${cantidadTotal} producto(s) por un importe total de $${calcularTotal(carrito).toFixed(2)}.`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Confirmar compra',
            cancelButtonText: 'Cancelar',
            confirmButtonColor: '#198754',
            cancelButtonColor: '#6c757d'
        }).then((result) => {     

            if (result.isConfirmed) {
                localStorage.setItem('carrito', JSON.stringify([]));
                renderCart();

                Swal.fire({
                    title: '¡Gracias por su compra!',
                    icon: 'success',
                    timer: 2500,
                    showConfirmButton: false
                });
            }
        });

    });
}


// ejecuto la funcion que da funcionalidad al boton de eliminar todo del carrito
btnEliminaTodo();

// ejecuto la funcion que da funcionalidad al boton de finalizar compra del carrito
btnFinalizarCompra();

// ejecuto la funcion que renderiza el carrito con el array de productos obtenido del localStorage
renderCart();



