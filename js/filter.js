// filter.js - Persona 4
// Funcionalidades: buscador de productos, navegación por categorías
// y habilitar/deshabilitar las acciones del carrito cuando está vacío.

// ===== Referencias del DOM =====
const searchInput = document.getElementById('search-input');
const categoryNav = document.getElementById('category-nav');
const checkoutBtn = document.getElementById('checkout-btn');
const clearCartBtn = document.getElementById('clear-cart-btn');
const cartItemsListEl = document.getElementById('cart-items-list');
const sortSelect = document.getElementById('sort-select');

// ===== Estado de los filtros =====
let currentCategory = 'all';
let currentSearchTerm = '';
let currentSort = '';   // selector filtro ordenamiento por precio

// Filtra el array global "allProducts" (definido en products.js) según
// la categoría seleccionada y el texto buscado, y vuelve a renderizar
// el listado usando renderProducts() (también definida en products.js).
function applyFilters() {
  if (typeof allProducts === 'undefined' || allProducts.length === 0) return;

  // let filtered = allProducts;
  let filtered = [...allProducts];  // creo nuevo array copia para ordenar por precio sin alterar el orden del array original

  if (currentCategory !== 'all') {
    filtered = filtered.filter((p) => p.category === currentCategory);
  }

  /*if (currentSearchTerm.trim() !== '') {
    filtered = filtered.filter((p) =>
      p.title.toLowerCase().includes(currentSearchTerm)
    );
  }*/

  // Corrección: ahora usa startsWith(), devolviendo solo los productos
  // cuyo título COMIENZA con el texto buscado, dando una búsqueda más limpia.
  const searchTerm = currentSearchTerm.trim().toLowerCase();
  if (searchTerm !== '') {
    filtered = filtered.filter((p) =>
      p.title.toLowerCase().startsWith(searchTerm)
    );
  }


  // Filtro de ordenamiento por precio (ascendente y descendente)

  if (currentSort === 'price-asc') {
    filtered = filtered.sort((a, b) => a.price - b.price);
  }

  if (currentSort === 'price-desc') {
    filtered = filtered.sort((a, b) => b.price - a.price);
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

// se detecta el evento de cambio de seleccion en filtro ordenador por precio   

if (sortSelect) {
  sortSelect.addEventListener('change', (e) => {
    currentSort = e.target.value;
    applyFilters();
  });
}      



// ===== Navegación por categorías =====
async function loadCategories() {
  if (!categoryNav) return;

  try {
    const categories = await fetchCategories();

    categoryNav.appendChild(createCategoryButton('Todas', 'all'));

    categories.forEach((category) => {
      categoryNav.appendChild(
        createCategoryButton(formatCategoryLabel(category), category)
      );
    });
  } catch (error) {
    console.error('No se pudieron cargar las categorías:', error);
  }
}

function createCategoryButton(label, value) {
  const li = document.createElement('li');
  li.className = 'nav-item';

  const btn = document.createElement('button');
  btn.type = 'button';
  btn.className =
    'nav-link btn category-btn' + (value === currentCategory ? ' active' : '');
  btn.textContent = label;
  btn.dataset.category = value;

  btn.addEventListener('click', () => {
    currentCategory = value;

    currentSort = '';   // se resetea el filtro de ordenamiento por precio al seleccionar una categoria

  if (sortSelect) {
    sortSelect.value = '';
  }

    setActiveCategoryButton(value);
    applyFilters();
  });

  li.appendChild(btn);
  return li;
}

function setActiveCategoryButton(value) {
  categoryNav.querySelectorAll('.category-btn').forEach((btn) => {
    btn.classList.toggle('active', btn.dataset.category === value);
  });
}

function formatCategoryLabel(text) {
  return text
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}
// ===== Deshabilita las acciones del carrito cuando está vacío =====
function toggleCartActionButtons() {
  const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  const isEmpty = carrito.length === 0;

  [checkoutBtn, clearCartBtn].forEach((btn) => {
    if (!btn) return;
    btn.disabled = isEmpty;
    btn.classList.toggle('disabled', isEmpty);
  });
}

// cart.js vuelve a renderizar #cart-items-list cada vez que el carrito
// cambia (agregar, quitar, vaciar, finalizar compra). Observamos esos
// cambios en el DOM para saber cuándo el carrito queda vacío, sin
// necesidad de modificar el código de cart.js.
if (cartItemsListEl) {
  const cartObserver = new MutationObserver(toggleCartActionButtons);
  cartObserver.observe(cartItemsListEl, { childList: true });
}

// ===== Inicialización =====
loadCategories();
toggleCartActionButtons();