import { get } from "../../core/apiClient.js";

export async function getProductById(id) {
    return await get("/Product/GetBy/" + id);
}
export async function getProductSummaryById(id) {
    return await get("/Product/GetSummaryBy/" + id);
}

export async function getProductsSummary() {
    return await get("/Product/GetProductsSummary");
}

export async function getProductsSummaryByCategoryId(id) {
    return await get("/Product/GetProductsSummaryByCategory/" + id);
}

export async function searchProducts(query) {
    return await get("/Product/SearchProducts/" + query);
}

export async function getProductReviewsByProductId(id) {
    return await get("/ProductReview/GetByProduct/" + id);
}

export async function getProductImagesByProductId(id) {
    return await get("/ProductImage/GetProductImagesById/" + id);
}
