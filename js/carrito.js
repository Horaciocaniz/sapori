document.addEventListener('DOMContentLoaded', function() {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const productos = document.querySelectorAll('.producto');
    const listaCarrito = document.getElementById('lista-carrito');
    const limpiarCarritoButton = document.getElementById('limpiar-carrito');
    const comprarButton = document.getElementById('comprar');
    const footer = document.querySelector('footer');
    const main = document.querySelector('main');

    const carritoTitle = document.getElementById('carrito-title');
    const contactoTitle = document.getElementById('contacto-title');

    if (carritoTitle) {
        carritoTitle.addEventListener('click', function(event) {
            event.preventDefault(); // Evitar el comportamiento predeterminado del enlace
            const carritoSection = document.getElementById('carrito');
            if (carritoSection) {
                carritoSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    if (contactoTitle) {
        contactoTitle.addEventListener('click', function(event) {
            event.preventDefault(); // Evitar el comportamiento predeterminado del enlace
            const contactoSection = document.getElementById('contacto');
            if (contactoSection) {
                contactoSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
    

    function mostrarFooter() {
        const alturaScroll = window.innerHeight + window.scrollY;
        const alturaPagina = document.body.offsetHeight;

        if (alturaScroll >= alturaPagina) {
            footer.classList.remove('footer-hidden');
        } else {
            footer.classList.add('footer-hidden');
        }
    }

    productos.forEach(producto => {
        producto.querySelector('.agregar-carrito').addEventListener('click', () => {
            const nombre = producto.querySelector('h3').textContent;
            const precio = producto.querySelector('p').textContent;
            agregarAlCarrito(nombre, precio);
        });
    });

    function agregarAlCarrito(nombre, precio) {
        const item = {
            nombre,
            precio
        };
        carrito.push(item);
        localStorage.setItem('carrito', JSON.stringify(carrito));
        actualizarCarrito();
        alert('Producto agregado');
    }

    function quitarDelCarrito(index) {
        carrito.splice(index, 1);
        localStorage.setItem('carrito', JSON.stringify(carrito));
        actualizarCarrito();
    }


    function actualizarCarrito() {
        listaCarrito.innerHTML = '';
        carrito.forEach((item, index) => {
            const li = document.createElement('li');
            li.innerHTML = `${item.nombre} - ${item.precio} <button class="quitar-item" data-index="${index}">X</button>`;
            listaCarrito.appendChild(li);
        });

        document.querySelectorAll('.quitar-item').forEach(button => {
            button.addEventListener('click', function() {
                const index = parseInt(this.getAttribute('data-index'));
                quitarDelCarrito(index);
            });
        });
    }

    limpiarCarritoButton.addEventListener('click', function() {
        carrito.length = 0;
        localStorage.setItem('carrito', JSON.stringify(carrito));
        actualizarCarrito();
    });

    document.getElementById('limpiar-carrito').addEventListener('click', () => {
        localStorage.removeItem('carrito'); // Limpiar el carrito del localStorage
        carrito.length = 0; // Limpiar el carrito local
        actualizarCarrito();
    });


    document.getElementById('comprar').addEventListener('click', () => {
        if (carrito.length === 0) {
            alert('El carrito está vacío');
        } else {
            procesarPago();
        }
    });

    function procesarPago() {

        let nombresProductos = carrito.map(item => `\n${item.nombre}-${item.precio}`);
       
        // Aquí iría la lógica para integrar el pago con tarjeta de crédito

        // Objeto que contiene los datos del mensaje
     const mensajeWhatsApp = {
        numero: "50254590273", // Número de teléfono con código de país
        texto: "Hola quiero hacer un pedido, mi pedido es: " +nombresProductos};

   // Función para generar el enlace de WhatsApp
   function generarEnlaceWhatsApp(mensaje) {
    const baseUrl = "https://wa.me/";
    const numero = mensaje.numero;
    const texto = encodeURIComponent(mensaje.texto);
    return `${baseUrl}${numero}?text=${texto}`;
  }


  const enlace = generarEnlaceWhatsApp(mensajeWhatsApp);
    window.open(enlace, "_blank"); // Abre el enlace en una nueva pestaña




    }


    function mostrarSeccion(seccionId) {
        const secciones = document.querySelectorAll('main > section');
        secciones.forEach(seccion => {
            seccion.classList.remove('active');
        });
        document.getElementById(seccionId).classList.add('active');
    }

    // Mostrar la sección de inicio por defecto
    mostrarSeccion('inicio');

    // Actualizar carrito al cargar la página
    actualizarCarrito();
});


const form = document.querySelector('form');


// Agregamos un evento al formulario para que se ejecute cuando se envíe
form.addEventListener('submit', (event) => {
    // Prevenimos que el formulario se envíe de manera predeterminada
    event.preventDefault();

     // Objeto que contiene los datos del mensaje
     const mensajeWhatsApp = {
        numero: "50254590273", // Número de teléfono con código de país
        texto: "Hola, Quiero hacer mi pedido es: " +carrito};

   // Función para generar el enlace de WhatsApp
   function generarEnlaceWhatsApp(mensaje) {
    const baseUrl = "https://wa.me/";
    const numero = mensaje.numero;
    const texto = encodeURIComponent(mensaje.texto);
    return `${baseUrl}${numero}?text=${texto}`;
  }


  if(carrito.length === 0){
    alert("Tu carrito esta vacio");
    return;
}else{
    //alert(username+" Consulta disponibilidad para la fecha: " + fecha+ ", "  +" En horario de: "+ hora);
    const enlace = generarEnlaceWhatsApp(mensajeWhatsApp);
    window.open(enlace, "_blank"); // Abre el enlace en una nueva pestaña
}

// Enviamos el formulario
form.submit();

});
