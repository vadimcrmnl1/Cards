import { applyMiddleware, combineReducers, legacy_createStore} from "redux";
import {authReducer} from "../features/auth/auth-reducer";
import thunk from "redux-thunk";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {appReducer} from "./app-reducer";
import {AppThunkDispatch} from "./types";
import {profileReducer} from "../features/profile/profile-reducer";
import {packsReducer} from "../features/table/Packs/packs-reducer";
import {composeWithDevTools} from "redux-devtools-extension";
import {cardsReducer} from "../features/table/Cards/cards-reducer";


const rootReducer = combineReducers({
    auth: authReducer,
    profile: profileReducer,
    app: appReducer,
    packs:packsReducer,
    cards: cardsReducer,

})
//localstorage
// const saveToLocalStorage = (state: AppRootStateType) => {
//     try {
//         const serializedState = JSON.stringify(state)
//         localStorage.setItem('persistedState', serializedState)
//     } catch (err: any) {
//         console.warn(err)
//     }
// }
// const loadFromLocalStorage = () => {
//     try {
//         const serialisedState = localStorage.getItem('persistedState')
//         if (serialisedState === null) {
//             return undefined
//         }
//         return JSON.parse(serialisedState)
//     } catch (err: any) {
//         console.warn(err)
//         return undefined
//     }
// }


const middlewareEnhancer = applyMiddleware<AppThunkDispatch, AppRootStateType>(thunk)
//enchancers это функции,которые пмогут добавлять нашему стору различные улучшения, например,
//мидлвар санок. Все эти улучшение можно объеденить специальной функцией, которая добавляет возможность
// пользоваться reactDevTools - очень полезное расширение для хрома.
const composedEnhancers = composeWithDevTools(middlewareEnhancer)
export const store = legacy_createStore(rootReducer, composedEnhancers);
// store.subscribe(() => saveToLocalStorage(store.getState()))
export type AppRootStateType = ReturnType<typeof rootReducer>

//хуки тоже можно вынести в отдельный файл
export const useAppDispatch = () => useDispatch<AppThunkDispatch>();
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector


// @ts-ignore
window.store = store;

