const showOverlay = content => {
    const overlayHostElement = document.getElementById('overlay-host');
    overlayHostElement.innerHTML = '';
    overlayHostElement.appendChild(content);

    return () => {
        overlayHostElement.innerHTML = '';
    };
}; 
