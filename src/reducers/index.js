import { combineReducers } from 'redux'
import users from './user';
import login from './auth';

const appReducer = combineReducers({
    users,
    login
});

const rootReducer = (state, action) => {

    console.log('hehehhehehg')

    if (action.type === 'LOGOUT') {
        state = undefined;
    }

    return appReducer(state, action)
};

export default rootReducer;

// export default combineReducers({
//     users,
//     user
// })