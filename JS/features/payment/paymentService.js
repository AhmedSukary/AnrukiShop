import { post } from "../../core/apiClient.js";

export async function createPayment(orderId, method) {
    const result = await post("/Payment/Create", {
        orderId,
        method
    });
    return result;
}

export async function pay(paymentId, transactionRef) {
    const result = await post("/Payment/Pay", {
        paymentId,
        transactionRef
    });
    return result;
}