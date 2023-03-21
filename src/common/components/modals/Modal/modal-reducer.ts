import { ModalActionsType } from './types'

const modalInitialState = {
  addCardIsOpen: false,
  addPackIsOpen: false,
  editPackIsOpen: false,
  editCardIsOpen: false,
  deletePackIsOpen: false,
  deleteCardIsOpen: false,
}

export type ModalInitialState = typeof modalInitialState

export const modalReducer = (
  state: ModalInitialState = modalInitialState,
  action: ModalActionsType
): ModalInitialState => {
  switch (action.type) {
    case 'MODAL/ADD_PACK_IS_OPEN':
      return { ...state, addPackIsOpen: action.payload.addPackIsOpen }
    case 'MODAL/ADD_CARD_IS_OPEN':
      return { ...state, addCardIsOpen: action.payload.addCardIsOpen }
    case 'MODAL/EDIT_PACK_IS_OPEN':
      return { ...state, editPackIsOpen: action.payload.editPackIsOpen }
    case 'MODAL/EDIT_CARD_IS_OPEN':
      return { ...state, editCardIsOpen: action.payload.editCardIsOpen }
    case 'MODAL/DELETE_PACK_IS_OPEN':
      return { ...state, deletePackIsOpen: action.payload.deletePackIsOpen }
    case 'MODAL/DELETE_CARD_IS_OPEN':
      return { ...state, deleteCardIsOpen: action.payload.deleteCardIsOpen }
    default:
      return state
  }
}
