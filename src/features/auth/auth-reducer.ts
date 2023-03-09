import {authAPI, LoginParamsType, ResponseDataType} from "../../api/cards-api";
import {Dispatch} from "redux";
import {AppActionsType, setAppStatusAC} from "../../app/AppReducer";
import {AppThunk} from "../../app/store";
import {errorUtils} from "../../common/utils/errorUtils";
import {profileAPI} from "../profile/profileAPI";
import {handleServerNetworkError} from "../../common/utils/errorUtils";

const initialState = {
    data: {
        _id: '',
        email: '',
        name: '',
        avatar: '' as string | undefined,
        publicCardPacksCount: null as null | number,
        created: 1 as Date | number,
        updated: 1 as Date | number,
        isAdmin: false,
        verified: false,
        rememberMe: false,
        error: '' as string | undefined
    },
    isLoggedIn: false,
    isSignedUp: false
}
//типы ответов храним тут или в файле api?
// export type ResponseDataType = {
//     _id: string
//     email: string
//     name: string
//     avatar?: string
//     publicCardPacksCount: number | null
//     created: Date
//     updated: Date
//     isAdmin: boolean
//     verified: boolean
//     rememberMe: boolean
//     error?: string
// }
export type InitialStateType = typeof initialState

export const authReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'login/SET-IS-LOGGED-IN':
            return {...state, isLoggedIn: action.isLoggedIn}
        case 'login/SET-LOGIN-DATA':
            return {...state, ...action.data}
        case "SET_NAME":
            return {...state, data: {...action.data, avatar: undefined, error: undefined}}
        /*case "CHANGE-NAME":
            return {...state, data.name:action.}*/
        case 'login/SET-IS-SIGNED-UP':
            return {...state, isSignedUp: action.isSignedUp}
        default:
            return state
    }
}

export const setAuthAC = (isLoggedIn: boolean) =>
    ({type: 'login/SET-IS-LOGGED-IN', isLoggedIn} as const)
export const setLoginAC = (data: ResponseDataType) => ({type: 'login/SET-LOGIN-DATA', data} as const)
export const setSignedUpAC = (isSignedUp: boolean) => ({type: 'login/SET-IS-SIGNED-UP', isSignedUp} as const)

export const setNameAC = (data: ResponseDataType) => ({type: 'SET_NAME', data} as const)
export const ChangeNameAC = (name: string) => ({type: "CHANGE-NAME", name} as const)

// thunks
export const loginTC = (data: LoginParamsType) => (dispatch: Dispatch<ActionsType>) => {
    authAPI.login(data)
        .then(res => {
            if (res) {
                console.log(res.data)
                dispatch(setLoginAC(res.data))

                dispatch(setAuthAC(true))
            }
        })
        .catch((e) => {
            const error = e.response
                ? e.response.data.error
                : (e.message + ', more details in the console');
            console.log('Error', {...e})
        })

}

//если промис резолвится, то приходит <AxiosResponse<T>>res.<T>data... . Если rejected то приходит <AxiosError<T>>err
//.<AxiosResponse<T>>response.<T>data
export const signUpTC = (email: string, password: string): AppThunk<ActionsType | AppActionsType> => (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    authAPI.signUp(email, password)
        .then(res => {
            console.log(res)
            dispatch(setSignedUpAC(true))
            console.log(res)
        })
        .catch(err => {
            errorUtils(err, dispatch)
            console.log(err)
        })
        .finally(() => {
            dispatch(setAppStatusAC('succeeded'))
        })
}
//Получение данных
export const getDataTC = () => (dispatch: Dispatch<ActionsType>) => {
    authAPI.getData()
        .then((res) => {
            console.log(res)
            dispatch(setNameAC(res.data))
        })
        .catch((e: any) => {
            handleServerNetworkError(e.response, dispatch)
        })
        .finally(/*dispatch(setAppStatusAC('succeeded'))*/)
}
/* try {

     const result = await profileAPI.getData()
     console.log(result)
     dispatch(setNameAC(result.data))

 } catch (e:any) {
     handleServerNetworkError(e.response, dispatch)
 }finally {
     /!*dispatch(setAppStatusAC('succeeded'))*!/
 }
}*/

//Изменение nickName
export const ChangeNameTC = (name: string) => async (dispatch: Dispatch<ActionsType>) => {

    try {
        const result = await profileAPI.changeName(name)
        console.log(result)
        dispatch(ChangeNameAC(result.data))

    } catch (e: any) {
        handleServerNetworkError(e.response, dispatch)
    } finally {
        /*dispatch(setAppStatusAC('succeeded'))*/
    }
}

// types
type ChangeNameType = ReturnType<typeof ChangeNameAC>
type setNameACType = ReturnType<typeof setNameAC>
type ActionsType = ReturnType<typeof setAuthAC>
    | ReturnType<typeof setLoginAC>
    | ReturnType<typeof setSignedUpAC>
    | ChangeNameType
    | setNameACType




