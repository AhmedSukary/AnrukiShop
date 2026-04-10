import { Header } from "../../components/header.js";
import { Footer } from "../../components/footer.js";
import { getUser, updateProfile, changePassword, getDefaultAddressByUserId, createAddress, updateAddress } from "./userService.js";
import { logout } from "../auth/authService.js";
import { getOrdersByUserId, cancelOrderById } from "../orders/orderService.js";

Header();
Footer();

const userId = localStorage.getItem("userId");
const user = await getUser(userId);

document.getElementById("name").innerText = user.fullName;
document.getElementById("email").innerText = user.email;
document.getElementById("logout").addEventListener("click", () => logout());

let options = document.querySelectorAll(".option");
const pendingOption = document.getElementById("pendingOption");
const paidOption = document.getElementById("paidOption");
const shopedOption = document.getElementById("shopedOption");
const cancelledOption = document.getElementById("cancelledOption");
const informationOption = document.getElementById("informationOption");
const addressOption = document.getElementById("addressOption");
const passwordChangeOption = document.getElementById("passwordChangeOption");
const helpOption = document.getElementById("helpOption");
const contentDataEle = document.getElementById("contentData");

await renderInfo();

pendingOption.addEventListener("click", (e) => {
    if (!e.target.classList.contains("clicked")) {
        options.forEach(option => option.className = "option")
        pendingOption.className += " clicked";
        renderPendingOrders();
    }
});

paidOption.addEventListener("click", (e) => {
    if (!e.target.classList.contains("clicked")) {
        options.forEach(option => option.className = "option")
        paidOption.className += " clicked";
        renderPaidOrders();
    }
});

shopedOption.addEventListener("click", (e) => {
    if (!e.target.classList.contains("clicked")) {
        options.forEach(option => option.className = "option")
        shopedOption.className += " clicked";
        renderShopedOrders();
    }
});

cancelledOption.addEventListener("click", (e) => {
    if (!e.target.classList.contains("clicked")) {
        options.forEach(option => option.className = "option")
        cancelledOption.className += " clicked";
        renderCancelledOrders();
    }
});

informationOption.addEventListener("click", (e) => {
    if (!e.target.classList.contains("clicked")) {
        options.forEach(option => option.className = "option")
        informationOption.className += " clicked";
        renderInfo();
    }
});

addressOption.addEventListener("click", (e) => {
    if (!e.target.classList.contains("clicked")) {
        options.forEach(option => option.className = "option")
        addressOption.className += " clicked";
        renderAddress();
    }
});

passwordChangeOption.addEventListener("click", (e) => {
    if (!e.target.classList.contains("clicked")) {
        options.forEach(option => option.className = "option")
        passwordChangeOption.className += " clicked";
        renderPasswordChange();
    }
});

helpOption.addEventListener("click", (e) => {
    if (!e.target.classList.contains("clicked")) {
        options.forEach(option => option.className = "option")
        helpOption.className += " clicked";
        renderHelp();
    }
});

async function renderPendingOrders() {
    let orders = await getOrdersByUserId(user.id);
    let content = ``;
    content = `<div class="orders">
        <div class="title">Pending orders <i class="fa-solid fa-dolly"></i></div>`;
    for (const order of orders) {
        if (order.status === 1) {
            content += `          
                <div class="order" id="${order.id}">
                <div class="title">
                    <span>OrderID: ${order.id}</span>
                    <span>Date: ${new Date(order.createdAt).toLocaleDateString('en-CA')}</span>         
                </div>
                    <p>Total Amount: ${order.total}$ <a id="cancel-${order.id}"><i class="fa-regular fa-trash-can"></i></a></p>   
                    <button id="checkout-btn-${order.id}">Progress to pay</button>
                </div>
            `;
        }
    }
    content += `</div>`;
    contentDataEle.innerHTML = content;

    for (const order of orders) {
        if (order.status === 1) {
            document.getElementById(`cancel-${order.id}`).addEventListener("click", async () => {
                await cancelOrderById(order.id);
                renderPendingOrders();
            });

            document.getElementById(`checkout-btn-${order.id}`).addEventListener("click", () => {
                window.location.href = `checkout.html?orderId=${order.id}`;
            });
        }
    }
}

async function renderPaidOrders() {
    let orders = await getOrdersByUserId(user.id);
    let content = ``;
    content = `<div class="orders">
        <div class="title">Paid orders <i class="fa-solid fa-truck"></i></div>`;    
    for (const order of orders) {
        if (order.status === 2) {
            content += `          
                <div class="order" id="${order.id}">
                <div class="title">
                    <span>OrderID: ${order.id}</span>
                    <span>Date: ${new Date(order.createdAt).toLocaleDateString('en-CA')}</span>         
                </div>
                    <p>Total Amount: ${order.total}$ <a id="cancel-${order.id}" href=""><i class="fa-regular fa-trash-can"></i></a></p> 
                </div>
            `;
        }
    }
    content += `</div>`;
    contentDataEle.innerHTML = content;

    for (const order of orders) {
        if (order.status === 2) {
            document.getElementById(`cancel-${order.id}`).addEventListener("click", async () => {
                await cancelOrderById(order.id);
                renderPaidOrders();
            });
        }
    }
}

async function renderShopedOrders() {
    let orders = await getOrdersByUserId(user.id);
    let content = ``;
    content = `<div class="orders">
        <div class="title">Shoped orders <i class="fa-solid fa-box-open"></i></div>`;
    for (const order of orders) {
        if (order.status === 3) {
            content += `          
                <div class="order" id="${order.id}">
                <div class="title">
                    <span>OrderID: ${order.id}</span>
                    <span>Date: ${new Date(order.createdAt).toLocaleDateString('en-CA')}</span>         
                </div>
                    <p>Total Amount: ${order.total}$</p> 
                </div>
            `;
        }
    }
    content += `</div>`;
    contentDataEle.innerHTML = content;
}

async function renderCancelledOrders() {
    let orders = await getOrdersByUserId(user.id);
    let content = ``;
    content = `<div class="orders">
        <div class="title">Cancelled orders <i class="fa-solid fa-ban"></i></div>`;
    for (const order of orders) {
        if (order.status === 4) {
            content += `          
                <div class="order" id="${order.id}">
                <div class="title">
                    <span>OrderID: ${order.id}</span>
                    <span>Date: ${new Date(order.createdAt).toLocaleDateString('en-CA')}</span>         
                </div>
                    <p>Total Amount: ${order.total}$</p> 
                </div>
            `;
        }
    }
    content += `</div>`;
    contentDataEle.innerHTML = content;
}

async function renderInfo() {
    contentDataEle.innerHTML = `
            <div class="title">My Information <i class="fa-solid fa-user"></i></div>
            <div class="user-info">
                <div class="name">
                    <span class="label">Full Name</span>
                    <input type="text" id="inputName" placeholder="Full name" value="${user.fullName}" required>
                </div>
                <div class="birth">
                    <span>Birth Day</span>
                    <input type="date" id="inputDateOfBirth" value="${new Date(user.dateOfBirth).toLocaleDateString('en-CA')}" required>
                </div>
                <div class="phone">
                    <span class="label">Phone</span>
                    <input type="tel" id="inputPhone" placeholder="Phone Number" value="${user.phoneNumber}" required>
                </div>
                <div class="save">
                    <button id="saveBtn">Save</button>
                </div>
                <p id="message"></p>
            </div>
    `;

    const inputName = document.getElementById("inputName");
    const inputDateOfBirth = document.getElementById("inputDateOfBirth");
    const inputPhone = document.getElementById("inputPhone");
    const saveBtn = document.getElementById("saveBtn");
    const message = document.getElementById("message");

    saveBtn.addEventListener("click", async () => {
        try {
            saveBtn.className = "hidden";
            message.innerHTML = `please wait a minute to save <span class="spinner"></span>`;
            const result = await updateProfile(userId, inputName.value, inputPhone.value, user.gender, inputDateOfBirth.value);
            message.classList.remove("error-message");
            message.innerHTML = `${result.success}`;
        } catch (err) {
            saveBtn.classList.remove("hidden");
            message.innerHTML = `${err.code} <br> ${err.message}`;
            message.className = "error-message";
        }
    });
}

async function renderAddress() {
    contentDataEle.innerHTML = `
            <div class="title">My Address <i class="fa-solid fa-map-location-dot"></i></div>
            <div class="user-address">
                <div class="country">
                    <span class="label">Country</span>
                    <input type="text" id="country" placeholder="Country" required>
                </div>                    
                <div class="city">
                    <span class="label">City</span>
                    <input type="text" id="city" placeholder="City" required>
                </div>
                <div class="region">
                    <span class="label">Region</span>
                    <input type="text" id="region" placeholder="Region" required>
                </div>
                <div class="address-line">
                    <span class="label">Address Line</span>
                    <input type="text" id="addressLine" placeholder="Address Line" required>
                </div>
                <div class="save">
                    <button id="saveBtn">Save</button>
                </div>
                <p id="message"></p>
            </div>
    `;

    const country = document.getElementById("country");
    const city = document.getElementById("city");
    const region = document.getElementById("region");
    const addressLine = document.getElementById("addressLine");
    const saveBtn = document.getElementById("saveBtn");
    const message = document.getElementById("message");
    let address;
    let hasAdderss = false;

    try {
        address = await getDefaultAddressByUserId(userId)
        country.value = address.country;
        city.value = address.city;
        region.value = address.region;
        addressLine.value = address.addressLine;
        hasAdderss = true;
    } catch { }

    saveBtn.addEventListener("click", async () => {
        if (hasAdderss) {
            try {
                saveBtn.className = "hidden";
                message.innerHTML = `please wait a minute to save <span class="spinner"></span>`;
                const result = await updateAddress(address.id, country.value, city.value, region.value, addressLine.value);
                message.classList.remove("error-message");
                message.innerHTML = `${result.success}`;
            } catch (err) {
                saveBtn.classList.remove("hidden");
                message.innerHTML = `${err.code} <br> ${err.message}`;
                message.className = "error-message";
            }
        } else {
            try {
                saveBtn.className = "hidden";
                message.innerHTML = `please wait a minute to save <span class="spinner"></span>`;
                const result = await createAddress(userId, country.value, city.value, region.value, addressLine.value, true);
                message.classList.remove("error-message");
                message.innerHTML = `${result.success}`;
            } catch (err) {
                saveBtn.classList.remove("hidden");
                message.innerHTML = `${err.code} <br> ${err.message}`;
                message.className = "error-message";
            }
        }
    });
}

async function renderPasswordChange() {
    contentDataEle.innerHTML = `
            <div class="title">Password Chenge <i class="fa-solid fa-lock"></i></div>
            <div class="user-change-password">
                <div class="password">
                    <span>Create new password</span>
                    <input type="password" id="password" placeholder="Password">
                </div>                    
                <div class="show-password-box">
                    Show password
                    <input type="checkbox" id="showPassword">
                </div>
                <div class="save">
                    <button id="saveBtn">Save</button>
                </div>
                <p id="message"></p>
            </div>
    `;

    const password = document.getElementById("password");
    const showPassword = document.getElementById("showPassword");
    const saveBtn = document.getElementById("saveBtn");
    const message = document.getElementById("message");

    showPassword.addEventListener("click", (e) => {
        if (e.target.checked === true)
            password.type = "text";
        else
            password.type = "password";
    });
    
    saveBtn.addEventListener("click", async () => {
        try {
            saveBtn.className = "hidden";
            message.innerHTML = `please wait a minute to save <span class="spinner"></span>`;
            const result = await changePassword(password.value);
            message.classList.remove("error-message");
            message.innerHTML = `${result.success}`;
        } catch (err) {
            saveBtn.classList.remove("hidden");
            message.innerHTML = `${err.code} <br> ${err.message}`;
            message.className = "error-message";
        }
    });
}

async function renderHelp() {
    contentDataEle.innerHTML = `
            <div class="title">Help <i class="fa-regular fa-circle-question"></i></div>
    `;
}