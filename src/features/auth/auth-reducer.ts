
const initialState = {
    isAuth: false
}

export type InitialStateType = typeof initialState

export const authReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'IS_AUTH':
            return {...state, isAuth: action.value}
        default:
            return state
    }
}

export const setAuthAC = (value: boolean) =>
    ({type: 'IS_AUTH', value} as const)

// thunks

// types
type ActionsType = ReturnType<typeof setAuthAC>
