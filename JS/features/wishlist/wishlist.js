import { Header } from "../../components/header.js";
import { Nav } from "../../components/nav.js";
import { Footer } from "../../components/footer.js";
import { getUserWishlist, addToWishlist, removeItem } from "./wishlistService.js";
import { getProductSummaryById } from "../products/productService.js";

Header();
Nav();
Footer();

const userId = localStorage.getItem("userId");
const itemsEle = document.getElementById("items");
const itemsCount = document.getElementById("itemsCount");

await renderContent();

async function renderContent() {
    const wishlist = await getUserWishlist(userId);
    if (wishlist.items.length === 0) {
        renderEmptyWishlist();
        return;
    }

    itemsCount.innerHTML = `Items: ${wishlist.items.length}`;

    for (const item of wishlist.items) {
        const product = await getProductSummaryById(item.productId);

        itemsEle.innerHTML += `
            <div class="item" id="${item.id}">
            <div class="is-favorite" id="favorite-${product.id}"><i class="fa-regular fa-heart"></i></div>
                <div class="item-details">
                   <img src="${product.primaryImageUrl ?? ""}" alt="image">
                   <span class="name">${product.name}</span>
                   <span class="price">Price: ${product.price}$</span>
                   <a href="product.html?Id=${item.productId}">View details</a>
                </div>       
            </div>     
        `;
    }

    for (const item of wishlist.items) {
        const favorite = document.getElementById(`favorite-${item.productId}`);
        favorite.addEventListener("click", async () => {
            if (favorite.classList.contains("is-favorite")) {
                favorite.className = "favorite";
                await removeItem(wishlist.id, item.productId);
            } else {
                favorite.className = "is-favorite";
                await addToWishlist(wishlist.id, item.productId);
            }
        });
    }
}

function renderEmptyWishlist() {
    container.innerHTML = `    
        <div class="title">
            <h4>Wishlist</h4>            
        </div>
        <div class="empty-wishlist">
            <span>No items in the wishlist yet.</span>
            <i class="fa-solid fa-heart"></i>
        </div>                       
    `;
}