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

    if (msg.includes('hola') || msg.includes('buen')) {
        return "¡Hola! Bienvenido a Bodega Dulce Fiesta. ¿En qué te puedo ayudar hoy con tu evento?";
    }
    if (msg.includes('globo')) {
        return "¡Tenemos muchísimos! Globos de látex de todos colores, metálicos de personajes y hacemos arreglos. ¿Buscas algo específico?";
    }
    if (msg.includes('dulce') || msg.includes('bolo')) {
        return "Contamos con pasillos llenos de dulces nacionales e importados. Manejamos precios especiales si compras por caja para bolos.";
    }
    if (msg.includes('precio') || msg.includes('cotiza')) {
        return "Para darte precios exactos de mayoreo, por favor presiona el botón de WhatsApp arriba y envíanos tu lista. ¡Te atendemos de inmediato!";
    }
    if (msg.includes('donde') || msg.includes('ubicacion')) {
        return "Nuestra bodega principal está en la calle [Dirección Inventada], Colonia Centro. ¡Ven a conocernos!";
    }

    // Respuesta por defecto
    return "Mmm, no entendí muy bien. Pero si nos contactas por WhatsApp, un agente humano te ayudará con gusto. 😊";
}