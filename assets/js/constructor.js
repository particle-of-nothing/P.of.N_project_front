const locationQueryParams = window.location.search;
const queryParams = new URLSearchParams(locationQueryParams);

let activePacket;

const productAddHandler = selectedProductId => {
    const headers = new Headers();
    headers.append('authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjcsImlhdCI6MTY1NTMyMzA2NH0.VQzYAezQvib70R7dMW9Nm47g-7EGM_Wn7y44oOlawxA')

    if (activePacket) {
        fetch(
            `${API_URL}/packets/${packet.id}/products`,
            {
                method: 'PATCH',
                headers,
                body: JSON.stringify({ id: selectedProductId })
            }
        )
            .then(response => response.json())
            .then(packet => {
                activePacket = packet;
                renderProducts(packet.products, 'packet-products-list')
            });
    } else {
        fetch(
            `${API_URL}/packets`,
            {
                method: 'POST',
                headers
            }
        )
            .then(response => response.json())
            .then(packet => {
                return fetch(
                    `${API_URL}/packets/${packet.id}/products`,
                    {
                        method: 'PATCH',
                        headers,
                        body: JSON.stringify({ id: selectedProductId })
                    }
                )
                    .then(response => response.json());
            })
            .then(packet => {
                activePacket = packet;
                renderProducts(packet.products, 'packet-products-list')
            });
    }
}

const renderCategories = categories => {

    const categoriesMenuElement = document.getElementById('caterories-navigation');

    categoriesMenuElement.innerHTML = '';

    const categoriesElements = categories.map(category => {
        const linkElement = document.createElement('a');
        const linkElementItem = document.createElement('li');

        linkElementItem.appendChild(linkElement);
        linkElementItem.classList.add('category-link-item');

        const params = new URLSearchParams(locationQueryParams);
        params.set(QUERY_PARAMS_SELECTED_CATEGORY_KEY, category.id_category);
        linkElement.href = `${DOMAIN}/constructor.html?${params.toString()}`;
        linkElement.innerText = category.category_name;
        linkElement.classList.add('category-link');

        return linkElementItem;
    });

    categoriesElements.forEach(link => {
        categoriesMenuElement.appendChild(link);
    });
}

const renderProducts = (products, listId = 'constructor-products-list') => {
    const productsListElement = document.getElementById(listId);
    const productTemplateElement = document.getElementById('product-template');

    productsListElement.innerHTML = '';

    const productsElements = products.map(product => {
        const productElement = productTemplateElement.cloneNode(true);
        productElement.removeAttribute('hidden')

        Element.prototype
            .querySelector.call(productElement, '.title')
            .innerText = product.product_name;
        Element.prototype
            .querySelector.call(productElement, '.props')
            .innerText = product.description;

        const imageSrc = product.photo
            ? `assets/images/test/${product.photo}`
            : `assets/images/placeholder.png`;
        Element.prototype
            .querySelector.call(productElement, '.product-inner img')
            .src = imageSrc;

        const params = new URLSearchParams(locationQueryParams);
        params.set(QUERY_PARAMS_PRODUCT_KEY, product.id_product);
        Element.prototype
            .querySelector.call(productElement, 'a')
            .href = `${DOMAIN}/product-details.html?${params.toString()}`;
        Element.prototype
            .querySelector.call(productElement, 'button')
            .addEventListener('click', () => productAddHandler(product.id_product));

        return productElement;
    });

    productsElements.forEach(element => {
        productsListElement.appendChild(element);
    });
}

const selectedCategoryTypeId = queryParams.get(QUERY_PARAMS_SELECTED_CATEGORY_TYPE_KEY);
fetch(`${API_URL}/category?${QUERY_PARAMS_SELECTED_CATEGORY_TYPE_KEY}=${selectedCategoryTypeId || PC_CONSTRUCTOR_CATEGORY_TYPE_ID}`)
    .then(response => response.json())
    .then(categories => {
        renderCategories(categories);
    });

const selectedCategoryId = queryParams.get(QUERY_PARAMS_SELECTED_CATEGORY_KEY);
if (selectedCategoryId) {
    fetch(`${API_URL}/products?category=${selectedCategoryId}`)
        .then(response => response.json())
        .then(products => {
            renderProducts(products);
        });
}
