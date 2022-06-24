const getRegistrationSearch = (srcHref, backwardUrl) => {
    const url = new URL(srcHref);
    const queryParms = new URLSearchParams(url.search);
    queryParms.set(QUERY_PARAMS_BACKWARD_URL_KEY, backwardUrl);
    return queryParms.toString();
}

(() => {
    const locationQueryParams = window.location.search;
    const queryParams = new URLSearchParams(locationQueryParams);
    const backwardUrl = queryParams.get(QUERY_PARAMS_BACKWARD_URL_KEY) || `${DOMAIN}/index.html`;

    const authorisationFormElement = document.getElementById('sign-in-form');
    const loginInputElement = document.getElementById('login-input');
    const passwordInputElement = document.getElementById('password-input');
    const registrationLinkElement = document.getElementById('reg-link-backward-url');

    registrationLinkElement.search = getRegistrationSearch(registrationLinkElement.href, backwardUrl);

    authorisationFormElement.addEventListener('submit', event => {
        event.preventDefault();

        const login = loginInputElement.value;
        const password = passwordInputElement.value;

        auth(login, password)
            .then(user => {
                if (backwardUrl === null) {
                    return;
                }
                window.location.href = backwardUrl;
            });
    });

})();
