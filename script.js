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

chatForm.addEventListener("submit", async function (event) {

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

    // Disable input while BLAI responds
    messageInput.disabled = true;

    // Show typing indicator
    const typingMessage = addTypingIndicator();

    try {

        // Send message to BLAI's secure backend
        const response = await fetch(
            "/.netlify/functions/chat",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    message: userMessage
                })
            }
        );

        const data = await response.json();

        // Remove typing indicator
        typingMessage.remove();

        if (!response.ok) {
            throw new Error(
                data.error || "BLAI could not respond."
            );
        }

        // Show BLAI's real AI response
        addAIMessage(
            data.reply || "I couldn't generate a response."
        );

    } catch (error) {

        // Remove typing indicator
        typingMessage.remove();

        addAIMessage(
            "I'm sorry 😭 I couldn't connect to my AI system right now. Please try again."
        );

        console.error("BLAI Error:", error);

    } finally {

        // Re-enable input
        messageInput.disabled = false;

        messageInput.focus();

    }

});


// =========================
// USER MESSAGE
// =========================

function addUserMessage(message) {

    const messageElement = document.createElement("div");

    messageElement.className =
        "message user-message";

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

    const messageElement =
        document.createElement("div");

    messageElement.className =
        "message ai-message";

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

    const messageElement =
        document.createElement("div");

    messageElement.className =
        "message ai-message";

    messageElement.innerHTML = `
        <div class="ai-avatar">
            B
        </div>

        <div class="message-content">
            ${formatAIResponse(message)}
        </div>
    `;

    messages.appendChild(messageElement);

    scrollToBottom();
}


// =========================
// FORMAT AI RESPONSE
// =========================

function formatAIResponse(message) {

    return escapeHTML(message)
        .replace(/\n/g, "<br>");
}


// =========================
// NEW CHAT
// =========================

newChatBtn.addEventListener(
    "click",
    function () {

        messages.innerHTML = "";

        messages.style.display = "none";

        welcomeScreen.style.display = "flex";

        messageInput.value = "";

        messageInput.disabled = false;

        messageInput.focus();

    }
);


// =========================
// MOBILE SIDEBAR
// =========================

menuBtn.addEventListener(
    "click",
    function () {

        sidebar.classList.toggle("active");

    }
);


// Close sidebar after clicking outside

document.addEventListener(
    "click",
    function (event) {

        if (
            sidebar.classList.contains("active") &&
            !sidebar.contains(event.target) &&
            !menuBtn.contains(event.target)
        ) {

            sidebar.classList.remove("active");

        }

    }
);


// =========================
// SCROLL TO BOTTOM
// =========================

function scrollToBottom() {

    messages.scrollTop =
        messages.scrollHeight;

    window.scrollTo({
        top: document.body.scrollHeight,
        behavior: "smooth"
    });

}


// =========================
// SECURITY
// =========================

function escapeHTML(text) {

    const div =
        document.createElement("div");

    div.textContent = text;

    return div.innerHTML;

}
