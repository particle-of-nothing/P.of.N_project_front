const renderCategories = categories => {

    const categoriesMenuElement = document.getElementById('caterories-navigation');

    categoriesMenuElement.innerHTML = '';

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

    const productsListElement = document.getElementById('constructor-products-list');
    const productTemplateElement = document.getElementById('product-template');
    
    productsListElement.innerHTML = '';
    
    const productsElements = products.map(product => {
        const productElement = productTemplateElement.cloneNode(true);
        productElement.removeAttribute('hidden')
        
        Element.prototype.querySelector.call(productElement, '.title').innerText = product.product_name;
        Element.prototype.querySelector.call(productElement, '.props').innerText = product.description;

        const imageSrc = product.photo ? `assets/images/test/${product.photo}` : `assets/images/placeholder.png`;
        Element.prototype.querySelector.call(productElement, '.product-inner img').src = imageSrc;
        
        Element.prototype.querySelector.call(productElement, 'a').href = `${DOMAIN}/product-details.html?${QUERY_PARAMS_PRODUCT_KEY}=${product.id_product}`;
        Element.prototype.querySelector.call(productElement, 'button').addEventListener('click', () => { alert(product.id_product + ' ' + product.product_name); });

        return productElement;
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
