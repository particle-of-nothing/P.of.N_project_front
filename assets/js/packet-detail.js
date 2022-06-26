const locationQueryParams = window.location.search;
const packetTitleElement = document.getElementById('packet-title');

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

const renderPacket = packet => {
    packetTitleElement.innerText = packet.name || PACKET_DEFAULT_NAME;
    renderProducts(packet.products, 'packet-items-list');
}

const paramsForGeneralLink = new URLSearchParams(locationQueryParams);
const packetId = paramsForGeneralLink.get(QUERY_PARAMS_PACKET_KEY);

getPacketById(packetId).then(packet => {
    renderPacket(packet)
});