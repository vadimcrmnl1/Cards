import React from 'react'

import { Backdrop, CircularProgress } from '@mui/material'

import { setAppIsLoadingAC } from '../../../app/actions'
import { selectIsAppMakeRequest } from '../../../app/selectors'
import { useAppDispatch, useAppSelector } from '../../../app/store'

export const SimpleBackdrop = () => {
  console.log('BACKDROP')
  const isLoading = useAppSelector(selectIsAppMakeRequest)
  const dispatch = useAppDispatch()

  const handleClose = () => {
    dispatch(setAppIsLoadingAC(false))
  }

  return (
    <div>
      <Backdrop
        sx={{ color: '#fff', zIndex: theme => theme.zIndex.drawer + 1 }}
        // onClick={handleClose}
        open={isLoading}
      >
        <CircularProgress color={'inherit'} />
      </Backdrop>
    </div>
  )
}
