// api.js — funciones para obtener datos de la Fake Store API

  const API_URL = 'https://fakestoreapi.com';

  // obtiene todos los productos
  export async function fetchProducts() {
    const response = await fetch(`${API_URL}/products`);
    if (!response.ok) throw new Error('Error al obtener productos');
    return response.json();
  }

  // obtiene todas las categorías
  export async function fetchCategories() {
    const response = await fetch(`${API_URL}/products/categories`);
    if (!response.ok) throw new Error('Error al obtener categorías');
    return response.json();
  }

  // obtiene los productos de una categoría específica
  export async function fetchProductsByCategory(category) {
    const response = await fetch(`${API_URL}/products/category/${encodeURIComponent(category)}`);
    if (!response.ok) throw new Error('Error al obtener productos por categoría');
    return response.json();
  }