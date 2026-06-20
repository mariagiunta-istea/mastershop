// filter.js — buscador, navegación por categorías y ordenamiento por precio

  import { fetchCategories } from './api.js';
  import { allProducts, renderProducts } from './products.js';

  // referencias del DOM
  const searchInput = document.getElementById('search-input');
  const categoryNav = document.getElementById('category-nav');
  const checkoutBtn = document.getElementById('checkout-btn');
  const clearCartBtn = document.getElementById('clear-cart-btn');
  const cartItemsListEl = document.getElementById('cart-items-list');
  const sortSelect = document.getElementById('sort-select');

  // estado de los filtros
  let currentCategory = 'all';
  let currentSearchTerm = '';
  let currentSort = '';

  // filtra y re-renderiza el listado según categoría, búsqueda y orden
  export function applyFilters() {
    if (typeof allProducts === 'undefined' || allProducts.length === 0) return;

    let filtered = [...allProducts];

    if (currentCategory !== 'all') {
      filtered = filtered.filter((p) => p.category === currentCategory);
    }

    const searchTerm = currentSearchTerm.trim().toLowerCase();
    if (searchTerm !== '') {
      filtered = filtered.filter((p) =>
        p.title.toLowerCase().startsWith(searchTerm)
      );
    }

    if (currentSort === 'price-asc') {
      filtered = filtered.sort((a, b) => a.price - b.price);
    }

    if (currentSort === 'price-desc') {
      filtered = filtered.sort((a, b) => b.price - a.price);
    }

    renderProducts(filtered);
  }

  // escucha el buscador
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      currentSearchTerm = e.target.value.toLowerCase();
      applyFilters();
    });
  }

  // escucha el selector de ordenamiento por precio
  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      currentSort = e.target.value;
      applyFilters();
    });
  }

  // carga las categorías desde la API y genera los botones de navegación
  export async function loadCategories() {
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
    btn.className = 'nav-link btn category-btn' + (value === currentCategory ? ' active' : '');
    btn.textContent = label;
    btn.dataset.category = value;

    btn.addEventListener('click', () => {
      currentCategory = value;
      currentSort = '';
      if (sortSelect) { sortSelect.value = ''; }
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
  // habilita o deshabilita los botones del carrito según si está vacío
  export function toggleCartActionButtons() {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const isEmpty = carrito.length === 0;

    [checkoutBtn, clearCartBtn].forEach((btn) => {
      if (!btn) return;
      btn.disabled = isEmpty;
      btn.classList.toggle('disabled', isEmpty);
    });
  }

  // observa cambios en el carrito para actualizar los botones
  if (cartItemsListEl) {
    const cartObserver = new MutationObserver(toggleCartActionButtons);
    cartObserver.observe(cartItemsListEl, { childList: true });
  }