
const locationQueryParams = window.location.search;
const queryParams = new URLSearchParams(locationQueryParams);
const productId = queryParams.get(QUERY_PARAMS_PRODUCT_KEY);

const renderOptions = options => {
    const propertyTemplate = document.getElementById('property-template');
    const propertiesElement = document.getElementById('properties');

    propertiesElement.innerHTML = '';

    const propertiesElements = options.map(option => {
        const propertyElement = propertyTemplate.cloneNode(true);

        propertyElement.removeAttribute('id');
        propertyElement.removeAttribute('hidden');
        propertyElement.setAttribute('title', option.description || '');

        Element.prototype
            .querySelector.call(propertyElement, '.product-option-name')
            .innerText = option.option_name;
        
        Element.prototype
            .querySelector.call(propertyElement, '.product-option-value')
            .innerText = `${option.value} ${option.units}`;

        return propertyElement;
    });

    propertiesElements.forEach(propertyElement => {
        propertiesElement.appendChild(propertyElement);
    });
}

getProductById(productId)
    .then(product => {
        const productNameElement = document.getElementById('product-name');
        productNameElement.innerText = product.product_name;

        const productDescriptionElement = document.getElementById('product-description');
        productDescriptionElement.innerText = product.description;

        const imageSrc = product.photo
            ? `assets/images/test/${product.photo}`
            : `assets/images/placeholder.png`;

        document.getElementById('main-photo').src = imageSrc;

        renderOptions(product.options);
    });
