// cart.js — maneja el carrito de compras y su renderizado

  // referencias del DOM
  const cartItemsList = document.getElementById('cart-items-list');
  const cartBadge = document.getElementById('cart-badge');
  const btnDeleteAll = document.getElementById('clear-cart-btn');
  const cartTotal = document.getElementById('cart-total');
  const btnCheckout = document.getElementById('checkout-btn');

  // renderiza el carrito con los datos del localStorage
  export function renderCart() {

      const carrito = JSON.parse(localStorage.getItem('carrito')) || [];

      let template = '';

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

                              <div class="d-flex align-items-center gap-2 mb-1">
                                  <span class="card-text">Cantidad:</span>
                                  <button class="btn btn-outline-secondary btn-sm"
  id="btnRestar-item-${item.id}">-</button>
                                  <span class="fw-bold">${item.cantidad}</span>
                                  <button class="btn btn-outline-secondary btn-sm"
  id="btnSumar-item-${item.id}">+</button>
                              </div>

                              <small class="text-body-secondary">Precio: $${item.price.toFixed(2)}</small>
                          </div>
                      </div>

                      <button class="btn btn-outline-danger btn-sm" id="delete-item-${item.id}">
                          <i class="bi bi-trash"></i>
                      </button>

                  </div>
              </div>
          `;
      });

      cartItemsList.innerHTML = template;

      addDeleteEvents(carrito);
      addBtnSumarItemEvents(carrito);
      addBtnRestarItemEvents(carrito);
      updateCartBadge();

      cartTotal.textContent = `$${calcularTotal(carrito).toFixed(2)}`;
  }

  // elimina del localStorage el producto identificado por id
  export function deleteCartItem(idProducto) {
      const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
      const carritoActualizado = carrito.filter((item) => item.id !== idProducto);
      localStorage.setItem('carrito', JSON.stringify(carritoActualizado));
  }

  // asigna botón de eliminación a cada producto del carrito
  function addDeleteEvents(carrito) {
      carrito.forEach((item) => {
          const deleteButton = document.getElementById(`delete-item-${item.id}`);
          deleteButton.addEventListener('click', () => {
              deleteCartItem(item.id);
              renderCart();
          });
      });
  }

  // actualiza el badge con la cantidad total de items
  function updateCartBadge() {
      const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
      let cantidadTotal = 0;
      carrito.forEach((item) => { cantidadTotal += item.cantidad; });
      cartBadge.textContent = cantidadTotal;
      if (cantidadTotal > 0) {
          cartBadge.classList.remove('d-none');
      } else {
          cartBadge.classList.add('d-none');
      }
  }

  // asigna botón de sumar unidad a cada producto del carrito
  function addBtnSumarItemEvents(carrito) {
      carrito.forEach((item) => {
          const btnSumarItem = document.getElementById(`btnSumar-item-${item.id}`);
          if (!btnSumarItem) return;
          btnSumarItem.addEventListener('click', () => {
              item.cantidad++;
              localStorage.setItem('carrito', JSON.stringify(carrito));
              renderCart();
          });
      });
  }

  // asigna botón de restar unidad a cada producto del carrito
  function addBtnRestarItemEvents(carrito) {
      carrito.forEach((item) => {
          const btnRestarItem = document.getElementById(`btnRestar-item-${item.id}`);
          if (!btnRestarItem) return;
          btnRestarItem.addEventListener('click', () => {
              if (item.cantidad > 1) {
                  item.cantidad--;
                  localStorage.setItem('carrito', JSON.stringify(carrito));
                  renderCart();
              }
          });
      });
  }

  // vacía el carrito con confirmación
  export function btnEliminaTodo() {
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
                  localStorage.setItem('carrito', JSON.stringify([]));
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

  // calcula el importe total de la compra
  export function calcularTotal(carrito) {
      return carrito.reduce((acc, item) => acc + item.price * item.cantidad, 0);
  }

  // finaliza la compra con confirmación
  export function btnFinalizarCompra() {
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
              text: `Usted está por adquirir ${cantidadTotal} producto(s) por un importe total de
  $${calcularTotal(carrito).toFixed(2)}.`,
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
