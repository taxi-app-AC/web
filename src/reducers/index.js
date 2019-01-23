import { combineReducers } from 'redux'
import users from './user';
import login from './auth';
import userForm from './userForm';

const appReducer = combineReducers({
    users,
    userForm,
    login
});

const rootReducer = (state, action) => {

    if (action.type === 'LOGOUT') {
        state = undefined;
    }

    return appReducer(state, action)
};

export default rootReducer;
