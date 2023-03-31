import React, { ChangeEvent, useEffect, useState } from 'react'

import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import { IconButton } from '@mui/material'

import { useAppDispatch } from '../../../../../app/store'
import defaultImage from '../../../../../common/images/defaultImage.png'
import { setCardsAddAnswerImageAC, setCardsAddQuestionImageAC } from '../../actions'

import s from './InputImageFile.module.css'

type InputImageFileType = {
  type?: 'answer' | 'question'
  cardQuestionImg?: string
  cardAnswerImg?: string
  action?: 'createCard' | 'editCard'
  formatAnswer?: 'Text' | 'Image'
  formatQuestion?: 'Text' | 'Image'
}

export const InputTypeFile: React.FC<InputImageFileType> = ({
  type,
  cardAnswerImg,
  cardQuestionImg,
  action,
  formatQuestion,
  formatAnswer,
}) => {
  const dispatch = useAppDispatch()
  const [question, setQuestion] = useState(defaultImage)
  const [answer, setAnswer] = useState(defaultImage)
  const [isImageBroken, setIsImageBroken] = useState(false)

  useEffect(() => {
    if (action === 'editCard') {
      if (formatQuestion === 'Image' && cardQuestionImg !== '') {
        setQuestion(cardQuestionImg as string)
      }
      if (formatAnswer === 'Image') {
        setAnswer(cardAnswerImg as string)
      }
      setQuestion(defaultImage)
    }

    // if (action === 'createCard') {
    //   setQuestion(defaultImage)
    //   setAnswer(defaultImage)
    // }
  }, [cardAnswerImg, cardQuestionImg, formatQuestion, formatAnswer])

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
      }
      // if (
      //   file.size < 4000000 &&
      //   type === 'answer' &&
      //   action === 'editCard' &&
      //   answer !== cardAnswerImg
      // ) {
      //   convertFileToBase64(file, (file64: string) => {
      //     setAnswer(file64)
      //     dispatch(setCardsAddAnswerImageAC(file64))
      //   })
      // }
      else {
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
  const imageInputField =
    // eslint-disable-next-line no-nested-ternary
    action === 'editCard' && type === 'question' && formatQuestion === 'Image'
      ? question
      : // eslint-disable-next-line no-nested-ternary
      action === 'editCard' && type === 'question'
      ? defaultImage
      : // eslint-disable-next-line no-nested-ternary
      action === 'createCard' && type === 'question'
      ? defaultImage // eslint-disable-next-line no-nested-ternary
      : action === 'createCard' && type === 'answer'
      ? defaultImage // action === 'editCard' && type === 'answer'
      : // ? cardAnswerImg
      // : // eslint-disable-next-line no-nested-ternary
      // eslint-disable-next-line no-nested-ternary
      action === 'editCard' && type === 'answer' && formatAnswer === 'Image'
      ? answer
      : action === 'editCard' && type === 'answer'
      ? defaultImage
      : defaultImage

  // action === 'createCard' && type === 'question'
  // ? question
  // : action === 'createCard' && type === 'answer'
  // ? answer
  // : defaultImage

  /* eslint-disable-next-line no-nested-ternary */
  return (
    <div className={s.container}>
      <label>
        <input type="file" onChange={uploadHandler} style={{ display: 'none' }} />
        <img
          src={imageInputField}
          // src={
          //   // eslint-disable-next-line no-nested-ternary
          //   isImageBroken ? defaultImage : type === 'question' ? question : answer
          // }
          style={{ width: '100px' }}
          onError={errorHandler}
          alt="ava"
        />
      </label>
    </div>
  )
}
