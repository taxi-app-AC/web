const store = JSON.parse(localStorage.getItem('redux-store')) || {};
const initialState = store.hasOwnProperty('user') ? store.login : {};

const Auth = (state = initialState, action) => {

    switch (action.type) {
        case 'LOGIN':
            return {
                ...state,
                ...action.login
            };
        default:
            return state;
    }
};

export default Auth;