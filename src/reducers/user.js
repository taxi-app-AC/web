const initialState = {};

const User = (state = initialState, action) => {

    switch (action.type) {
        case 'GET_USERS':
            return {
                ...state,
                ...action.users
            };
        default:
            return state;
    }
};

export default User;
