import { createPayment, pay } from "./paymentService.js";
import { getOrderById } from "../orders/orderService.js";

const params = new URLSearchParams(window.location.search);
const orderId = params.get("orderId");
const order = await getOrderById(orderId);
const message = document.getElementById("message");
const payBtn = document.getElementById("payBtn");
let paymentMethod = 1;

document.getElementById("total").innerHTML = `Total: ${order.total}$`;

payBtn.addEventListener("click", async () => {
    try {
        payBtn.className = "hidden";
        message.classList.remove("error-message");
        message.innerHTML = `please wait a minute to check the code matching <span class="spinner"></span>`;
        console.log(orderId, paymentMethod);
        const payment = await createPayment(orderId, paymentMethod);
        console.log(payment);
        const result = await pay(payment.paymentId, "#123456789");
        message.innerHTML = result.success;
        setTimeout(() => location.href = "index.html", 3000);
    }
    catch (err) {
        payBtn.classList.remove("hidden");
        message.innerHTML = `${err.code} <br> ${err.message}`;
        message.className = "error-message";
    }
});



