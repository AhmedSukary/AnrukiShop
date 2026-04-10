import { get, put} from "../../core/apiClient.js";

export async function getOrderById(id) {
    return await get("/Order/GetBy/" + id);
}

export async function getOrdersByUserId(id) {
    return await get("/Order/GetByUser/" + id);
}

export async function cancelOrderById(id) {
    return await put("/Order/MarkAsCancelled/" + id);
}