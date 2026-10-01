const chatForm = document.getElementById("chatForm");
const messageInput = document.getElementById("messageInput");

const messages = document.getElementById("messages");
const welcomeScreen = document.getElementById("welcomeScreen");

const newChatBtn = document.getElementById("newChatBtn");

const menuBtn = document.getElementById("menuBtn");
const sidebar = document.querySelector(".sidebar");


// =========================
// SEND MESSAGE
// =========================

chatForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const userMessage = messageInput.value.trim();

    if (userMessage === "") {
        return;
    }

    // Hide welcome screen
    welcomeScreen.style.display = "none";

    // Show messages
    messages.style.display = "block";

    // Add user's message
    addUserMessage(userMessage);

    // Clear input
    messageInput.value = "";

    // Show typing indicator
    const typingMessage = addTypingIndicator();

    // Generate BLAI response
    setTimeout(function () {

        typingMessage.remove();

        addAIMessage(generateResponse(userMessage));

    }, 1200);

});


// =========================
// USER MESSAGE
// =========================

function addUserMessage(message) {

    const messageElement = document.createElement("div");

    messageElement.className = "message user-message";

    messageElement.innerHTML = `
        <div class="message-content">
            ${escapeHTML(message)}
        </div>
    `;

    messages.appendChild(messageElement);

    scrollToBottom();
}


// =========================
// TYPING INDICATOR
// =========================

function addTypingIndicator() {

    const messageElement = document.createElement("div");

    messageElement.className = "message ai-message";

    messageElement.innerHTML = `
        <div class="ai-avatar">
            B
        </div>

        <div class="message-content">
            <span class="typing-text">
                BLAI is thinking...
            </span>
        </div>
    `;

    messages.appendChild(messageElement);

    scrollToBottom();

    return messageElement;
}


// =========================
// BLAI MESSAGE
// =========================

function addAIMessage(message) {

    const messageElement = document.createElement("div");

    messageElement.className = "message ai-message";

    messageElement.innerHTML = `
        <div class="ai-avatar">
            B
        </div>

        <div class="message-content">
            ${message}
        </div>
    `;

    messages.appendChild(messageElement);

    scrollToBottom();
}


// =========================
// BLAI RESPONSES
// =========================

function generateResponse(message) {

    const text = message.toLowerCase();


    if (
        text.includes("hello") ||
        text.includes("hi") ||
        text.includes("hey")
    ) {

        return "Hello! 👋🏾 I'm BLAI. How can I help you today?";

    }


    if (
        text.includes("who are you") ||
        text.includes("what are you")
    ) {

        return "I'm BLAI 🤖 — an AI assistant built with purpose and powered by intelligence.";

    }


    if (
        text.includes("how are you")
    ) {

        return "I'm doing great and ready to help! 🤖✨ What would you like us to work on?";

    }


    if (
        text.includes("thank")
    ) {

        return "You're welcome! 🤎 I'm always happy to help.";

    }


    if (
        text.includes("bye")
    ) {

        return "Goodbye! 👋🏾 Come back whenever you need me.";

    }


    return "I'm still learning how to answer that properly. 🧠✨ For now, try asking me something like “Who are you?” or “How are you?”";

}


// =========================
// NEW CHAT
// =========================

newChatBtn.addEventListener("click", function () {

    messages.innerHTML = "";

    messages.style.display = "none";

    welcomeScreen.style.display = "flex";

    messageInput.value = "";

    messageInput.focus();

});


// =========================
// MOBILE SIDEBAR
// =========================

menuBtn.addEventListener("click", function () {

    sidebar.classList.toggle("active");

});


// Close sidebar after clicking outside
document.addEventListener("click", function (event) {

    if (
        sidebar.classList.contains("active") &&
        !sidebar.contains(event.target) &&
        !menuBtn.contains(event.target)
    ) {

        sidebar.classList.remove("active");

    }

});


// =========================
// SCROLL TO BOTTOM
// =========================

function scrollToBottom() {

    messages.scrollTop = messages.scrollHeight;

    window.scrollTo({
        top: document.body.scrollHeight,
        behavior: "smooth"
    });

}


// =========================
// SECURITY
// =========================

function escapeHTML(text) {

    const div = document.createElement("div");

    div.textContent = text;

    return div.innerHTML;

}