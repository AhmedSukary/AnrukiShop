import { sendEmailVerificationCode, checkEmailVerificationCode, createAccount, updateProfile } from "../user/userService.js";

const form = document.getElementById("form");
const email = document.getElementById("email");
const sendCodeBtn = document.getElementById("sendCodeBtn");
const signMessage = document.getElementById("message");

sendCodeBtn.addEventListener("click", async () => {
    try {
        sendCodeBtn.className = "hidden";
        signMessage.classList.remove("error-message");
        signMessage.innerHTML = `please wait a minute to send the code <span class="spinner"></span>`;
        await sendEmailVerificationCode(email.value);
        sessionStorage.setItem("email", email.value);
        form.innerHTML = `
                <h2>Verification code</h2>
                <input class="code-input" type="text" id="code" placeholder="code"required>
                <button id="checkCodeBtn">Send</button>
                <p id="message"></p>
        `;

        const code = document.getElementById("code");
        const checkCodeBtn = document.getElementById("checkCodeBtn");
        const codeMessage = document.getElementById("message");

        checkCodeBtn.addEventListener("click", async () => {
            try {
                checkCodeBtn.className = "hidden";
                codeMessage.classList.remove("error-message");
                codeMessage.innerHTML = `please wait a minute to check the code matching <span class="spinner"></span>`;
                await checkEmailVerificationCode(code.value);
                form.innerHTML = `
                        <div class="form" id="form">
                            <h2>Create Account</h2>
                            <span>Full name</span>
                            <input type="text" id="name" placeholder="FullName">
                            <span>Phone number</span>
                            <input type="tel" id="phone" placeholder="PhoneNumber">
                            <span>Select your gender</span>
                            <div class="gender">
                                <input type="radio" id="male" name="gender" value="Male" checked>
                                <label for="male">Male</label>
                                <input type="radio" id="female" name="gender" value="Female">
                                <label for="female">Female</label>
                            </div>
                            <span>Birth Day</span>
                            <input type="date" id="dateOfBirth">
                            <span>Create password</span>
                            <input type="password" id="password" placeholder="Password">
                            <div class="show-password-box">
                                Show password
                                <input type="checkbox" id="showPassword">
                            </div>
                            <button id="createBtn">Create Account</button>
                            <p id="message"></p>
                        </div>
                `;
                const email = sessionStorage.getItem("email");
                const name = document.getElementById("name");
                const phone = document.getElementById("phone");
                const date = document.getElementById("dateOfBirth");
                const password = document.getElementById("password");
                const showPassword = document.getElementById("showPassword");
                const createBtn = document.getElementById("createBtn");
                const createMessage = document.getElementById("message");
                date.value = new Date().toLocaleDateString('en-CA');
                showPassword.addEventListener("click", (e) => {
                    if (e.target.checked === true)
                        password.type = "text";
                    else
                        password.type = "password";
                });
                function getSelectedGender() {
                    const selected = document.querySelector('input[name="gender"]:checked');
                    return selected.value;
                }

                createBtn.addEventListener("click", async () => {
                    try {
                        createBtn.className = "hidden";
                        createMessage.classList.remove("error-message");
                        createMessage.innerHTML = `<span class="spinner"></span>`;
                        await createAccount(name.value, email, password.value, phone.value, getSelectedGender(), date.value);
                        location.href = "login.html";
                    }
                    catch (err) {
                        createBtn.classList.remove("hidden");
                        createMessage.innerHTML = `${err.code} <br> ${err.message}`;
                        createMessage.className = "error-message";
                    }
                });
            }
            catch (err) {
                checkCodeBtn.classList.remove("hidden");
                codeMessage.innerHTML = `${err.code} <br> ${err.message}`;
                codeMessage.className = "error-message";
            }
        });
    }
    catch (err) {
        sendCodeBtn.classList.remove("hidden");
        signMessage.innerHTML = `${err.code} <br> ${err.message}`;
        signMessage.className = "error-message";
    }
});