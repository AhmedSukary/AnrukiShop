import { post } from "../../core/apiClient.js";

export async function checkout() {
    return await post("/Checkout");
}
