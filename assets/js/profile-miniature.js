const profileLinkElement = document.getElementById('profile-link');

user
    .then(user => {
        profileLinkElement.innerText = user.login;
        profileLinkElement.addEventListener('click', e => {
            const confirmation = confirm('Вы уверены, что хотите выйти?');
            e.preventDefault();
            if (confirmation) {
                signOut();
                authRedirect(window.location.href);
            }
        });
    })
    .catch(error => {
        profileLinkElement.innerText = 'Войти';
        profileLinkElement.addEventListener('click', e => {
            e.preventDefault();
            authRedirect(window.location.href);
        });
        console.log(error);
    });
