import { Header } from "../../components/header.js";
import { Nav } from "../../components/nav.js";
import { Footer } from "../../components/footer.js";
import { getUserCart, updateQuantity, removeItem } from "./cartService.js";
import { getProductSummaryById } from "../products/productService.js";
import { checkout } from "../checkout/checkoutService.js";

Header();
Nav();
Footer();

const userId = localStorage.getItem("userId");
const items = document.getElementById("items");
const itemsCount = document.getElementById("itemsCount");
const total = document.getElementById("total");
const checkoutBtn = document.getElementById("checkoutBtn");

await renderContent();

async function renderContent() {
    const cart = await getUserCart(userId);

    if (cart.items.length === 0) {
        renderEmptyCart();
        return;
    }

    items.innerHTML = "";
    total.innerHTML = `Cart Total: ${calculateTotal(cart.items)}$`;
    itemsCount.innerHTML = `Items: ${cart.items.length}`;

    for (const item of cart.items) {
        const product = await getProductSummaryById(item.productId);

        items.innerHTML += `
            <div class="item" id="${item.id}">
                <div class="remove" id="remove-item-${item.id}">
                   <i class="fa-solid fa-xmark"></i>
                </div>
                <div class="item-details">
                   <img src="${product.primaryImageUrl ?? ""}" alt="image">
                   <span class="name">${product.name}</span>
                   <span class="price">Price: ${item.price}$</span>
                   <a href="product.html?Id=${item.productId}">View details</a>
                </div>       
                <div class="item-controls">
                       <button id="increase-itme-${item.id}"> + </button>
                       <span id="quantity-item-${item.id}"> ${item.quantity} </span>
                       <button id="decrease-item-${item.id}"> - </button>
                </div>
                <div class="item-total">
                    <div id="total-item${item.id}">Total: ${item.price * item.quantity}$</div>
                </div>
            </div>
        `;

        document.getElementById(`remove-item-${item.id}`).addEventListener("click", async () => {
            await removeItem(cart.id, item.id);
            await renderContent();
        });

        document.getElementById(`increase-itme-${item.id}`).addEventListener("click", async () => {
            await updateQuantity(cart.id, item.id, item.quantity + 1);
            await renderContent();
        });

        document.getElementById(`decrease-item-${item.id}`).addEventListener("click", async () => {
            if (item.quantity > 1) {
                await updateQuantity(cart.id, item.id, item.quantity - 1);
                await renderContent();
            }
            return;
        });
    }
}

checkoutBtn.addEventListener("click", async () => {
    const result = await checkout();
    window.location.href = "checkout.html?orderId=" + result.orderId;
})

function calculateTotal(items) {
    let total = 0;
    for (const item of items) {
        total += (item.price * item.quantity)
    }
    return total;
}

function renderEmptyCart() {
    container.innerHTML = `    
        <div class="title">
            <h4>Shopping Cart</h4>            
        </div>
        <div class="empty-cart">
            <span>No items in the cart yet.</span>
            <i class="fa-solid fa-cart-shopping"></i>
        </div>                       
    `;
}