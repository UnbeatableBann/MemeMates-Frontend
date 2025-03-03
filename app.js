const BASE_URL = "https://mememates-backend.onrender.com";
const socket = io(BASE_URL);

document.getElementById("registerForm")?.addEventListener("submit", async (e) => {
    e.preventDefault();
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    let res = await fetch(BASE_URL + "/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
    });
    let data = await res.json();
    alert(data.message);
});

socket.on("receive_message", (data) => {
    let chatBox = document.getElementById("chatContainer");
    chatBox.innerHTML += `<p><b>${data.sender}:</b> ${data.text}</p>`;
});

function sendMessage() {
    let msg = document.getElementById("messageInput").value;
    socket.emit("send_message", { sender: "User", text: msg });
}

// Example: User Registration
async function registerUser(username, email, password) {
    const response = await fetch(`${BASE_URL}/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, email, password })
    });

    const data = await response.json();
    if (response.ok) {
        alert("Registration successful! Please log in.");
        window.location.href = "index.html";  // Redirect to login
    } else {
        alert("Error: " + data.error);
    }
}

// Example: User Login
async function loginUser(email, password) {
    const response = await fetch(`${BASE_URL}/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
    });

    const data = await response.json();
    if (response.ok) {
        localStorage.setItem("token", data.token);  // Save token
        alert("Login successful!");
        window.location.href = "memes.html";  // Redirect to memes page
    } else {
        alert("Login failed: " + data.error);
    }
}

// Example: Fetch & Display Memes
async function fetchMemes() {
    const response = await fetch(`${BASE_URL}/memes`);
    const memes = await response.json();

    const memeContainer = document.getElementById("meme-container");
    memeContainer.innerHTML = "";

    memes.forEach(meme => {
        const memeCard = `<div class="meme">
            <img src="${meme.image_url}" alt="Meme">
            <p>${meme.caption}</p>
        </div>`;
        memeContainer.innerHTML += memeCard;
    });
}

// Call function when page loads
document.addEventListener("DOMContentLoaded", fetchMemes);
