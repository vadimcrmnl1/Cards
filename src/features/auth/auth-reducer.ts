import {authAPI, LoginParamsType} from "../../api/cards-api";
import {Dispatch} from "redux";
import {profileAPI} from "../profile/profileAPI";
import {handleServerNetworkError} from "../../common/utils/errorUtils";
import {setAppStatusAC} from "../../app/AppReducer";

const initialState = {
    data: {
        _id: '',
        email: '',
        name: '',
        avatar: '',
        publicCardPacksCount: null,
        created: Date,
        updated: Date,
        isAdmin: false,
        verified: false,
        rememberMe: false,
        error: ''
    },
    isLoggedIn: false
}
export type ResponseDataType = {
    _id: string
    email: string
    name: string
    avatar?: string
    publicCardPacksCount: number | null
    created: Date
    updated: Date
    isAdmin: boolean
    verified: boolean
    rememberMe: boolean
    error?: string
}
export type InitialStateType = typeof initialState

export const authReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'login/SET-IS-LOGGED-IN':
            return {...state, isLoggedIn: action.isLoggedIn}
        case 'login/SET-LOGIN-DATA':
            return {...state, ...action.data}
        /*case "SET_NAME":
            return {...state, ...action.data, isLoggedIn: true}*/
        /*case "CHANGE-NAME":
            return {...state, data.name:action.}*/
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
    debugger
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
export const signUpTC = (email: string, password: string) => (dispatch: Dispatch<ActionsType>) => {
    debugger
    authAPI.signUp(email, password)
        .then(res => {
            console.log(res)


        })
        .catch(err=> {
            console.log(err)
        })
}
//Получение данных
export const getDataTC = () => (dispatch: Dispatch<ActionsType>) => {
   debugger
    authAPI.getData().then((res)=>{
        console.log(res)
        dispatch(setNameAC(res.data))
    }).catch((e:any)=>{
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
export const ChangeNameTC = (name:string) => async (dispatch: Dispatch<ActionsType>) => {

    try {
        const result = await profileAPI.changeName(name)
        console.log(result)
        dispatch(ChangeNameAC(result.data))

    } catch (e:any) {
        handleServerNetworkError(e.response, dispatch)
    }finally {
        /*dispatch(setAppStatusAC('succeeded'))*/
    }
}

// types
type ChangeNameType=ReturnType<typeof ChangeNameAC>
type setNameACType=ReturnType<typeof setNameAC>
type ActionsType = ReturnType<typeof setAuthAC>
                 | ReturnType<typeof setLoginAC>
                  | ChangeNameType
                 | setNameACType

