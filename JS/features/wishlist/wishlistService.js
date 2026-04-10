import { get, post, del } from "../../core/apiClient.js";

export async function getUserWishlist(id) {
    return await get("/Wishlist/GetByUser/" + id);
}

export async function addToWishlist(wishlistId, productId) {
    const result = await post("/Wishlist/AddToWishlist", {
        wishlistId,
        productId
    });
    return result;
}

export async function removeItem(wishlistId, productId) {
    return await del("/Wishlist/RemoveItem?wishlistId=" + wishlistId + "&productId=" + productId);
}