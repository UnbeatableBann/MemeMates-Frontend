const BASE_URL = "https://mememates.onrender.com";
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
