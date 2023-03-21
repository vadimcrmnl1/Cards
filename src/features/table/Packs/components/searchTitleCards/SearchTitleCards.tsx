import React, { useEffect, useState } from 'react'

import { useAppSelector } from '../../../../../app/store'
import { SuperDebouncedInput } from '../../../../../common/components/SuperDebouncedInput/SuperDebouncedInput'
import { selectPacksName } from '../../selectors'

type SearchTitleCardsPropsType = {
  handleSendQuery: (value: string) => void
}
export const SearchTitleCards = (props: SearchTitleCardsPropsType) => {
  const packName = useAppSelector(selectPacksName) as string
  const [value, setValue] = useState('')
  const handleOnChangeText = (value: string) => {
    setValue(value)
  }

  // useEffect(() => {
  //     setValue('')
  // }, [packName === ''])
  useEffect(() => {
    setValue(packName as string)
  }, [packName])

  return (
    <div>
      <SuperDebouncedInput
        value={value}
        onChangeText={handleOnChangeText}
        onDebouncedChange={props.handleSendQuery}
        placeholder={'Provide your text'}
      />
    </div>
  )
}
