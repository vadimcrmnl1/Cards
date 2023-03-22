import React from 'react'

import { Button } from '@material-ui/core'

import { setAppIsLoadingAC } from '../../../../../../app/actions'
import { useAppDispatch } from '../../../../../../app/store'
import { deleteCardTC } from '../../../../../../features/table/Cards/cards-reducer'
import { deletePackTC } from '../../../../../../features/table/Packs/packs-reducer'
import { modalDeleteCardIsOpenAC, modalDeletePackIsOpenAC } from '../../actions'
import { MainModal } from '../../MainModal'

type DeletePackAndCardType = {
  type: 'deletePack' | 'deleteCard'
  // handleDelete: () => void
  packName?: string
  cardQuestion?: string
  itemId: string
}

export const DeletePackAndCard: React.FC<DeletePackAndCardType> = ({
  type,
  // handleDelete,
  packName,
  cardQuestion,
  itemId,
}) => {
  const dispatch = useAppDispatch()
  const handleDeletePackOrCard = () => {
    if (type === 'deletePack') {
      dispatch(deletePackTC(itemId))
      dispatch(modalDeletePackIsOpenAC(false))
      dispatch(setAppIsLoadingAC(true))
    } else if (type === 'deleteCard') {
      dispatch(deleteCardTC(itemId))
      dispatch(modalDeleteCardIsOpenAC(false))
      dispatch(setAppIsLoadingAC(true))
    }
  }

  console.log('DELETE MODAL')

  return (
    <MainModal
      title={type === 'deletePack' ? 'Delete pack' : 'Delete card'}
      type={type === 'deletePack' ? 'deletePack' : 'deleteCard'}
    >
      <div>
        <p>Do you really want to remove {type === 'deletePack' ? packName : cardQuestion}?</p>
        <p>{type === 'deletePack' ? 'All cards will be deleted.' : 'Card will be deleted.'} </p>
        <Button
          color={'secondary'}
          fullWidth
          style={{
            marginTop: '20px',
            borderRadius: '20px',
          }}
          variant={'contained'}
          onClick={handleDeletePackOrCard}
        >
          Delete
        </Button>
      </div>
    </MainModal>
  )
}
