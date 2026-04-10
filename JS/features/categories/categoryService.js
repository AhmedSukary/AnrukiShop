import { get } from "../../core/apiClient.js";

export async function getCategories() {
    return await get("/Category/GetCategoryTree");   
}

export async function getCategoryPathBy(id) {
    return await get("/Category/GetCategoryPathBy/" + id);   
}