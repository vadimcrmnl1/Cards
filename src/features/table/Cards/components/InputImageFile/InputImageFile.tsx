import React, { ChangeEvent, useEffect, useState } from 'react'

import BackspaceSharpIcon from '@mui/icons-material/BackspaceSharp'

import { useAppDispatch, useAppSelector } from '../../../../../app/store'
import defaultImage from '../../../../../common/images/defaultImage.png'
import { setCardsAddAnswerImageAC, setCardsAddQuestionImageAC } from '../../actions'
import { selectCardsAnswerImage, selectCardsQuestionImage } from '../../selectors'

import s from './InputImageFile.module.css'

type InputImageFileType = {
  image?: string
  type?: 'answer' | 'question'
  action?: 'createCard' | 'editCard'
}

export const InputTypeFile: React.FC<InputImageFileType> = ({ image, type, action }) => {
  const dispatch = useAppDispatch()
  const cardQuestionImg = useAppSelector(selectCardsQuestionImage)
  const cardAnswerImg = useAppSelector(selectCardsAnswerImage)
  const [question, setQuestion] = useState(defaultImage)
  const [answer, setAnswer] = useState(defaultImage)
  const [isImageBroken, setIsImageBroken] = useState(false)

  useEffect(() => {}, [dispatch, cardQuestionImg, cardAnswerImg, image, answer, question])

  const uploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length) {
      const file = e.target.files[0]

      if (file.size < 4000000 && type === 'question') {
        convertFileToBase64(file, (file64: string) => {
          setQuestion(file64)
          dispatch(setCardsAddQuestionImageAC(file64))
        })
      }
      if (file.size < 4000000 && type === 'answer') {
        convertFileToBase64(file, (file64: string) => {
          setAnswer(file64)
          dispatch(setCardsAddAnswerImageAC(file64))
        })
      } else {
        console.error('Error: ', 'Файл слишком большого размера')
      }
    }
  }

  const convertFileToBase64 = (file: File, callBack: (value: string) => void) => {
    const reader = new FileReader()

    reader.onloadend = () => {
      const file64 = reader.result as string

      callBack(file64)
    }
    reader.readAsDataURL(file)
  }

  const errorHandler = () => {
    setIsImageBroken(true)
    alert('Кривая картинка')
  }

  let imageInputField

  if (!image) {
    if (type === 'question') {
      imageInputField = question
    }
    if (type === 'answer') {
      imageInputField = answer
    }
  }
  if (image && action === 'createCard') {
    if (type === 'question' && image !== question && question !== defaultImage) {
      imageInputField = question
    } else if (type === 'answer' && image !== answer && answer !== defaultImage) {
      imageInputField = answer
    } else {
      imageInputField = image
    }
  }
  if (image && action === 'editCard') {
    if (type === 'question' && image !== question && question !== defaultImage) {
      imageInputField = question
    } else if (type === 'answer' && image !== answer && answer !== defaultImage) {
      imageInputField = answer
    } else {
      imageInputField = image
    }
  }

  const handleResetImage = () => {
    if (type === 'question') {
      dispatch(setCardsAddQuestionImageAC(''))
      setQuestion(defaultImage)
      imageInputField = question
    }
    if (type === 'answer') {
      dispatch(setCardsAddAnswerImageAC(''))
      setAnswer(defaultImage)
    }
  }

  return (
    <div className={s.block}>
      <div className={s.container}>
        <label>
          <input type="file" onChange={uploadHandler} style={{ display: 'none' }} />
          <img src={imageInputField} style={{ width: '100px' }} onError={errorHandler} alt="ava" />
        </label>
      </div>
      <span className={s.clearInputButton} onClick={handleResetImage}>
        <BackspaceSharpIcon />
      </span>
    </div>
  )
}
