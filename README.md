# MasterShop — E-commerce

Trabajo final para la materia **Laboratorio de Aplicaciones Web Cliente**.

Aplicación de e-commerce que consume la [Fake Store API](https://fakestoreapi.com/) para listar productos, ver el detalle de cada uno en un modal, agregarlos a un carrito de compras persistente (localStorage), filtrarlos por nombre y navegar por categorías.

## Tecnologías utilizadas

- HTML5 (etiquetas semánticas)
- CSS3 + Bootstrap 5
- JavaScript (DOM, Fetch API, LocalStorage)
- SweetAlert2
- Fake Store API

## Integrantes y desarrollo

### [María Belen Giunta] — GitHub: [@mariagiunta-istea]

**Parte 1 — Base del proyecto + Listado de productos**

Se desarrolló la estructura base de la aplicación utilizando etiquetas semánticas de HTML5 (`header`, `nav`, `main`, `footer`) y Bootstrap 5 para lograr un diseño responsive. Se definió una paleta de colores y tipografía consistente mediante variables CSS, aplicada a la navbar, botones y tarjetas de producto. Se implementó la conexión a la Fake Store API y el renderizado dinámico de los productos en cards dentro del listado principal, incluyendo estados de carga y de error.

### [Federico Ezequiel Bilancieri] — GitHub: [@federicobilancieri-istea]

**Parte 2 — Modal de detalle de producto**

Se implementó el modal de detalle de producto, que se abre al hacer clic en cualquier card del listado y muestra título, imagen, descripción y precio. Dentro del modal se agregó un control de cantidad (+/-) antes de confirmar la compra. El modal puede cerrarse con la "X" o al agregar el producto al carrito, momento en el que se guarda en localStorage y se muestra una confirmación al usuario mediante SweetAlert2.

### [Gonzalo Carbó] — GitHub: [@gonzalo-carbo]

**Parte 3 — Carrito de compras (sidebar)**

Se desarrolló el carrito de compras, accesible desde el ícono ubicado en la navbar, que muestra un badge con la cantidad total de productos agregados. Al abrirse, despliega un sidebar (offcanvas) con el listado de productos seleccionados, cada uno con imagen, título, cantidad y precio total según la cantidad. Se implementó la eliminación individual de productos y la sincronización de cada acción con localStorage para mantener el estado del carrito entre sesiones.

### [Mauricio Daniel Vega] — GitHub: [@mauriciovega-istea]

**Parte 4 — Acciones globales del carrito + Filtros**

Se implementó el buscador de productos, que filtra el listado en tiempo real según el texto ingresado por el usuario. Se desarrolló la navegación dinámica por categorías, consumiendo el endpoint de categorías de la Fake Store API y permitiendo combinar el filtro de categoría con el de búsqueda. Por último, se agregó la lógica que deshabilita los botones "Finalizar compra" y "Eliminar todos" cuando el carrito se encuentra vacío, detectando los cambios en el carrito mediante un MutationObserver.

## Cómo ejecutar el proyecto

1. Clonar el repositorio: `git clone [URL-del-repositorio]`
2. Abrir `index.html` con un servidor local (por ejemplo, la extensión "Live Server" de VS Code) o directamente en el navegador.
3. No requiere instalación de dependencias ni build, todo el código es HTML/CSS/JS plano.

## Repositorio

https://github.com/mariagiunta-istea/mastershop.git