const productos = [
    { nombre: 'Velas Aromáticas', descripcion: 'Velas hechas a mano...', imagen: '/imagenes/01_velas_aromaticas.jpg', alt: 'Velas Aromáticas', precio: 15 },
    { nombre: 'Kit Agua', descripcion: 'Un kit esencial...', imagen: '/imagenes/03_kit_hogar_1.jpg', alt: 'Kit Agua', precio: 25 },
    { nombre: 'Kit Hogar', descripcion: 'Todo lo necesario para el hogar...', imagen: '/imagenes/03_kit_hogar_4.png', alt: 'Kit Hogar', precio: 35 },
    { nombre: 'Toallas Flores', descripcion: 'Toallas suaves...', imagen: '/imagenes/04_toallas.png', alt: 'Toallas Flores', precio: 20 },
    { nombre: 'Toallones Colores', descripcion: 'Toallones grandes...', imagen: '/imagenes/06_aceite.jpg', alt: 'Toallones Colores', precio: 18 }
];


const productosDuplicados = productos.concat(productos);

const contenedorProductos = document.getElementById('productos-container');
const carritoList = document.getElementById('carrito-list');
const totalElement = document.getElementById('total');

// Cargar el carrito desde localStorage si existe
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
let total = carrito.reduce((sum, producto) => sum + producto.precio, 0); // Sumar los precios existentes

function actualizarCarrito() {
    carritoList.innerHTML = ''; 
    carrito.forEach((producto, index) => {
        const li = document.createElement('li');
        li.textContent = `${producto.nombre} - $${producto.precio}`;
// Botón de eliminar
const eliminarBtn = document.createElement('button');
eliminarBtn.textContent = 'Eliminar';
eliminarBtn.classList.add('btn'); // Clase global aplicada
eliminarBtn.onclick = () => eliminarDelCarrito(index);

// Botón de editar
const editarBtn = document.createElement('button');
editarBtn.textContent = 'Editar';
editarBtn.classList.add('btn'); // Clase global aplicada
editarBtn.onclick = () => editarCantidad(index);

li.appendChild(eliminarBtn);
li.appendChild(editarBtn);
carritoList.appendChild(li);


    });

    totalElement.textContent = `$${total}`; 

    // Guardar el carrito en localStorage
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

function agregarAlCarrito(nombreProducto, precioProducto) {
    carrito.push({ nombre: nombreProducto, precio: precioProducto });
    total += precioProducto;
    actualizarCarrito();
}

function eliminarDelCarrito(index) {
    total -= carrito[index].precio;
    carrito.splice(index, 1);
    actualizarCarrito();
}

function editarCantidad(index) {
    const nuevaCantidad = prompt("¿Cuántos productos quieres agregar?", 1);
    if (nuevaCantidad && !isNaN(nuevaCantidad)) {
        const cantidad = parseInt(nuevaCantidad);
        const precioTotal = carrito[index].precio * cantidad;
        carrito[index].precio = precioTotal;
        total = carrito.reduce((sum, producto) => sum + producto.precio, 0);
        actualizarCarrito();
    }
}

function mostrarDescripcionAmpliada(productoElement) {
    const descripcionExistente = productoElement.querySelector('.descripcion-ampliada');
    
    if (descripcionExistente) {
        descripcionExistente.remove();
    } else {
        const descripcionAmpliada = document.createElement('p');
        descripcionAmpliada.classList.add('descripcion-ampliada');
        descripcionAmpliada.textContent = `Esta es una descripción ampliada del producto. ¡Conoce todos los beneficios y características!`;
        productoElement.appendChild(descripcionAmpliada);
    }
}

// Mostrar productos duplicados en el contenedor
productosDuplicados.forEach(producto => {
    const productoElement = document.createElement('div');
    productoElement.classList.add('producto');

    productoElement.innerHTML = `
        <h4>${producto.nombre}</h4>
        <p>${producto.descripcion}</p>
        <img src="${producto.imagen}" alt="${producto.alt}">
        <p>$${producto.precio}</p>
        <button class="comprar-btn" onclick="agregarAlCarrito('${producto.nombre}', ${producto.precio})">Comprar</button>
        <button class="ver-descripcion-btn" onclick="mostrarDescripcionAmpliada(this.parentElement)">Ver Descripción Ampliada</button>
    `;

    contenedorProductos.appendChild(productoElement);
});

// Actualizar el carrito al cargar la página
actualizarCarrito();
