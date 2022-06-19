(() => {

    const registrationFormElement = document.getElementById('sign-up-form');
    const loginInputElement = document.getElementById('login-input');
    const passwordInputElement = document.getElementById('password-input');

    registrationFormElement.addEventListener('submit', event => {
        event.preventDefault();
        
        const login = loginInputElement.value;
        const password = passwordInputElement.value;

        signUp(login, password)
            .then(user => {
                console.log(user);
                // 
            });
    });

})();
