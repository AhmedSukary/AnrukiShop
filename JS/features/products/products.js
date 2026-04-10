import { Header } from "../../components/header.js";
import { Footer } from "../../components/footer.js";
import { Nav } from "../../components/nav.js";
import { getProductsSummaryByCategoryId, getProductsSummary, searchProducts } from "./productService.js";
import { getUserWishlist, addToWishlist, removeItem } from "../wishlist/wishlistService.js";

Header();
Nav();
Footer();

const userId = localStorage.getItem("userId");
const params = new URLSearchParams(window.location.search);
const categoryId = params.get("categoryId");
const query = params.get("query");

if (categoryId) {
    await renderProductsByCategoryId(categoryId);
} else if (query) {
    await renderSearchProducts(query);
} else {
    await renderProductsSummary();
}

export async function renderProductsSummary() {
    const products = await getProductsSummary();
    const productsElement = document.getElementById("products");
    productsElement.innerHTML = "";
    for (const p of products) {
        productsElement.innerHTML += `
            <div class="product" id="${p.id}">
                <a href="product.html?Id=${p.id}"></a>
                <div class="favorite" id="favorite-${p.id}"><i class="fa-regular fa-heart"></i></div>
                <img src="${p.primaryImageUrl}" alt="product-image">
                <p class="title">${p.name}</p>
                <div class="rating">${renderRating(p.avgRating)}</div>
                <div class="comments">(${p.commentsCount}) <i class="fa-regular fa-comment-dots"></i></div>
                <div class="price">${p.price}$</div>
            </div>
        `;
    }

    for (const p of products) {
        const favorite = document.getElementById(`favorite-${p.id}`);
        favorite.addEventListener("click", async () => {
            if (userId) {
                const wishlist = await getUserWishlist(userId);
                if (favorite.classList.contains("is-favorite")) {
                    favorite.className = "favorite";
                    await removeItem(wishlist.id, p.id);
                } else {
                    favorite.className = "is-favorite";
                    await addToWishlist(wishlist.id, p.id);
                }
            } else
                window.location.href = "/login.html";
        });
    }
}

export async function renderProductsByCategoryId(id) {
    const products = await getProductsSummaryByCategoryId(id);
    const productsElement = document.getElementById("products");
    productsElement.innerHTML = "";
    for (const p of products) {
        productsElement.innerHTML += `
            <div class="product" id="${p.id}">
                <a href="product.html?Id=${p.id}"></a>
                <div class="favorite" id="favorite-${p.id}"><i class="fa-regular fa-heart"></i></div>
                <img src="${p.primaryImageUrl}" alt="product-image">
                <p class="title">${p.name}</p>
                <div class="rating">${renderRating(p.avgRating)}</div>
                <div class="comments">(${p.commentsCount}) <i class="fa-regular fa-comment-dots"></i></div>
                <div class="price">${p.price}$</div>
            </div>
        `;
    }

    for (const p of products) {
        const favorite = document.getElementById(`favorite-${p.id}`);
        favorite.addEventListener("click", async () => {
            if (userId) {
                const wishlist = await getUserWishlist(userId);
                if (favorite.classList.contains("is-favorite")) {
                    favorite.className = "favorite";
                    await removeItem(wishlist.id, p.id);
                } else {
                    favorite.className = "is-favorite";
                    await addToWishlist(wishlist.id, p.id);
                }
            } else
                window.location.href = "/login.html";
        });
    }
}

export async function renderSearchProducts(query) {
    const products = await searchProducts(query);
    const productsElement = document.getElementById("products");
    productsElement.innerHTML = "";
    for (const p of products) {
        productsElement.innerHTML += `
            <div class="product" id="${p.id}">
                <a href="product.html?Id=${p.id}"></a>
                <div class="favorite" id="favorite-${p.id}"><i class="fa-regular fa-heart"></i></div>
                <img src="${p.primaryImageUrl}" alt="product-image">
                <p class="title">${p.name}</p>
                <div class="rating">${renderRating(p.avgRating)}</div>
                <div class="comments">(${p.commentsCount}) <i class="fa-regular fa-comment-dots"></i></div>
                <div class="price">${p.price}$</div>
            </div>
        `;
    }

    for (const p of products) {
        const favorite = document.getElementById(`favorite-${p.id}`);
        favorite.addEventListener("click", async () => {
            if (userId) {
                const wishlist = await getUserWishlist(userId);
                if (favorite.classList.contains("is-favorite")) {
                    favorite.className = "favorite";
                    await removeItem(wishlist.id, p.id);
                } else {
                    favorite.className = "is-favorite";
                    await addToWishlist(wishlist.id, p.id);
                }
            } else
                window.location.href = "/login.html";
        });
    }
}

function renderRating(avgRating) {
    let ratingContent = `${avgRating}.0`;
    for (let i = 0; i < 5; i++) {
        if (avgRating >= i + 1)
            ratingContent += `<i class="fa-solid fa-star"></i>`;
        else
            ratingContent += `<i class="fa-regular fa-star"></i>`;
    }
    return ratingContent;
}