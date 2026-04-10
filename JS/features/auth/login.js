import { login } from "./authService.js";

const loginBtn = document.getElementById("loginBtn");
const showPassword = document.getElementById("showPassword");
const email = document.getElementById("email");
const password = document.getElementById("password");
const message = document.getElementById("message");

showPassword.addEventListener("click", (e) => {
    if (e.target.checked === true)
        document.getElementById("password").type = "text";
    else
        document.getElementById("password").type = "password";
});

loginBtn.addEventListener("click", async () => {
    try {
        loginBtn.className = "hidden";
        message.classList.remove("error-message");
        message.innerHTML = `please wait a minute to login <span class="spinner"></span>`;
        await login(email.value, password.value);
        window.location.href = "index.html";

    } catch (err) {
        loginBtn.classList.remove("hidden");
        message.innerHTML = `${err.code} <br> ${err.message}`;
        message.className = "error-message";
    }
});