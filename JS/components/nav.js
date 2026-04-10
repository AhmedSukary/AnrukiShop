import { renderCategories } from "../features/categories/categories.js";

export async function Nav() {
    const content = await renderCategories();
    document.getElementById("nav").innerHTML = content;
}