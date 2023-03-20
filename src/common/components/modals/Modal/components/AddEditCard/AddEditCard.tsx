import React from 'react'

import { Button } from '@material-ui/core'
import { MenuItem, SelectChangeEvent } from '@mui/material'
import Select from '@mui/material/Select'
import TextField from '@mui/material/TextField'
import { useFormik } from 'formik'
import * as yup from 'yup'

import { useAppDispatch, useAppSelector } from '../../../../../../app/store'
import { addCardTC, updateCardTC } from '../../../../../../features/table/Cards/cards-reducer'
import { selectCardsPackId } from '../../../../../../features/table/Cards/selectors'
import { MainModal } from '../../MainModal'

const validationSchema = yup.object({
  question: yup.string().required('Question is required'),
  answer: yup.string().required('Answer is required'),
})

type AddEditCardType = {
  type: 'createCard' | 'editCard'
  title?: string
  titleButton?: string
  cardsPackId?: string
  itemId?: string
}

export const AddEditCardModal: React.FC<AddEditCardType> = ({
  type,
  itemId,
  titleButton,
  title,
  cardsPackId,
}) => {
  const dispatch = useAppDispatch()
  const packId = useAppSelector(selectCardsPackId)
  const [format, setFormat] = React.useState<'Text' | 'Image'>('Text')

  const formik = useFormik({
    initialValues: {
      question: '',
      answer: '',
    },
    validationSchema: validationSchema,
    onSubmit: values => {
      type === 'createCard'
        ? dispatch(addCardTC({ card: { cardsPack_id: packId, ...values } }))
        : dispatch(updateCardTC({ card: { _id: itemId, ...values } }))
      formik.resetForm()
    },
  })
  const handleChange = (event: SelectChangeEvent) => {
    // @ts-ignore
    setFormat(event.target.value as string)
  }

  return (
    <MainModal
      title={type === 'createCard' ? 'Create new card' : 'Edit card'}
      titleButton={'Add new card'}
      type={type === 'createCard' ? 'createCard' : 'editCard'}
    >
      <form onSubmit={formik.handleSubmit}>
        <Select
          fullWidth
          labelId="format"
          id="format"
          value={format}
          label="Choose a question format"
          onChange={handleChange}
        >
          <MenuItem value={'Text'}>Text</MenuItem>
          <MenuItem value={'Image'}>Image</MenuItem>
        </Select>
        <TextField
          fullWidth
          style={{ marginTop: '10px' }}
          variant={'standard'}
          id={'question'}
          name={'question'}
          label={'Question'}
          value={formik.values.question}
          onChange={formik.handleChange}
          error={formik.touched.question && Boolean(formik.errors.question)}
          helperText={formik.touched.question && formik.errors.question}
        />
        <TextField
          fullWidth
          style={{ marginTop: '10px' }}
          variant={'standard'}
          id={'answer'}
          name={'answer'}
          label={'Answer'}
          value={formik.values.answer}
          onChange={formik.handleChange}
          error={formik.touched.answer && Boolean(formik.errors.answer)}
          helperText={formik.touched.answer && formik.errors.answer}
        />
        <Button
          color={'primary'}
          fullWidth
          style={{
            marginTop: '20px',
            borderRadius: '20px',
          }}
          variant={'contained'}
          type={'submit'}
        >
          {type === 'createCard' ? 'Add' : 'Save'}
        </Button>
      </form>
    </MainModal>
  )
}
