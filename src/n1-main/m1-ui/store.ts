import {combineReducers, legacy_createStore} from "redux";
import {authReducer} from "../m2-bll/auth-reducer";

const rootReducer = combineReducers({
    auth: authReducer

})

export const store = legacy_createStore(rootReducer);

export type AppRootStateType = ReturnType<typeof rootReducer>

// @ts-ignore
window.store = store;