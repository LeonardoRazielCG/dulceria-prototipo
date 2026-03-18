// objeto de información
const informacionNegocio = {
    nombre: "Bodega Dulce Fiesta",
    ubicacion: "Calle Principal #123, San Luis Potosí, SLP",
    horarios: "Lunes a Sábado de 9:00 AM a 7:00 PM",
    envios: "Contamos con servicio a domicilio en toda la capital en compras mayores a $500.",
    mayoreo: "Precios de mayoreo a partir de 10 piezas del mismo producto o caja cerrada.",
    contacto: "puedes llamarnos al 444-XXX-XXXX"
};


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

    // Lógica inteligente por palabras clave
    if (msg.includes('horario') || msg.includes('abierto') || msg.includes('cierran')) {
        return `Nuestro horario es: ${informacionNegocio.horarios}. ¡Te esperamos!`;
    }

    if (msg.includes('donde') || msg.includes('ubicacion') || msg.includes('direccion')) {
        return `Estamos ubicados en: ${informacionNegocio.ubicacion}. Puedes ver el mapa al final de nuestra página.`;
    }

    if (msg.includes('mayoreo') || msg.includes('barato') || msg.includes('precio especial')) {
        return informacionNegocio.mayoreo;
    }

    if (msg.includes('envio') || msg.includes('domicilio') || msg.includes('llevan')) {
        return informacionNegocio.envios;
    }

    if (msg.includes('dulce') || msg.includes('producto') || msg.includes('que venden')) {
        return "Vendemos dulces nacionales e importados, globos de todo tipo y artículos temáticos. ¡Haz clic en las categorías de arriba para ver fotos!";
    }

    // Respuesta por defecto si no entiende
    return "Lo siento, no tengo esa información exacta, pero puedes preguntarle a una persona real haciendo clic en el botón de WhatsApp arriba. 🍬";
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