import { combineReducers } from 'redux'
import users from './user';
import user from './login';


// const appReducer = combineReducers({
//     users,
//     user
// });
//
// const rootReducer = (state, action) => {
//
//     console.log(action);
//     console.log(state);
//
//
//     if (action.type === 'USER_LOGOUT') {
//         state = undefined
//     }
//
//     return appReducer(state, action)
// }
//
// export default rootReducer()

export default combineReducers({
    users,
    user
})