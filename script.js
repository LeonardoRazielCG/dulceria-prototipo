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
const productos = [
    { nombre: "Paleta Payaso", precio: "$15", categoria: "dulces", img: "img/paletapayaso.png" },
    { nombre: "Bolsa Mix Dulces", precio: "$120", categoria: "dulces", img: "img/bolsamix.jpg" },
    { nombre: "Globo Metálico #1", precio: "$45", categoria: "globos", img: "img/globometalico.jpg" },
    { nombre: "Arreglo de Cumpleaños", precio: "$250", categoria: "globos", img: "img/arreglo.jpg" },
    { nombre: "Platos Temáticos Disney", precio: "$85", categoria: "tematicas", img: "img/platos.jpg" }
];

// 2. Función para mostrar productos
function mostrarProductos(categoriaSeleccionada) {
    const contenedor = document.getElementById('grid-productos');
    const titulo = document.getElementById('titulo-categoria');
    const seccion = document.getElementById('vista-productos');

    // Limpiar el contenedor antes de mostrar nuevos
    contenedor.innerHTML = "";
    
    // Mostrar la sección (por si estaba oculta)
    seccion.classList.remove('productos-ocultos');
    titulo.innerText = "Productos de: " + categoriaSeleccionada.toUpperCase();

    // Filtrar y crear las tarjetas de producto
    const filtrados = productos.filter(p => p.categoria === categoriaSeleccionada);

    filtrados.forEach(p => {
        const card = `
            <div class="producto-item">
                <img src="${p.img}" alt="${p.nombre}">
                <h4>${p.nombre}</h4>
                <p>${p.precio}</p>
                <button class="btn-pedir">Pedir por WhatsApp</button>
            </div>
        `;
        contenedor.innerHTML += card;
    });

    // Hacer scroll automático hacia los productos
    seccion.scrollIntoView({ behavior: 'smooth' });
}