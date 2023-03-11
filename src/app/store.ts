import { applyMiddleware, combineReducers, legacy_createStore} from "redux";
import {authReducer} from "../features/auth/auth-reducer";
import thunk from "redux-thunk";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {appReducer} from "./app-reducer";
import { AppThunkDispatch} from "./types";
import {profileReducer} from "../features/profile/profile-reducer";

const rootReducer = combineReducers({
    auth: authReducer,
    profile: profileReducer,
    app: appReducer
})

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));

export type AppRootStateType = ReturnType<typeof rootReducer>

//хуки тоже можно вынести в отдельный файл
export const useAppDispatch = () => useDispatch<AppThunkDispatch>();
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector


// @ts-ignore
window.store = store;

