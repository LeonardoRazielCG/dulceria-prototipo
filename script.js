// objeto de información
const informacionNegocio = {
    nombre: "Bodega Dulce Fiesta",
    ubicacion: "Calle Principal #123, San Luis Potosí, SLP",
    horarios: "Lunes a Sábado de 9:00 AM a 7:00 PM",
    envios: "Contamos con servicio a domicilio en toda la capital en compras mayores a $500.",
    mayoreo: "Precios de mayoreo a partir de 10 piezas del mismo producto o caja cerrada.",
    contacto: "puedes llamarnos al 444-XXX-XXXX"
};

function enviarSugerencia(texto) {
    document.getElementById('user-input').value = texto;
    sendMessage();
    // Opcional: ocultar sugerencias después del primer clic
    document.getElementById('chat-suggestions').style.display = 'none';
}

// Función para abrir/cerrar el chat
function toggleChat() {
    const chatWindow = document.getElementById('chat-window');
    chatWindow.classList.toggle('chat-hidden');
}

// Función para enviar mensaje
function sendMessage() {
    const input = document.getElementById('user-input');
    const message = input.value.trim();
    if (message === "") return;

    // 1. Mostrar mensaje del usuario
    addMessage(message, 'user-msg');
    input.value = '';

    // 2. Simular respuesta del Bot (con retraso)
    setTimeout(() => {
        const response = getBotResponse(message);
        addMessage(response, 'bot-msg');
    }, 1000);
}

// Escuchar la tecla "Enter"
document.getElementById('user-input').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

// Función auxiliar para agregar burbujas de chat
function addMessage(text, type) {
    const chatBody = document.getElementById('chat-body');
    const messageDiv = document.createElement('p');
    messageDiv.className = type;
    messageDiv.textContent = text;
    chatBody.appendChild(messageDiv);
    chatBody.scrollTop = chatBody.scrollHeight; // Scroll automático hacia abajo
}

// --- "CEREBRO" SIMULADO DEL ASISTENTE ---
function getBotResponse(userMessage) {
    const msg = userMessage.toLowerCase();

    if (msg.includes('mayoreo')) {
        return "¡Claro! Manejamos los mejores precios de SLP para tu negocio o fiesta grande. 📦 ¿Buscas algún dulce o marca en especial para cotizarte?";
    }
    if (msg.includes('envio') || msg.includes('domicilio')) {
        return "¡Sí! Llevamos la fiesta hasta tu puerta en todo San Luis Potosí. 🚚 En compras mayores a $500 el envío es gratis. ¿A qué colonia sería?";
    }
    if (msg.includes('recomiendan') || msg.includes('bolo') || msg.includes('fiesta')) {
        return "Para bolos, lo más vendido es nuestro 'Mix de Dulces Selectos' y las bolsas de paletas. 🍭 ¡Son un éxito garantizado con los niños! ¿Quieres que te muestre los precios?";
    }

    return "¡Qué buena pregunta! No tengo el dato exacto aquí, pero si nos mandas un WhatsApp ahora mismo, te podemos dar un descuento especial por ser tu primera compra. 😉 ¿Te gustaría?";
}

// 1. Datos de ejemplo (Esto simula tu futura base de datos)
async function mostrarProductos(categoriaSeleccionada) {
    const contenedor = document.getElementById('grid-productos');
    contenedor.innerHTML = "<p>Cargando los mejores dulces...</p>";

    try {
        // Llamamos a nuestra función serverless
        const respuesta = await fetch('/api/productos');
        const productosBD = await respuesta.json();

        const filtrados = productosBD.filter(p => p.categoria === categoriaSeleccionada);
        
        contenedor.innerHTML = ""; 

        filtrados.forEach(p => {
            contenedor.innerHTML += `
                <div class="producto-item">
                    <img src="${p.img}" alt="${p.nombre}">
                    <h4>${p.nombre}</h4>
                    <p>Precio: $${p.precio}</p>
                    <button class="btn-pedir">Pedir por WhatsApp</button>
                </div>
            `;
        });
    } catch (error) {
        contenedor.innerHTML = "<p>Hubo un error al cargar los productos. Intenta de nuevo.</p>";
    }
}

// 2. Función para mostrar productos
// Añadimos "async" al inicio para poder usar "await"
async function mostrarProductos(categoriaSeleccionada) {
    const contenedor = document.getElementById('grid-productos');
    const titulo = document.getElementById('titulo-categoria');
    const seccion = document.getElementById('vista-productos');

    // 1. Mensaje visual de carga
    contenedor.innerHTML = "<p>Consultando inventario real...</p>";
    
    seccion.classList.remove('productos-ocultos');
    titulo.innerText = "Productos de: " + categoriaSeleccionada.toUpperCase();

    try {
        // 2. LLAMADA A LA API (Trae los datos de MongoDB)
        const respuesta = await fetch('/api/productos');
        const productosDesdeBD = await respuesta.json();

        // 3. LIMPIAR Y FILTRAR
        contenedor.innerHTML = ""; 
        const filtrados = productosDesdeBD.filter(p => p.categoria === categoriaSeleccionada);

        if (filtrados.length === 0) {
            contenedor.innerHTML = "<p>Próximamente más productos en esta categoría.</p>";
        }

        // 4. RENDERIZAR (Dibujar las tarjetas)
        filtrados.forEach(p => {
            const card = `
                <div class="producto-item">
                    <img src="${p.img}" alt="${p.nombre}">
                    <h4>${p.nombre}</h4>
                    <p>$${p.precio}</p> 
                    <button class="btn-pedir">Pedir por WhatsApp</button>
                </div>
            `;
            contenedor.innerHTML += card;
        });

    } catch (error) {
        console.error("Error al cargar:", error);
        contenedor.innerHTML = "<p>Error de conexión. Intenta de nuevo más tarde.</p>";
    }

    seccion.scrollIntoView({ behavior: 'smooth' });
}