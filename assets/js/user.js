const user = {
    id: '',
    login: '',
    isAuth: false,

    setUser() {
        // const token = localStorage.getItem(LS_TOKEN_KEY);
        // fetch()
        // if (ok) {
        //     this.id = id;
        //     this.login = login;
        //     this.isAuth = true;
        // } else {
        //     window.location.href = 'sign-in.html';
        // }
    },
    signOut() {
        this.id = '';
        this.login = '';
        localStorage.removeItem(LS_TOKEN_KEY);
        window.location.reload();
    }
}
