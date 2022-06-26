const locationQueryParams = window.location.search;
const queryParams = new URLSearchParams(locationQueryParams);

const renderProductsImages = (targetElement, products) => {
    targetElement.innerHTML = '';
    console.log(products);
    products
        .slice(0, 4)
        .forEach(product => {
            const imgElement = document.createElement('img');
            const imageSrc = product.photo
                ? `assets/images/test/${product.photo}`
                : `assets/images/placeholder.png`;

            imgElement.src = imageSrc;
            targetElement.appendChild(imgElement);
        });
}

const renderPackets = (packets, listId = 'packets-list') => {
    const packetsListElement = document.getElementById(listId);
    const packetTemplateElement = document.getElementById('packet-template');

    packetsListElement.innerHTML = '';

    const packetsElements = packets.map(packet => {
        const packetElement = packetTemplateElement.cloneNode(true);
        packetElement.removeAttribute('hidden')

        packetElement.querySelector = (...paramenters) => Element
            .prototype
            .querySelector
            .call(packetElement, ...paramenters);

        packetElement.addEventListener = (...paramenters) => Element
            .prototype
            .addEventListener
            .call(packetElement, ...paramenters);

        packetElement.querySelector('.title')
            .innerText = packet.name;

        const date = new Date(packet.date);
        packetElement.querySelector('.date-value')
            .innerText = date.toLocaleDateString();

        getProductsPacketId(packet.id_packet)
            .then(products => {
                renderProductsImages(
                    packetElement.querySelector('.images'),
                    products
                );
            });

        const paramsForGeneralLink = new URLSearchParams(locationQueryParams);
        paramsForGeneralLink.set(QUERY_PARAMS_PACKET_KEY, packet.id_packet);
        packetElement.querySelector('.general-link')
            .href = `${DOMAIN}/packet-details.html?${paramsForGeneralLink.toString()}`;

        const editLinkElement = packetElement.querySelector('.edit-link');
        editLinkElement.href = `${DOMAIN}/constructor.html`;
        editLinkElement.addEventListener('click', () => {
            localStorage.setItem(LS_ACTIVE_PACKET_KEY, packet.id_packet)
        });

        return packetElement;
    });

    packetsElements.forEach(element => {
        packetsListElement.appendChild(element);
    });
}

getPackets().then(packets => renderPackets(packets));