import axios, {AxiosResponse} from "axios";

export const instance = axios.create({
    baseURL: process.env.NODE_ENV === 'development' ? 'http://localhost:7542/2.0/' : 'https://neko-back.herokuapp.com/2.0/',
    withCredentials: true
})

export const authAPI = {
    login(data: LoginParamsType) {
        return instance.post<ResponseDataType>('auth/login', data)
    },
    logout() {
        return instance.delete<ResetPassResponseType>('auth/me')
    },
    signUp(email: string, password: string) {
        return instance.post<{ error?: string }>('auth/register', {email, password})
    },
    getData() {
        return instance.post<ResponseDataType>('auth/me')
    },
    changeName(name: string) {

        return instance.put('auth/me', {name})
    },
    me() {
        return instance.post('auth/me', {})
    },
    forgotPass(email: string, from: string, message: string) {
        return instance.post<ResetPassResponseType>('auth/forgot', {
            email,
            from,
            message
        }, {withCredentials: true})
    },
    resetPass(password: string, resetPasswordToken: string) {
        return instance.post<ResetPassResponseType>('auth/set-new-password', {
            password,
            resetPasswordToken
        }, {withCredentials: true})
    }
}
export const packsAPI = {
    getPacks(data: PacksRequestDataType) {
        return instance.get<PacksResponseDataType>('cards/pack')
    },
    addPack(data: AddPackRequestDataType) {
        return instance.post<AddPackResponseDataType>('cards/pack', data)
    },
    deletePack(id: string) {
        return instance.delete<AxiosResponse>('cards/pack')
    },
    updatePack(data: UpdatePackRequestDataType) {
        return instance.put<AxiosResponse>('cards/pack')
    }
}
export const cardsAPI = {
    getCards(data: CardsRequestDataType) {
        return instance.get<CardsResponseDataType>('cards/card')
    },
    addCard(data: AddCardRequestType) {
        return instance.post<AxiosResponse>('cards/card', data)
    },
    deleteCard(id: string) {
        return instance.delete<AxiosResponse>('cards/card')
    },
    updateCard(data: UpdateCardRequestDataType) {
        return instance.put<AxiosResponse>('cards/card', data)
    }
}
export type LoginParamsType = {
    email: string
    password: string
    rememberMe: boolean
}
export type ResponseDataType = {
    _id: string;
    email: string;
    name: string;
    avatar?: string | null;
    publicCardPacksCount: number;
    created: Date;
    updated: Date;
    isAdmin: boolean;
    verified: boolean;
    rememberMe: boolean;
    error?: string;
}
type ResetPassResponseType = {
    info: string, error: string
}

export type PacksRequestDataType = {
    packName?: string
    min?: number
    max?: number
    sortPacks?: string
    page?: number
    pageCount?: number
    userId?: string
    block?: boolean
}
export type PacksResponseDataType = {
    cardPacks: [
        {
            _id: string
            user_id: string
            name: string
            cardsCount: number
            create: Date
            updated: Date
        }
    ]
    cardPacksTotalCount: number
    maxCardsCount: number
    minCardsCount: number
    page: number
    pageCount: number
}
export type AddPackRequestDataType = {
    cardsPack: {
        name: string
        deckCover: string
        private: boolean
    }
}
export type AddPackResponseDataType = {
    newCardsPack: {}
}
export type UpdatePackRequestDataType = {
    cardsPack: {
        _id: string
        name: string
    }
}

export type CardsRequestDataType = {
    cardAnswer?: string
    cardQuestion?: string
    cardsPack_id?: string
    min?: number
    max?: number
    sortCards?: string
    page?: number
    pageCount?: number
}
export type CardsResponseDataType = {
    cards: [
        {
            answer: string
            question: string
            cardsPack_id: string
            grade: number
            shots: number
            user_id: string
            created: Date
            updated: Date
            _id: string
        }
    ]
    cardsTotalCount: number
    maxGrade: number
    minGrade: number
    page: number
    pageCount: number
    packUserId: string
}
export type AddCardRequestType = {
    card: {
        cardsPack_id: string
        question: string
        answer: string
        grade?: number
        shots?: number
        answerImg?: string
        questionImg?: string
        questionVideo?: string
        answerVideo?: string
    }
}
export type UpdateCardRequestDataType = {
    card: {
        _id: string
        question?: string
    }
}