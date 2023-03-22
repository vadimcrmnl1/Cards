import { AppRootStateType } from '../../../../app/store'

export const selectAddCardModal = (state: AppRootStateType) => state.modals.addCardIsOpen
export const selectAddPackModal = (state: AppRootStateType) => state.modals.addPackIsOpen
export const selectEditPackModal = (state: AppRootStateType) => state.modals.editPackIsOpen
export const selectEditCardModal = (state: AppRootStateType) => state.modals.editCardIsOpen
export const selectDeletePackModal = (state: AppRootStateType) => state.modals.deletePackIsOpen
export const selectDeleteCardModal = (state: AppRootStateType) => state.modals.deleteCardIsOpen
