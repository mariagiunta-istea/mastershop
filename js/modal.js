

function Modal(prod) {
    let container = document.querySelector('#product-modal');

    let template = /*html*/
    `
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
            <div class="modal-header">
                <h1 class="modal-title fs-5" id="exampleModalLabel">${prod.title}</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body text-center">
                <img src="${prod.image}" class="img-fluid mb-3" alt="${prod.title}" style="max-height: 250px; object-fit: contain;">
                <p class="text-muted">${prod.description}</p>
            </div>
            
            <div class="col-12 d-flex justify-content-between align-items-center px-4 mb-3">
                <div class="d-flex align-items-center">
                    <button type="button" class="btn btn-outline-secondary btn-sm" id="btn-restar">-</button>
                    <input type="text" id="cantidad-producto" class="form-control form-control-sm text-center fw-bold fs-5 mx-2" value="1" readonly style="width: 40px; border: none; background: transparent;">
                    <button type="button" class="btn btn-outline-secondary btn-sm" id="btn-sumar">+</button>
                </div>
                
                <div class="fw-bold">
                    Precio: <span class="text-primary ms-1"> USD ${prod.price.toFixed(2)}</span>
                </div>
            </div>

            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary" id="add-to-cart-btn" data-cantidad="1">
                    Agregar al carrito
                </button>
            </div>
        </div>
    </div>
    `;

    container.innerHTML = template;



    const btnRestar = container.querySelector('#btn-restar');
    const btnSumar = container.querySelector('#btn-sumar');
    const txtCantidad = container.querySelector('#cantidad-producto');
    const btnAgregar = container.querySelector('#add-to-cart-btn');    

    let cantidad = 1;


    const bootstrapModal = new bootstrap.Modal(container);



    btnSumar.addEventListener('click', () => {
        cantidad++;
        txtCantidad.value = cantidad;
        btnAgregar.dataset.cantidad = cantidad;
    });

    btnRestar.addEventListener('click', () => {
        if (cantidad > 1) {
            cantidad--;
            txtCantidad.value = cantidad;
            btnAgregar.dataset.cantidad = cantidad;
        }
    });

    btnAgregar.addEventListener('click', () => {
        
        const productoParaCarrito = {
            id: prod.id,
            title: prod.title,
            price: prod.price,
            image: prod.image,
            cantidad: cantidad
        };

        
        let carritoActual = JSON.parse(localStorage.getItem('carrito')) || [];

        
        const existe = carritoActual.find(item => item.id === prod.id);

        if (existe) {
            existe.cantidad += cantidad;
        } else {
            carritoActual.push(productoParaCarrito);
        }

        
        localStorage.setItem('carrito', JSON.stringify(carritoActual));

        
        bootstrapModal.hide();

        
        Swal.fire({
            title: '¡Producto agregado!',
            text: `Se agregaron ${cantidad} unidad(es) de "${prod.title}" al carrito.`,
            icon: 'success',
            confirmButtonColor: '#0d6efd'
        });
    });


    
    
    bootstrapModal.show();
}


document.getElementById('products-container').addEventListener('click', (e) => {
    const tarjeta = e.target.closest('.product-card');
    if (!tarjeta) return;

    const idDelProducto = tarjeta.dataset.id;
    const productoEncontrado = allProducts.find(p => p.id === Number(idDelProducto));

    if (productoEncontrado) {
        Modal(productoEncontrado);
    }
});