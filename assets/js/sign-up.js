(() => {

    const registrationFormElement = document.getElementById('sign-up-form');
    const loginInputElement = document.getElementById('login-input');
    const passwordInputElement = document.getElementById('password-input');

    registrationFormElement.addEventListener('submit', event => {
        event.preventDefault();
        const login = loginInputElement.value;
        const password = passwordInputElement.value;

        fetch(
            `${API_URL}/sign-up`,
            {
                method: 'POST',
                body: JSON.stringify({
                    login,
                    password
                })
            },
        )
            .then(response => {
                const token = response.headers.get(AUTH_HEADER_KEY);
                if (token) {
                    localStorage.setItem(LS_TOKEN_KEY, token.split(' ')[1]);
                }
                return response.json();
            })
            .then(user => {
                console.log(user);
                // 
            });
    });

})();
