import { Header } from "../../components/header.js";
import { Footer } from "../../components/footer.js";
import { getUser, getDefaultAddressByUserId, createAddress } from "../user/userService.js";
import { getOrderById } from "../orders/orderService.js";
import { getProductSummaryById } from "../products/productService.js";

Header();
Footer();

const params = new URLSearchParams(window.location.search);
const orderId = params.get("orderId");
const userId = localStorage.getItem("userId");
const name = document.getElementById("name");
const email = document.getElementById("email");
const phone = document.getElementById("phone");
const useDefaultAddress = document.getElementById("useDefaultAddress");
const country = document.getElementById("country");
const city = document.getElementById("city");
const region = document.getElementById("region");
const addressLine = document.getElementById("addressLine");
const payBtn = document.getElementById("payBtn");
const total = document.getElementById("total");
const itemsEle = document.getElementById("items");
const message = document.getElementById("message");
let hasAddress = false;

await renderContent();

async function renderContent() {
    const user = await getUser(userId);
    const order = await getOrderById(orderId);
    name.value = user.fullName;
    email.value = user.email;
    phone.value = user.phoneNumber;
    total.innerHTML = `Total ${order.total}$`;
    await renderItems(order.items);
}

async function renderItems(items) {
    for (const item of items) {
        const product = await getProductSummaryById(item.productId);
        itemsEle.innerHTML += `
                <div class="item" id="${item.id}">                            
                    <img src="${product.primaryImageUrl ?? ""}" alt="image">
                    <div class="item-details">
                        <span class="item-name">${product.name}</span>
                        <span class="item-price">${product.price}$</span>                
                        <span id="item-quantity">x${item.quantity}</span>
                    </div>
                </div>       
            `;
    }
}

useDefaultAddress.addEventListener("click", async (e) => {
    if (e.target.checked === true) {
        try {
            const address = await getDefaultAddressByUserId(userId);
            country.value = address.country;
            city.value = address.city;
            region.value = address.region;
            addressLine.value = address.addressLine;
            hasAddress = true;
        } catch {
            hasAddress = false;
        }
    }
    else {
        country.value = "";
        city.value = "";
        region.value = "";
        addressLine.value = "";
        hasAddress = false;
    }
});

payBtn.addEventListener("click", async () => {

    if (!hasAddress) {
        try {
            payBtn.className = "hidden";
            message.classList.remove("error-message");
            message.innerHTML = `please wait a minute <span class="spinner"></span>`;
            await createAddress(userId, country.value, city.value, region.value, addressLine.value, false);
            location.href = "pay.html?orderId=" + orderId;
        } catch (err) {
            message.innerHTML = `${err.message}`;
            message.className = "error-message";
            payBtn.classList.remove("hidden");
        }
    } else {

        payBtn.className = "hidden";
        message.classList.remove("error-message");
        message.innerHTML = `please wait a minute <span class="spinner"></span>`;
        location.href = "pay.html?orderId=" + orderId;
    }
});