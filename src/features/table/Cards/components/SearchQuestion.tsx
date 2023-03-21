import React, { useState } from 'react'

import { useAppDispatch } from '../../../../app/store'
import { SuperDebouncedInput } from '../../../../common/components/SuperDebouncedInput/SuperDebouncedInput'
import { setCardsSearchByQuestionAC } from '../actions'

import iconClose from './../../../images/close.png'
import s from './SearchQuestion.module.css'

type SearchQuestionPropsType = {
  handleSearchQuestion: (value: string) => void
}
export const SearchQuestion = (props: SearchQuestionPropsType) => {
  const [value, setValue] = useState('')
  const dispatch = useAppDispatch()

  const handleDeleteFilter = () => {
    dispatch(setCardsSearchByQuestionAC(''))
    setValue('')
  }
  const handleOnChangeText = (value: string) => {
    setValue(value)
  }

  return (
    <div className={s.searchQuestionBlock}>
      <SuperDebouncedInput
        value={value}
        onChangeText={handleOnChangeText}
        onDebouncedChange={props.handleSearchQuestion}
        placeholder={'Provide your text'}
      />
      <div className={s.iconsFilter}>
        <img src={iconClose} alt={iconClose} className={s.iconClose} />
      </div>
    </div>
  )
}
