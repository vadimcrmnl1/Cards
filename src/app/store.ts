import {AnyAction, applyMiddleware, combineReducers, legacy_createStore} from "redux";
import {authReducer} from "../features/auth/auth-reducer";
import thunk, {ThunkDispatch} from "redux-thunk";
import {profileReducer} from "../features/profile/profileReducer";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {AppReducer} from "./AppReducer";

const rootReducer = combineReducers({
    auth: authReducer,
    profile: profileReducer,
    app: AppReducer

})

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));

export type AppRootStateType = ReturnType<typeof rootReducer>
export type AppThunkDispatch = ThunkDispatch<AppRootStateType, unknown, AnyAction>
//Это общий тип для санок. В Дженерик А передаём ему тип экшенов нужного нам редьюсера и всё. Пример в auth-reducer.
export type AppThunk<A extends AnyAction, ReturnType = void> = ThunkAction<
    ReturnType, AppRootStateType, unknown, A>

export const useAppDispatch = () => useDispatch<AppThunkDispatch>();
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector
// @ts-ignore
window.store = store;

