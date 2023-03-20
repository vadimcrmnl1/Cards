import * as React from 'react'
import { ReactNode } from 'react'

import CloseIcon from '@mui/icons-material/Close'
import { Backdrop, Fade, IconButton } from '@mui/material'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Modal from '@mui/material/Modal'

import { useStyles } from '../../../../features/styleMU/styleMU'
import { EditIcon } from '../../../../features/table/common/icons/EditIcon'
import { TrashIcon } from '../../../../features/table/common/icons/TrashIcon'

import s from './MainModal.module.css'

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
  type?: 'create' | 'edit' | 'createCard' | 'editCard'
  table?: 'pack' | 'card'
  children?: ReactNode
  title?: string
  titleButton?: string
}

export const MainModal: React.FC<MainModalPropsType> = ({
  children,
  title,
  titleButton,
  type,
  table,
}) => {
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const styleMU = useStyles()
  const packsButtons =
    type === 'create' ? (
      <Button className={styleMU.button} onClick={handleOpen} variant={'contained'}>
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

  return (
    <div>
      {table === 'pack' ? packsButtons : cardsButtons}

      <Modal
        open={open}
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
        <Fade in={open}>
          <Box sx={style}>
            <div className={s.headerBlock}>
              <h3>{title}</h3>
              <IconButton size={'small'} onClick={handleClose}>
                <CloseIcon />
              </IconButton>
            </div>
            <hr style={{ opacity: '0.5' }} />
            {children}
          </Box>
        </Fade>
      </Modal>
    </div>
  )
}
