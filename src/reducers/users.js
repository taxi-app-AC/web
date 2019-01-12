const initialState = {}

const todos = (state = initialState, action) => {

    console.log(action);

    switch (action.type) {
        case 'GET_USERS':
            return {
                ...state,
                ...action.users
            }
        default:
            return state
    }
}

export default todos