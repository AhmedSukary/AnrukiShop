import { getCategories } from "./categoryService.js";

export async function renderCategories() {

    let content = ``;
    const categories = await getCategories();
    categories.forEach(category => {
        content += `
            <div class="categories">
                <div id="${category.id}" class="main-category">
                    ${category.name}
                    ${renderSubCategory(category.children)}
                </div>
            </div>
            `;
    });

    return content;
}

function renderSubCategory(children) {
    let subCategory = ``;

    for (let i = 0; i < children.length; i++) {
        if (!children[i].children || children[i].children.length === 0) {
            subCategory += `
            <div class="sub-category">
                <a href="products.html?categoryId=${children[i].id}" class="category-link"> ${children[i].name}</a>              
            </div>`;
        }
        else {
            subCategory += `
            <div class="sub-category">
                ${children[i].name}
                ${renderSubCategory(children[i].children)}
            </div>`;
        }
    }

    return subCategory;
}