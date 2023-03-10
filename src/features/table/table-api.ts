import {AxiosResponse} from "axios";
import {instance} from "../../api/api";


export const packsAPI = {
    getPacks(data: PacksRequestDataType) {
        return instance.get<PacksResponseDataType>('cards/pack', {params: data})
    },
    addPack(data: AddPackRequestDataType) {
        return instance.post<AddPackResponseDataType>('cards/pack', data)
    },
    deletePack(id: string) {
        return instance.delete<AxiosResponse>(`cards/pack?id=${id}`)
    },
    updatePack(data: UpdatePackRequestDataType) {
        return instance.put<AxiosResponse>('cards/pack', data)
    }
}
export const cardsAPI = {
    getCards(params: CardsRequestDataType) {
        return instance.get<CardsResponseDataType>('cards/card', {params})
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
    cardPacks: CardPacksType[]
    cardPacksTotalCount: number
    maxCardsCount: number
    minCardsCount: number
    page: number
    pageCount: number
}
export type CardPacksType = {
    _id: string
    user_id: string
    name: string
    cardsCount: number
    created: string
    updated: string
    user_name: string
}
export type AddPackRequestDataType = {
    cardsPack: {
        name: string
        deckCover?: string
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
    cards: CardsType[]
    cardsTotalCount: number
    maxGrade: number
    minGrade: number
    page: number
    pageCount: number
    packUserId: string
}
export type CardsType = {
    answer: string
    question: string
    cardsPack_id: string
    grade: number
    shots: number
    user_id: string
    created: string
    updated: string
    _id: string
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