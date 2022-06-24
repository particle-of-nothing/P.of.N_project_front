const signOut = () => {
    // sign out req
    localStorage.removeItem(LS_TOKEN_KEY);
}

const authRedirect = (backwardUrl = '') => {
    window.location.href = `${DOMAIN}/sign-in.html${backwardUrl ? `?${QUERY_PARAMS_BACKWARD_URL_KEY}=`+ backwardUrl : ''}`;
}

const getTokenFromResponse = response => {
    const authHeader = response.headers.get(AUTH_HEADER_KEY);
    
    if (!authHeader) {
        return;
    }

    return authHeader.split(' ')[1];

}

const requestWithCredantials = () => {
    return user
        .then(user => {
            if (!user) {
                signOut();
                authRedirect(window.location.href);
                throw { message: 'Can not refresh session' };
            }
        });
}

const getAuthHeader = () => {
    const token = localStorage.getItem(LS_TOKEN_KEY);

    if (!token) {
        return;
    }

    const headers = new Headers();
    headers.append(AUTH_HEADER_KEY, `Bearer ${token}`);

    return headers;
}

const addProductToPacket = (packetId, productId) => {
    return requestWithCredantials()
        .then(() => {
            return fetch(
                `${API_URL}/packets/${packetId}/products`,
                {
                    method: 'PATCH',
                    headers: getAuthHeader(),
                    body: JSON.stringify({ id: productId })
                }
            )
        })
        .then(response => response.json())
        .catch(error => console.error(error.message));
}

const createPacket = () => {
    return requestWithCredantials()
        .then(() => {
            return fetch(
                `${API_URL}/packets`,
                {
                    method: 'POST',
                    headers: getAuthHeader(),
                }
            )
        })
        .then(response => response.json())
        .catch(error => console.error(error.message));
}

const refreshUser = () => {
    return fetch(
        `${API_URL}/refresh`,
        {
            method: 'GET',
            headers: getAuthHeader(),
        }
    )
        .then(response => {
            if (response.status !== 200) {
                throw response.message;
            }
            
            const token = getTokenFromResponse(response);
            if (!token) {
                throw 'No token provided';
            }

            localStorage.setItem(LS_TOKEN_KEY, token);

            
            return response.json();
        })
        .catch(error => {
            console.error(error);
        });
}

const signUp = (login, password) => {
    return fetch(
        `${API_URL}/sign-up`,
        {
            method: 'POST',
            body: JSON.stringify({ login, password })
        },
    )
        .then(response => {

            const token = getTokenFromResponse(response);
            if (!token) {
                throw 'No token provided';
            }
            
            localStorage.setItem(LS_TOKEN_KEY, token);

            return response.json();
        });
}

const auth = (login, password) => {
    return fetch(
        `${API_URL}/sign-in`,
        {
            method: 'POST',
            body: JSON.stringify({ login, password })
        },
    )
        .then(response => {

            const token = getTokenFromResponse(response);
            if (!token) {
                throw 'No token provided';
            }
            
            localStorage.setItem(LS_TOKEN_KEY, token);

            return response.json();
        });
}

const getCategories = (categoryTypeId) => {
    return fetch(`${API_URL}/category?${QUERY_PARAMS_SELECTED_CATEGORY_TYPE_KEY}=${categoryTypeId || PC_CONSTRUCTOR_CATEGORY_TYPE_ID}`)
        .then(response => response.json());
}

const getProductsByCategoryId = (categoryId) => {
    return fetch(`${API_URL}/products?category=${categoryId}`)
        .then(response => response.json());
}

const getProductById = (productId) => {
    return fetch(`${API_URL}/products/${productId}`)
        .then(response => response.json());
}

const search = (pattern) => {
    return fetch(`${API_URL}/search?s=${pattern}`)
        .then(response => response.json())
}