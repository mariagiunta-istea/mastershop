// app.js — coordinador central de la aplicación

  import { fetchProducts, fetchCategories, fetchProductsByCategory } from './api.js';
  import { allProducts, renderProducts, initProducts } from './products.js';
  import { Modal } from './modal.js';
  import { renderCart, btnEliminaTodo, btnFinalizarCompra } from './cart.js';
  import { loadCategories, toggleCartActionButtons } from './filter.js';

  // inicialización
  initProducts();
  renderCart();
  btnEliminaTodo();
  btnFinalizarCompra();
  loadCategories();
  toggleCartActionButtons();

  // abre el modal al hacer click en una card de producto
  document.getElementById('products-container').addEventListener('click', (e) => {
      const tarjeta = e.target.closest('.product-card');
      if (!tarjeta) return;

      const idDelProducto = tarjeta.dataset.id;
      const productoEncontrado = allProducts.find(p => p.id === Number(idDelProducto));

      if (productoEncontrado) {
          Modal(productoEncontrado);
      }
  });