const getSignInSearch = (srcHref, backwardUrl) => {
    const url = new URL(srcHref);
    const queryParms = new URLSearchParams(url.search);
    queryParms.set(QUERY_PARAMS_BACKWARD_URL_KEY, backwardUrl);
    return queryParms.toString();
}

(() => {
    const locationQueryParams = window.location.search;
    const queryParams = new URLSearchParams(locationQueryParams);
    const backwardUrl = queryParams.get(QUERY_PARAMS_BACKWARD_URL_KEY) || `${DOMAIN}/index.html`;

    const registrationFormElement = document.getElementById('sign-up-form');
    const loginInputElement = document.getElementById('login-input');
    const passwordInputElement = document.getElementById('password-input');
    const signInLinkElement = document.getElementById('auth-link-backward-url');

    signInLinkElement.search = getSignInSearch(signInLinkElement.href, backwardUrl);

    registrationFormElement.addEventListener('submit', event => {
        event.preventDefault();

        const login = loginInputElement.value;
        const password = passwordInputElement.value;

        signUp(login, password)
            .then(user => {
                if (backwardUrl === null) {
                    return;
                }
                window.location.href = backwardUrl;
            });
    });

})();
