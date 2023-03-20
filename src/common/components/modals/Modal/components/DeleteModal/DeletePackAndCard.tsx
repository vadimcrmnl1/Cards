import React from 'react'

import { Button } from '@material-ui/core'

import { MainModal } from '../../MainModal'

type DeletePackAndCardType = {
  type: 'pack' | 'card'
  handleDelete: () => void
}

export const DeletePackAndCard: React.FC<DeletePackAndCardType> = ({ type, handleDelete }) => {
  return (
    <MainModal
      title={type === 'pack' ? 'Delete pack' : 'Delete card'}
      table={type === 'pack' ? 'pack' : 'card'}
    >
      <div>
        <p>Do you really want to remove Pack name?</p>
        <p>All cards will be deleted. </p>
        <Button
          color={'secondary'}
          fullWidth
          style={{
            marginTop: '20px',
            borderRadius: '20px',
          }}
          variant={'contained'}
          onClick={handleDelete}
        >
          Delete
        </Button>
      </div>
    </MainModal>
  )
}
