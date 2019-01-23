const initialState = {};

const UserForm = (state = initialState, action) => {

    switch (action.type) {
        case 'CHANGE_ACTIVE':
            return {
                ...state,
                active: action.active
            };
        case 'CHANGE_CATEGORY':
            return {
                ...state,
                category: action.category
            };
        case 'CLEAR_CHANGES':
            return {};
        default:
            return state;
    }
};

export default UserForm;
