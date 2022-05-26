const renderCategories = categories => {

    const categoriesMenuElement = document.getElementById('caterories-navigation');

    const categoriesElements = categories.map(category => {
        const linkElement = document.createElement('a');
        const linkElementItem = document.createElement('li');

        linkElementItem.appendChild(linkElement);
        linkElementItem.classList.add('category-link-item');

        linkElement.href = `${DOMAIN}/constructor.html?${QUERY_PARAMS_SELECTED_CATEGORY_KEY}=${category.id_category}`;
        linkElement.innerText = category.category_name;
        linkElement.classList.add('category-link');

        return linkElementItem;
    });

    categoriesElements.forEach(link => {
        categoriesMenuElement.appendChild(link);
    });
}

const renderProducts = products => {
    const productsListElement = document.getElementById('products-list');

    const productsElements = products.map(product => {
        const productsElement = document.createElement('div');

        productsElement.classList.add('product-item');
        productsElement.innerText = product.product_name;

        return productsElement;
    });

    productsElements.forEach(element => {
        productsListElement.appendChild(element);
    });
}

fetch(`${API_URL}/category?type=${PC_CONSTRUCTOR_CATEGORY_TYPE_ID}`)
    .then(response => response.json())
    .then(categories => {
        renderCategories(categories);
    });

const locationQueryParams = window.location.search;
const queryParams = new URLSearchParams(locationQueryParams);
const selectedCategoryId = queryParams.get(QUERY_PARAMS_SELECTED_CATEGORY_KEY);

if (selectedCategoryId) {
    fetch(`${API_URL}/products?category=${selectedCategoryId}`)
        .then(response => response.json())
        .then(products => {
            renderProducts(products);
        });
}
