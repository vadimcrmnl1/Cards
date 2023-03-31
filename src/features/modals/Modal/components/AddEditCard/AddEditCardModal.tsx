import React, { useEffect } from 'react'

import { Button } from '@material-ui/core'
import BackspaceSharpIcon from '@mui/icons-material/BackspaceSharp'
import DisabledByDefaultIcon from '@mui/icons-material/DisabledByDefault'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import {
  InputAdornment,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material'
import TextField from '@mui/material/TextField'
import { useFormik } from 'formik'
import * as yup from 'yup'

import { setAppIsLoadingAC } from '../../../../../app/actions'
import { useAppDispatch, useAppSelector } from '../../../../../app/store'
import { ImageInput } from '../../../../../common/components/ImageInput/ImageInput'
import { useStyles } from '../../../../styleMU/styleMU'
import {
  setCardsAddAnswerImageAC,
  setCardsAddQuestionImageAC,
} from '../../../../table/Cards/actions'
import { addCardTC, updateCardTC } from '../../../../table/Cards/cards-reducer'
import { InputTypeFile } from '../../../../table/Cards/components/InputImageFile/InputImageFile'
import {
  selectCardsAnswerImage,
  selectCardsPackId,
  selectCardsQuestionImage,
} from '../../../../table/Cards/selectors'
import { isActiveModalAC, modalAddCardIsOpenAC, modalEditCardIsOpen } from '../../actions'
import { MainModal } from '../../MainModal'
import s from '../../MainModal.module.css'

const validationSchema = yup.object({
  // question: yup.string().required('Question is required'),
  // answer: yup.string().required('Answer is required'),
})

type AddEditCardType = {
  type: 'createCard' | 'editCard'
  title?: string
  titleButton?: string
  cardsPackId?: string | undefined
  cardAnswer?: string | undefined
  cardQuestion?: string | undefined
  cardId?: string
  cardAnswerImg?: string
  cardQuestionImg?: string
}

export const AddEditCardModal: React.FC<AddEditCardType> = ({
  type,
  cardAnswer,
  cardQuestion,
  cardId,
  cardAnswerImg,
  cardQuestionImg,
}) => {
  const dispatch = useAppDispatch()
  const packId = useAppSelector(selectCardsPackId)
  const qImg = useAppSelector(selectCardsQuestionImage)
  const aImg = useAppSelector(selectCardsAnswerImage)
  let [formatQuestion, setFormatQuestion] = React.useState<'Text' | 'Image'>('Text')
  let [formatAnswer, setFormatAnswer] = React.useState<'Text' | 'Image'>('Text')

  const styleMU = useStyles()
  let focusQuestion = false

  useEffect(() => {
    dispatch(isActiveModalAC(false))
    // setFormatAnswer('Text')
    // setFormatQuestion('Text')
    if (cardQuestionImg !== '' && type === 'editCard') {
      setFormatQuestion('Image')
    }
    if (cardAnswerImg !== '' && type === 'editCard') {
      setFormatAnswer('Image')
    }
  }, [cardAnswer, cardQuestion, cardId, qImg, aImg])
  const formik = useFormik({
    initialValues: {
      question: type === 'createCard' ? '' : cardQuestion,
      answer: type === 'createCard' ? '' : cardAnswer,
      questionImg: type === 'createCard' && formatQuestion === 'Image' ? cardQuestionImg : '',
      answerImg: type === 'createCard' && formatAnswer === 'Image' ? cardAnswerImg : '',
    },
    validationSchema: validationSchema,
    onSubmit: values => {
      type === 'createCard'
        ? dispatch(
            addCardTC({
              card: { cardsPack_id: packId, ...values, answerImg: aImg, questionImg: qImg },
            })
          )
        : dispatch(
            updateCardTC({ card: { _id: cardId, ...values, answerImg: aImg, questionImg: qImg } })
          )
      formik.resetForm()
      dispatch(modalAddCardIsOpenAC(false))
      dispatch(modalEditCardIsOpen(false))
      dispatch(setAppIsLoadingAC(true))
      dispatch(setCardsAddQuestionImageAC(''))
      dispatch(setCardsAddAnswerImageAC(''))
      setFormatQuestion('Text')
      setFormatAnswer('Text')
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
  const handleResetQuestion = () => {
    focusQuestion = true
    formik.resetForm({
      values: { answer: formik.values.answer, question: '', answerImg: '', questionImg: '' },
    })
  }
  const handleResetAnswer = () => {
    formik.resetForm({
      values: { answer: '', question: formik.values.question, answerImg: '', questionImg: '' },
    })
  }

  return (
    <MainModal
      title={type === 'createCard' ? 'Create new card' : 'Edit card'}
      titleButton={'Add new card'}
      type={type === 'createCard' ? 'createCard' : 'editCard'}
      cardId={cardId}
      cardQuestion={cardQuestion}
      cardAnswer={cardAnswer}
    >
      <form onSubmit={formik.handleSubmit}>
        <div className={s.addEditForm}>
          <p>Choose a question format</p>
          <Select
            className={styleMU.selectForm}
            id="select"
            value={formatQuestion}
            defaultValue={formatQuestion}
            onChange={handleQuestionChange}
            variant={'outlined'}
          >
            <MenuItem className={styleMU.menuItem} value={'Text'}>
              Text
            </MenuItem>
            <MenuItem className={styleMU.menuItem} value={'Image'}>
              Image
            </MenuItem>
          </Select>
        </div>
        <div>
          <p className={s.description}>Question:</p>
        </div>
        {formatQuestion === 'Text' ? (
          <TextField
            fullWidth
            variant={'standard'}
            id={'question'}
            name={'question'}
            autoFocus={focusQuestion}
            InputProps={{
              endAdornment: (
                <span className={s.clearInputButton} onClick={handleResetQuestion}>
                  <BackspaceSharpIcon />
                </span>
              ),
            }}
            placeholder={'Question'}
            value={formik.values.question}
            onChange={formik.handleChange}
            error={formik.touched.question && Boolean(formik.errors.question)}
            helperText={formik.touched.question && formik.errors.question}
          />
        ) : (
          <div className={s.imageBlock}>
            <InputTypeFile
              formatQuestion={formatQuestion}
              action={type}
              type={'question'}
              cardQuestionImg={cardQuestionImg}
            />
          </div>
        )}
        <div className={s.addEditForm}>
          <p>Choose a answer format</p>
          <Select
            className={styleMU.selectForm}
            id="select"
            value={formatAnswer}
            onChange={handleAnswerChange}
            variant={'outlined'}
          >
            <MenuItem className={styleMU.menuItem} value={'Text'}>
              Text
            </MenuItem>
            <MenuItem className={styleMU.menuItem} value={'Image'}>
              Image
            </MenuItem>
          </Select>
        </div>
        <div>
          <p className={s.description}>Answer:</p>
        </div>
        {formatAnswer === 'Text' ? (
          <TextField
            fullWidth
            variant={'standard'}
            id={'answer'}
            name={'answer'}
            placeholder={'Answer'}
            value={formik.values.answer}
            InputProps={{
              endAdornment: (
                <span className={s.clearInputButton} onClick={handleResetAnswer}>
                  <BackspaceSharpIcon />
                </span>
              ),
            }}
            onChange={formik.handleChange}
            error={formik.touched.answer && Boolean(formik.errors.answer)}
            helperText={formik.touched.answer && formik.errors.answer}
          />
        ) : (
          <div className={s.imageBlock}>
            <InputTypeFile
              formatAnswer={formatAnswer}
              action={type}
              type={'answer'}
              cardAnswerImg={cardAnswerImg}
            />
          </div>
        )}
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
