import React, { useEffect } from 'react'

import { Button } from '@material-ui/core'
import { MenuItem, Select, SelectChangeEvent } from '@mui/material'
import TextField from '@mui/material/TextField'
import { useFormik } from 'formik'
import * as yup from 'yup'

import { setAppIsLoadingAC } from '../../../../../../app/actions'
import { useAppDispatch, useAppSelector } from '../../../../../../app/store'
import {
  addCardTC,
  getCardsTC,
  updateCardTC,
} from '../../../../../../features/table/Cards/cards-reducer'
import { selectCardsPackId } from '../../../../../../features/table/Cards/selectors'
import { modalAddCardIsOpenAC, modalEditCardIsOpen } from '../../actions'
import { MainModal } from '../../MainModal'

import s from './../../MainModal.module.css'

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
  cardAnswer?: string
  cardQuestion?: string
}

export const AddEditCardModal: React.FC<AddEditCardType> = ({
  type,
  itemId,
  titleButton,
  title,
  cardsPackId,
  cardAnswer,
  cardQuestion,
}) => {
  const dispatch = useAppDispatch()
  const packId = useAppSelector(selectCardsPackId)
  const [formatQuestion, setFormatQuestion] = React.useState('Text')
  const [formatAnswer, setFormatAnswer] = React.useState('Text')

  useEffect(() => {}, [cardAnswer, cardQuestion])
  const formik = useFormik({
    initialValues: {
      question: type === 'createCard' ? '' : cardQuestion,
      answer: type === 'createCard' ? '' : cardAnswer,
    },
    validationSchema: validationSchema,
    onSubmit: values => {
      type === 'createCard'
        ? dispatch(addCardTC({ card: { cardsPack_id: packId, ...values } }))
        : dispatch(updateCardTC({ card: { _id: itemId, ...values } }))
      formik.resetForm()
      dispatch(modalAddCardIsOpenAC(false))
      dispatch(modalEditCardIsOpen(false))
      dispatch(setAppIsLoadingAC(true))
    },
  })
  const handleQuestionChange = (event: SelectChangeEvent) => {
    // @ts-ignore
    setFormatQuestion(event.target.value as string)
  }
  const handleAnswerChange = (event: SelectChangeEvent) => {
    // @ts-ignore
    setFormatAnswer(event.target.value as string)
  }

  return (
    <MainModal
      title={type === 'createCard' ? 'Create new card' : 'Edit card'}
      titleButton={'Add new card'}
      type={type === 'createCard' ? 'createCard' : 'editCard'}
    >
      <form onSubmit={formik.handleSubmit}>
        <div className={s.addEditForm}>
          <p>Choose a question format</p>
          <Select
            style={{ margin: '10px', backgroundColor: 'white' }}
            id="select"
            // defaultValue={formatQuestion}
            value={formatQuestion}
            onChange={handleQuestionChange}
            variant={'outlined'}
          >
            <MenuItem value={'Text'} dense={true}>
              Text
            </MenuItem>
            <MenuItem value={'Image'} dense={true}>
              Image
            </MenuItem>
          </Select>
        </div>

        <TextField
          fullWidth
          variant={'standard'}
          id={'question'}
          name={'question'}
          label={'Question'}
          value={formik.values.question}
          onChange={formik.handleChange}
          error={formik.touched.question && Boolean(formik.errors.question)}
          helperText={formik.touched.question && formik.errors.question}
        />
        <div className={s.addEditForm}>
          <p>Choose a question format</p>
          <Select
            style={{ margin: '10px', backgroundColor: 'white' }}
            id="select"
            defaultValue={formatAnswer}
            value={formatAnswer}
            onChange={handleAnswerChange}
            variant={'outlined'}
          >
            <MenuItem value={'Text'} dense={true}>
              Text
            </MenuItem>
            <MenuItem value={'Image'} dense={true}>
              Image
            </MenuItem>
          </Select>
        </div>
        <TextField
          fullWidth
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
