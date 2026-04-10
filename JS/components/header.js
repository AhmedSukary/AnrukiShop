export async function Header() {
    const Header = document.getElementById("header");
    Header.innerHTML = `
        <h1 class="logo"><a href="index.html">AnrukiShop<i class="fa-solid fa-bag-shopping"></i> </a></h1>
        <div class="search">
            <input class="input-search" type="search" id="searchInput" placeholder="search product" />
            <button id="searchBtn"><i class="fa-solid fa-magnifying-glass"></i></button>
        </div>
        <div class="links">
            <div class="link" id="accountLink">
                <i class="fa-solid fa-user"></i>
                <span>My Account</span>
            </div>
            <div class="link" id="favoriteLink">
                <i class="fa-solid fa-heart"></i>
                <span>My Favorite</span>
            </div>
            <div class="link" id="cartLink">
                <i class="fa-solid fa-cart-shopping"></i>
                <span>My Cart</span>
            </div>
        </div>
    `;

    const userId = localStorage.getItem("userId");
    const searchInput = document.getElementById("searchInput");
    const searchBtn = document.getElementById("searchBtn");

    searchBtn.addEventListener("click", () => {
        if (searchInput.value !== "") 
            window.location.href = "products.html?query=" + searchInput.value;      
    });

    document.getElementById("accountLink").addEventListener("click", () => {
        if (userId) {
            window.location.href = "user.html";
        } else {
            window.location.href = "login.html";
        }
    });

    document.getElementById("favoriteLink").addEventListener("click", () => {
        if (userId) {
            window.location.href = "wishlist.html";
        } else {
            window.location.href = "login.html";
        }
    });

    document.getElementById("cartLink").addEventListener("click", () => {
        if (userId) {
            window.location.href = "cart.html";
        } else {
            window.location.href = "login.html";
        }
    });
}