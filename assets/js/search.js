(function () {
    const searchInputElement = document.getElementById('search-input');
    const searchResultsTemplateElement = document.getElementById('search-results-template');
    const searchElement = document.getElementById('search');

    const searchResultElement = searchResultsTemplateElement.cloneNode(true);
    searchResultElement.removeAttribute('hidden');

    const targetClientRect = searchElement.getBoundingClientRect();
    const offsetX = targetClientRect.left;
    const offsetY = targetClientRect.top;
    const height = targetClientRect.height;
    const width = targetClientRect.width;
    const offset = 10;

    searchResultElement.style.top = offsetY + height + offset + 'px';
    searchResultElement.style.left = offsetX + 'px';
    searchResultElement.style.width = width + 'px';

    const renderSearchResult = searchResult => {

        const productsListElement = document.createElement('div');
        productsListElement.classList.add('products-list', 'inline');

        searchResultElement.innerHTML = '';
        searchResultElement.appendChild(productsListElement);


        const productsElements = searchResult.products.map(product => {
            const productElement = document.createElement('div');
            const productTitleElement = document.createElement('span');
            const productButtonElement = document.createElement('button');

            productElement.classList.add('product-item');
            productTitleElement.innerText = product.product_name;
            productButtonElement.innerText = '+';
            productElement.appendChild(productTitleElement);
            productElement.appendChild(productButtonElement);

            return productElement;
        });

        productsElements.forEach(element => {
            productsListElement.appendChild(element);
        });
    }

    let hideOverlay;

    const processInput = event => {
        if (event.target.value) {
            search(event.target.value)
                .then(searchResult => {
                    renderSearchResult(searchResult);
                });

            if (!hideOverlay) {
                hideOverlay = showOverlay(searchResultElement);
            }
        } else {
            hideOverlay && hideOverlay();
            hideOverlay = undefined;
        }
    }

    searchInputElement.addEventListener('input', debounce(processInput));
})();