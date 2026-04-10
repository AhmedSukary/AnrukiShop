import { Header } from "../../components/header.js";
import { Footer } from "../../components/footer.js";
import { Nav } from "../../components/nav.js";
import { getProductById, getProductReviewsByProductId, getProductImagesByProductId } from "./productService.js";
import { getCategoryPathBy } from "../categories/categoryService.js";
import { getUserCart, addToCart } from "../cart/cartService.js";

Header();
Nav();
Footer();

const params = new URLSearchParams(window.location.search);
const Id = params.get("Id");

const product = await getProductById(Id);
const reviews = await getProductReviewsByProductId(Id);
const images = await getProductImagesByProductId(Id);
const categoryPath = await getCategoryPathBy(product.categoryId);

renderProduct();

async function renderProduct() {

    const productElement = document.createElement("div");
    productElement.className = "product";

    productElement.innerHTML = `
        <div class="category-path"><a href="products.html?categoryId=${product.categoryId}">${categoryPath.path}</a></div>
        <div class="slider">       
            <button class="prev">&#10094;</button>
            <div class="slides">${renderImages(images)}</div>
            <button class="next">&#10095;</button>
        </div>          
            <div class="product-details">
            <div class="title">${product.name}</div>
            <div class="description">${product.description}</div>
            <div class="rating">
                <div class="stars">${renderRating(reviews)}</div>
                <div class="comments-count">(${reviews.length}) <i class="fa-regular fa-comment-dots"></i></div>
            </div>
            <div class="price">$${product.price}</div>
            <div class="add-to-cart-btn">
                <button id="addToCart"><i class="fa-solid fa-cart-arrow-down"></i> Add to cart</button>
            </div>
        </div>   
        <div class="product-reviews">
            Reviews
            ${renderReviews(reviews)}
        </div>
        
    `;

    document.getElementById("section").append(productElement);

    document.getElementById("addToCart").addEventListener("click", () => {
        addItemToCart();
    });

    const slides = document.querySelectorAll(".slide");
    const next = document.querySelector(".next");
    const prev = document.querySelector(".prev");

    let index = 0;

    next.onclick = () => {
        index++;
        if (index >= slides.length)
            index = 0;

        showSlide(slides, index);
    }

    prev.onclick = () => {
        index--;
        if (index < 0)
            index = slides.length - 1;

        showSlide(slides, index);
    }
}

function showSlide(slides, i) {
    slides.forEach(slide => slide.classList.remove("active"));
    slides[i].classList.add("active");
}

function renderImages(images) {
    let imageTags = "";
    images.forEach(img => {
        if (img.isPrimary)
            imageTags += `<img src="${img.url}" class="slide active"></img>`;
        else
            imageTags += `<img src="${img.url}" class="slide"></img>`;
    });
    return imageTags;
}

function renderReviews(reviews) {
    let reviewElements = "";

    reviews.forEach(r => {
        let date = new Date(r.createdAt);
        reviewElements += `
        <div class="review">
            <div class="user-name"><i class="fa-solid fa-circle-user"></i> ${r.userName}</div>
            <div class="reting">${renderRatingComment(r.rating)}</div>
            <p class="comment">${r.comment}</p>
            ${date.toLocaleDateString()}
        </div>`;
    });
    return reviewElements;
}

function renderRating(reviews) {
    let ratings = [];
    let ratingAvg = 0;

    reviews.forEach(r => {
        ratings.push(r.rating);
    });

    for (let i = 0; i < ratings.length; i++) {
        ratingAvg += ratings[i];
    }

    ratingAvg = ratingAvg / ratings.length;

    ratingAvg = (Math.round(ratingAvg * 10) / 10)

    let ratingContent = `${ratingAvg}`;

    for (let i = 0; i < 5; i++) {

        if (ratingAvg >= i + 1)

            ratingContent += `<i class="fa-solid fa-star"></i>`;
        else
            ratingContent += `<i class="fa-regular fa-star"></i>`;
    }
    return ratingContent;
}

function renderRatingComment(rating) {
    let ratingComment = `${rating}.0 `;
    for (let i = 0; i < 5; i++) {
        if (rating >= i + 1)
            ratingComment += `<i class="fa-solid fa-star"></i>`;
        else
            ratingComment += `<i class="fa-regular fa-star"></i>`;
    }
    return ratingComment;
}

async function addItemToCart() {
    const userId = localStorage.getItem("userId");
    if (userId) {
        const cart = await getUserCart(userId);
        await addToCart(cart.id, product.id, 1, product.price);
        location.href = "cart.html";
    }
    else {
        location.href = "login.html";
    }
}