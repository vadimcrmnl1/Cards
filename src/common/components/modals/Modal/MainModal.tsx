import * as React from 'react'
import { ReactNode, useEffect } from 'react'

import CloseIcon from '@mui/icons-material/Close'
import { Backdrop, Fade, IconButton } from '@mui/material'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Modal from '@mui/material/Modal'

import { useAppDispatch, useAppSelector } from '../../../../app/store'
import { useStyles } from '../../../../features/styleMU/styleMU'
import { getCardsTC } from '../../../../features/table/Cards/cards-reducer'
import { EditIcon } from '../../../../features/table/common/icons/EditIcon'
import { TrashIcon } from '../../../../features/table/common/icons/TrashIcon'
import { getPacksTC } from '../../../../features/table/Packs/packs-reducer'

import {
  modalAddCardIsOpenAC,
  modalAddPackIsOpenAC,
  modalDeleteCardIsOpenAC,
  modalDeletePackIsOpenAC,
  modalEditCardIsOpen,
  modalEditPackIsOpenAC,
} from './actions'
import s from './MainModal.module.css'
import {
  selectAddCardModal,
  selectAddPackModal,
  selectDeleteCardModal,
  selectDeletePackModal,
  selectEditCardModal,
  selectEditPackModal,
} from './selectors'

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  minHeight: 280,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
}

type MainModalPropsType = {
  type?: 'create' | 'edit' | 'createCard' | 'editCard' | 'deletePack' | 'deleteCard'
  table?: 'pack' | 'card'
  children?: ReactNode
  title?: string
  titleButton?: string
}

export const MainModal: React.FC<MainModalPropsType> = React.memo(
  ({ children, table, title, titleButton, type }) => {
    const addPack = useAppSelector(selectAddPackModal)
    const addCard = useAppSelector(selectAddCardModal)
    const editPack = useAppSelector(selectEditPackModal)
    const editCard = useAppSelector(selectEditCardModal)
    const deletePack = useAppSelector(selectDeletePackModal)
    const deleteCard = useAppSelector(selectDeleteCardModal)

    console.log('MAIN MODAL')
    const dispatch = useAppDispatch()

    // useEffect(() => {
    //   dispatch(getCardsTC())
    //   dispatch(getPacksTC())
    // }, [addPack, addCard, editCard, editPack, deleteCard, deletePack])
    // const [open, setOpen] = React.useState(false)
    const handleOpen = () => {
      console.log('HANDLE OPEN')
      if (type === 'create') {
        dispatch(modalAddPackIsOpenAC(true))
      }
      if (type === 'createCard') {
        dispatch(modalAddCardIsOpenAC(true))
      }
      if (type === 'edit') {
        dispatch(modalEditPackIsOpenAC(true))
      }
      if (type === 'editCard') {
        dispatch(modalEditCardIsOpen(true))
      }
      if (type === 'deletePack') {
        dispatch(modalDeletePackIsOpenAC(true))
      }
      if (type === 'deleteCard') {
        dispatch(modalDeleteCardIsOpenAC(true))
      }
    }
    const handleClose = () => {
      if (type === 'create') {
        dispatch(modalAddPackIsOpenAC(false))
      } else if (type === 'createCard') {
        dispatch(modalAddCardIsOpenAC(false))
      } else if (type === 'edit') {
        dispatch(modalEditPackIsOpenAC(false))
      } else if (type === 'editCard') {
        dispatch(modalEditCardIsOpen(false))
      } else if (type === 'deletePack') {
        dispatch(modalDeletePackIsOpenAC(false))
      } else if (type === 'deleteCard') {
        dispatch(modalDeleteCardIsOpenAC(false))
      }
    }
    const styleMU = useStyles()
    const packsButtons =
      type === 'create' ? (
        <Button
          disableFocusRipple={true}
          className={styleMU.button}
          onClick={handleOpen}
          variant={'contained'}
        >
          {titleButton}
        </Button>
      ) : (
        <button onClick={handleOpen}>{type === 'edit' ? <EditIcon /> : <TrashIcon />}</button>
      )
    const cardsButtons =
      type === 'createCard' ? (
        <Button className={styleMU.button} onClick={handleOpen} variant={'contained'}>
          {titleButton}
        </Button>
      ) : (
        <button onClick={handleOpen}>{type === 'editCard' ? <EditIcon /> : <TrashIcon />}</button>
      )
    const openModal =
      // eslint-disable-next-line no-nested-ternary
      type === 'create'
        ? addPack
        : // eslint-disable-next-line no-nested-ternary
        type === 'edit'
        ? editPack
        : // eslint-disable-next-line no-nested-ternary
        type === 'createCard'
        ? addCard
        : // eslint-disable-next-line no-nested-ternary
        type === 'editCard'
        ? editCard
        : type === 'deletePack'
        ? deletePack
        : deleteCard

    return (
      <div>
        {table === 'pack' ? packsButtons : cardsButtons}

        <Modal
          open={openModal}
          onClose={handleClose}
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          closeAfterTransition
          slots={{ backdrop: Backdrop }}
          slotProps={{
            backdrop: {
              timeout: 500,
            },
          }}
        >
          <Fade in={openModal}>
            <Box sx={style}>
              <div className={s.headerBlock}>
                <h3>{title}</h3>
                <IconButton size={'small'} onClick={handleClose}>
                  <CloseIcon />
                </IconButton>
              </div>
              <hr style={{ opacity: '0.5' }} />
              <div>{children}</div>
            </Box>
          </Fade>
        </Modal>
      </div>
    )
  }
)
