import { applyMiddleware, combineReducers, legacy_createStore} from "redux";
import {authReducer} from "../features/auth/auth-reducer";
import thunk from "redux-thunk";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {appReducer} from "./app-reducer";
import {AppThunkDispatch} from "./types";
import {profileReducer} from "../features/profile/profile-reducer";
import {packsReducer} from "../features/table/Packs/packs-reducer";
import {composeWithDevTools} from "redux-devtools-extension";


const rootReducer = combineReducers({
    auth: authReducer,
    profile: profileReducer,
    app: appReducer,
    packs:packsReducer,
})


const middlewareEnhancer = applyMiddleware<AppThunkDispatch, AppRootStateType>(thunk)
//enchancers это функции,которые пмогут добавлять нашему стору различные улучшения, например,
//мидлвар санок. Все эти улучшение можно объеденить специальной функцией, которая добавляет возможность
// пользоваться reactDevTools - очень полезное расширение для хрома.
const composedEnhancers = composeWithDevTools(middlewareEnhancer)
export const store = legacy_createStore(rootReducer, composedEnhancers);

export type AppRootStateType = ReturnType<typeof rootReducer>

//хуки тоже можно вынести в отдельный файл
export const useAppDispatch = () => useDispatch<AppThunkDispatch>();
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector


// @ts-ignore
window.store = store;

