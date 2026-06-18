// filter.js - Persona 4
// Funcionalidades: buscador de productos, navegación por categorías
// y habilitar/deshabilitar las acciones del carrito cuando está vacío.
 
// ===== Referencias del DOM =====
const searchInput = document.getElementById('search-input');
const categoryNav = document.getElementById('category-nav');
const checkoutBtn = document.getElementById('checkout-btn');
const clearCartBtn = document.getElementById('clear-cart-btn');
const cartItemsListEl = document.getElementById('cart-items-list');
 
// ===== Estado de los filtros =====
let currentCategory = 'all';
let currentSearchTerm = '';
 
// Filtra el array global "allProducts" (definido en products.js) según
// la categoría seleccionada y el texto buscado, y vuelve a renderizar
// el listado usando renderProducts() (también definida en products.js).
function applyFilters() {
  if (typeof allProducts === 'undefined' || allProducts.length === 0) return;
 
  let filtered = allProducts;
 
  if (currentCategory !== 'all') {
    filtered = filtered.filter((p) => p.category === currentCategory);
  }
 
  if (currentSearchTerm.trim() !== '') {
    filtered = filtered.filter((p) =>
      p.title.toLowerCase().includes(currentSearchTerm)
    );
  }
 
  renderProducts(filtered);
}
 
// ===== Buscador =====
if (searchInput) {
  searchInput.addEventListener('input', (e) => {
    currentSearchTerm = e.target.value.toLowerCase();
    applyFilters();
  });
}
