import {AnyAction, applyMiddleware, combineReducers, legacy_createStore} from "redux";
import {authReducer} from "../features/auth/auth-reducer";
import thunk, {ThunkAction, ThunkDispatch} from "redux-thunk";
// import {profileReducer} from "../features/profile/profileReducer";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {AppReducer} from "./appReducer";
import {AppActionsType} from "./types";
import {AuthActionsType} from "../features/auth/types";

const rootReducer = combineReducers({
    auth: authReducer,
    // profile: profileReducer,
    app: AppReducer

})

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));

export type AppRootStateType = ReturnType<typeof rootReducer>
export type AppThunkDispatch = ThunkDispatch<AppRootStateType, unknown, AllReducersActionType>

export type AppThunk<A extends AnyAction, ReturnType = void> = ThunkAction<
    ReturnType, AppRootStateType, unknown, A>
export type AllReducersActionType = AuthActionsType | AppActionsType

export const useAppDispatch = () => useDispatch<AppThunkDispatch>();
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector
// @ts-ignore
window.store = store;

