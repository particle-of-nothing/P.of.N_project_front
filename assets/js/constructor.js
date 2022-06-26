const locationQueryParams = window.location.search;
const queryParams = new URLSearchParams(locationQueryParams);

const packetTitleElement = document.getElementById('packet-title');

let activePacketId = localStorage.getItem(LS_ACTIVE_PACKET_KEY);


const productAddHandler = selectedProductId => {
    let result;
    if (activePacketId) {
        result = addProductToPacket(activePacketId, selectedProductId)
    } else {
        result = createPacket()
            .then(packet => addProductToPacket(packet.id, selectedProductId));
    }
    result.then(packet => {
        activePacketId = packet.id;
        localStorage.setItem(LS_ACTIVE_PACKET_KEY, activePacketId);
        renderPacket(packet);
    });
}

const productRemoveHandler = selectedProductId => {
    removeProductFromPacket(activePacketId, selectedProductId)
        .then(renderPacket);
}

const renderPacket = packet => {
    packetTitleElement.innerText = packet.name || PACKET_DEFAULT_NAME;
    renderProducts(packet.products, 'packet-items-list');
}

const closePacket = () => {
    packetTitleElement.innerText = PACKET_NAME_TIP;
    const packetProductsListElement = document.getElementById('packet-items-list');
    packetProductsListElement.innerHTML = '';
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

const renderProducts = (products, listId = 'constructor-items-list') => {
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
        
        if (product.quantity) {
            Element.prototype
                .querySelector.call(productElement, '.buttons')
                .classList.add('extended');

            Element.prototype
                .querySelector.call(productElement, '.product-quantity')
                .innerText = product.quantity;
            
            Element.prototype
                .querySelector.call(productElement, '.minus-btn')
                .addEventListener('click', () => productRemoveHandler(product.id_product));
        }
            
        Element.prototype
            .querySelector.call(productElement, '.plus-btn')
            .addEventListener('click', () => productAddHandler(product.id_product));

        return productElement;
    });

    productsElements.forEach(element => {
        productsListElement.appendChild(element);
    });
}

packetTitleElement.innerText = PACKET_NAME_TIP;

if (activePacketId) {
    getPacketById(activePacketId)
        .then(renderPacket);
}

const closeButtonElement = document.getElementById('close-suggestions');
closeButtonElement.addEventListener('click', () => {
    activePacketId = undefined;
    localStorage.removeItem(LS_ACTIVE_PACKET_KEY);
    closePacket();
});

const selectedCategoryTypeId = queryParams.get(QUERY_PARAMS_SELECTED_CATEGORY_TYPE_KEY);
getCategories(selectedCategoryTypeId)
    .then(categories => renderCategories(categories));

const selectedCategoryId = queryParams.get(QUERY_PARAMS_SELECTED_CATEGORY_KEY);
if (selectedCategoryId) {
    getProductsByCategoryId(selectedCategoryId)
        .then(products => renderProducts(products));
}
