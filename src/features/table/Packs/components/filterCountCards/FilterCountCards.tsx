import { useEffect, useState } from 'react'

import Slider from '@mui/material/Slider'

import { useAppDispatch, useAppSelector } from '../../../../../app/store'
import useDebounce from '../../../../../common/utils/debounceUtils'
import { useStyles } from '../../../../styleMU/styleMU'
import { setMinMaxCardsAC } from '../../actions'
import {
  selectMaxCardsCount,
  selectMinCardsCount,
  selectPacksMaxCards,
  selectPacksMinCards,
} from '../../selectors'

import s from './FilterCountCards.module.css'

type FilterCountCardsPropsType = {
  handleChange: (event: any, newValue: number | number[]) => void
  value: number[]
}
export const FilterCountCards = (props: FilterCountCardsPropsType) => {
  const styleMU = useStyles()
  const minCardsCount = useAppSelector(selectMinCardsCount)
  const maxCardsCount = useAppSelector(selectMaxCardsCount)
  const minCards = useAppSelector(selectPacksMinCards)
  const maxCards = useAppSelector(selectPacksMaxCards)
  const [value, setValue] = useState<number | number[]>(props.value)
  const debouncedValue = useDebounce<number | number[]>(value, 500)

  console.log(props.value)
  useEffect(() => {
    setValue(debouncedValue)
    props.handleChange(null, debouncedValue)
  }, [debouncedValue])

  const handleChangeCountCards = (event: any, newValue: number | number[]) => {
    setValue(newValue)
  }

  return (
    <div className={s.wrapper}>
      <div>Number of cards</div>
      <div className={s.sliderBlock}>
        <span>{minCards ? minCards : 0}</span>
        <Slider
          getAriaLabel={() => 'Count of cards'}
          value={value}
          onChange={handleChangeCountCards}
          // onChangeCommitted={props.handleChange}
          valueLabelDisplay="auto"
          step={1}
          min={minCardsCount}
          max={maxCardsCount}
          className={styleMU.slider}
        />
        <span>{maxCards === null ? maxCardsCount : maxCards}</span>
      </div>
    </div>
  )
}
