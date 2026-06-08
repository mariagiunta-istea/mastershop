const productsContainer = document.getElementById('products-container');

let allProducts = [];

function renderProducts(products) {
  productsContainer.innerHTML = '';

  if (products.length === 0) {
    productsContainer.innerHTML = `
      <div class="col-12 text-center text-muted py-5">
        <i class="bi bi-search fs-1"></i>
        <p class="mt-2">No se encontraron productos.</p>
      </div>`;
    return;
  }

  products.forEach(product => {
    const col = document.createElement('div');
    col.className = 'col-12 col-sm-6 col-md-4 col-lg-3';
    col.innerHTML = `
      <div class="card product-card" data-id="${product.id}">
        <img src="${product.image}" class="card-img-top" alt="${product.title}" />
        <div class="card-body d-flex flex-column gap-1">
          <span class="card-category">${product.category}</span>
          <h5 class="card-title">${product.title}</h5>
          <p class="card-price mt-auto">$${product.price.toFixed(2)}</p>
        </div>
      </div>`;
    productsContainer.appendChild(col);
  });
}

async function initProducts() {
  try {
    productsContainer.innerHTML = `
      <div class="col-12 text-center py-5">
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Cargando...</span>
        </div>
      </div>`;

    allProducts = await fetchProducts();
    renderProducts(allProducts);
  } catch (error) {
    productsContainer.innerHTML = `
      <div class="col-12 text-center text-danger py-5">
        <i class="bi bi-exclamation-triangle fs-1"></i>
        <p class="mt-2">No se pudieron cargar los productos. Intentá más tarde.</p>
      </div>`;
    console.error(error);
  }
}

document.addEventListener('DOMContentLoaded', initProducts);
