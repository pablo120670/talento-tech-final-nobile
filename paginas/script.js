
const productos = [
    { nombre: 'Velas Aromáticas', descripcion: 'Velas hechas a mano...', imagen: '/imagenes/01_velas_aromaticas.jpg', alt: 'Velas Aromáticas', precio: 15 },
    { nombre: 'Kit Agua', descripcion: 'Un kit esencial...', imagen: '/imagenes/03_kit_hogar_1.jpg', alt: 'Kit Agua', precio: 25 },
    { nombre: 'Kit Hogar', descripcion: 'Todo lo necesario para el hogar...', imagen: '/imagenes/03_kit_hogar_4.png', alt: 'Kit Hogar', precio: 35 },
    { nombre: 'Toallas Flores', descripcion: 'Toallas suaves...', imagen: '/imagenes/04_toallas.png', alt: 'Toallas Flores', precio: 20 },
    { nombre: 'Toallones Colores', descripcion: 'Toallones grandes...', imagen: '/imagenes/06_aceite.jpg', alt: 'Toallones Colores', precio: 18 },
    { nombre: 'Velas Aromáticas', descripcion: 'Velas hechas a mano...', imagen: '/imagenes/01_velas_aromaticas.jpg', alt: 'Velas Aromáticas', precio: 15 },
    { nombre: 'Kit Agua', descripcion: 'Un kit esencial...', imagen: '/imagenes/03_kit_hogar_1.jpg', alt: 'Kit Agua', precio: 25 },
    { nombre: 'Kit Hogar', descripcion: 'Todo lo necesario para el hogar...', imagen: '/imagenes/03_kit_hogar_4.png', alt: 'Kit Hogar', precio: 35 },
    { nombre: 'Toallas Flores', descripcion: 'Toallas suaves...', imagen: '/imagenes/04_toallas.png', alt: 'Toallas Flores', precio: 20 },
    { nombre: 'Toallones Colores', descripcion: 'Toallones grandes...', imagen: '/imagenes/06_aceite.jpg', alt: 'Toallones Colores', precio: 18 }
];

const contenedorProductos = document.getElementById('productos-container');
const carritoList = document.getElementById('carrito-list');
const totalElement = document.getElementById('total');

let carrito = []; 
let total = 0;    


function agregarAlCarrito(nombreProducto, precioProducto) {
    carrito.push({ nombre: nombreProducto, precio: precioProducto });
    total += precioProducto;
    actualizarCarrito();
}


function actualizarCarrito() {
    carritoList.innerHTML = ''; 
    carrito.forEach(producto => {
        const li = document.createElement('li');
        li.textContent = producto.nombre + ' - $' + producto.precio;
        carritoList.appendChild(li);
    });
    totalElement.textContent = total; 
    
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


productos.forEach(producto => {
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
