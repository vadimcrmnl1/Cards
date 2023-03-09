import {authAPI, LoginParamsType} from "../../api/cards-api";
import {Dispatch} from "redux";
import {handleServerNetworkError} from "../../common/utils/errorUtils";
import {setAppStatusAC} from "../../app/AppReducer";

const initialState = {
    data: {
        _id: '',
        email: '',
        name: '',
        avatar: '' as String | null,
        publicCardPacksCount: null as null | number,
        created: 1 as Date | number,
        updated: 1 as Date | number,
        isAdmin: false,
        verified: false,
        rememberMe: false,
        error: '' as String | undefined
    },
    isLoggedIn: false
}
export type ResponseDataType = {
    _id: string
    email: string
    name: string
    avatar?: string | null
    publicCardPacksCount: number | null
    created: Date | number
    updated: Date | number
    isAdmin: boolean
    verified: boolean
    rememberMe: boolean
    error?: string| undefined
}
//export type InitialStateType = typeof initialState

export const authReducer = (state = initialState, action: ActionsType) => {
    switch (action.type) {
        case 'login/SET-IS-LOGGED-IN':
            return {...state, isLoggedIn: action.isLoggedIn}
        case 'login/SET-LOGIN-DATA':
            return {...state, ...action.data}
        case "SET_NAME":
            return {...state, data: {...state.data, ...action.data}}
        case "CHANGE-NAME":
            return {...state, data: {...state.data, name: action.name}}
        default:
            return state
    }
}

export const setAuthAC = (isLoggedIn: boolean) =>
    ({type: 'login/SET-IS-LOGGED-IN', isLoggedIn} as const)
export const setLoginAC = (data: ResponseDataType) => ({type: 'login/SET-LOGIN-DATA', data} as const)
export const setNameAC = (data: ResponseDataType) => ({type: 'SET_NAME', data} as const)
export const ChangeNameAC=(name:string)=> ({type: "CHANGE-NAME", name} as const)

// thunks
export const loginTC = (data: LoginParamsType) => (dispatch: Dispatch<ActionsType>) => {

    authAPI.login(data)
        .then(res => {
            if (res) {
                console.log(res.data)
               dispatch(setNameAC(res.data))
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
export const signUpTC = (email: string, password: string) => (dispatch: Dispatch<ActionsType>) => {
       authAPI.signUp(email, password)
        .then(res => {
            dispatch(setNameAC(res.data))
            console.log(res)
        })
        .catch(err=> {
            console.log(err)
        })
}

export const LogoutTC=()=>(dispatch:Dispatch<ActionsType>)=>{
    authAPI.logout().then((res)=>{
        dispatch(setAuthAC(false))
    }).catch((e:any)=>{
        handleServerNetworkError(e.response, dispatch)
    })
     }

//Получение данных
export const getDataTC = () => (dispatch: Dispatch<ActionsType>) => {

    authAPI.getData().then((res)=>{
        console.log(res)
        dispatch(setNameAC(res.data))
    }).catch((e:any)=>{
        console.log(e)
        handleServerNetworkError(e.response, dispatch)
    }).finally(/*dispatch(setAppStatusAC('succeeded'))*/)
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
export const ChangeNameTC = (name:string) => (dispatch: Dispatch<ActionsType>) => {

    authAPI.changeName(name).then((res)=>{
            console.log(res.data.updatedUser.name)
            dispatch(ChangeNameAC(res.data.updatedUser.name))

        }).catch((e:any)=>{
            console.log(e.response.data.error)
           handleServerNetworkError(e.response, dispatch)
        })
}

// types
type ChangeNameType=ReturnType<typeof ChangeNameAC>
type setNameACType=ReturnType<typeof setNameAC>
type ActionsType = ReturnType<typeof setAuthAC>
                 | ReturnType<typeof setLoginAC>
                  | ChangeNameType
                 | setNameACType

