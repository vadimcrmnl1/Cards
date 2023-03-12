import {AxiosResponse} from "axios";
import { instance } from "../../api/api";


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