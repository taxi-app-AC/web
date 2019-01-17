const initialState = {};

const User = (state = initialState, action) => {

    console.log(state)
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