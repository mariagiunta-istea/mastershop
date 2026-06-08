// api.js
const API_URL = 'https://fakestoreapi.com';

async function fetchProducts() {
  const response = await fetch(`${API_URL}/products`);
  if (!response.ok) throw new Error('Error al obtener productos');
  return response.json();
}

async function fetchCategories() {
  const response = await fetch(`${API_URL}/products/categories`);
  if (!response.ok) throw new Error('Error al obtener categorías');
  return response.json();
}

async function fetchProductsByCategory(category) {
  const response = await fetch(`${API_URL}/products/category/${encodeURIComponent(category)}`);
  if (!response.ok) throw new Error('Error al obtener productos por categoría');
  return response.json();
}
