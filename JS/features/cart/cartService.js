import { get, post, put, del } from "../../core/apiClient.js";

export async function getUserCart(id) {
    return await get("/Cart/GetByUser/" + id);
}


export async function addToCart(cartId, productId, quantity, price) {
    const result = await post("/Cart/AddToCart", {
        cartId,
        productId,
        quantity,
        price,
    });
    return result;
}

export async function updateQuantity(cartId, itemId, quantity) {
    const result = await put("/Cart/UpdateItemQuantity", {
        cartId,
        itemId,
        quantity,
    });
    return result;
}

export async function removeItem(cartId, itemId) {
    return await del("/Cart/RemoveItem?cartId=" + cartId + "&itemId=" + itemId);
}