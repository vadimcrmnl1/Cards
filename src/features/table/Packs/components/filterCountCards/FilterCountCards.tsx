import { useEffect, useState } from 'react'

import Slider from '@mui/material/Slider'

import { useAppSelector } from '../../../../../app/store'
import useDebounce from '../../../../../common/hooks/useDebounce'
import { selectUserId } from '../../../../profile/selectors'
import { useStyles } from '../../../../styleMU/styleMU'
import {
  selectMaxCardsCount,
  selectMinCardsCount,
  selectPacksMaxCards,
  selectPacksMinCards,
} from '../../selectors'

import s from './FilterCountCards.module.css'

type FilterCountCardsPropsType = {
  handleChange: (event: any, newValue: number | number[]) => void
}
export const FilterCountCards = (props: FilterCountCardsPropsType) => {
  const styleMU = useStyles()
  const minCardsCount = useAppSelector(selectMinCardsCount)
  const maxCardsCount = useAppSelector(selectMaxCardsCount)
  const minCards = useAppSelector(selectPacksMinCards)
  const maxCards = useAppSelector(selectPacksMaxCards)
  const [value, setValue] = useState<number | number[]>([0, 0])
  const debouncedValue = useDebounce<number | number[]>(value, 500)
  const [isRangeTouched, setIsRangeTouched] = useState(false)
  const myID = useAppSelector(selectUserId)

  useEffect(() => {
    if (myID) {
      setIsRangeTouched(false)
    }
    if (isRangeTouched) {
      props.handleChange(null, debouncedValue)
    }
    // setValue(debouncedValue)
  }, [debouncedValue, myID])
  useEffect(() => {
    //when max value from server got set to range
    setValue([minCardsCount, maxCardsCount])
  }, [minCardsCount, maxCardsCount])
  useEffect(() => {
    //when click clear filters reset range
    if (minCards === minCardsCount && maxCards === maxCardsCount) {
      setValue([minCards, maxCards])
    }
  }, [maxCards])
  const handleChange = (event: any, newValue: number | number[], activeThumb: number) => {
    if (activeThumb >= 0) {
      setIsRangeTouched(true)
    }
    setValue(newValue as number[])
  }

  return (
    <div className={s.wrapper}>
      <div>Number of cards</div>
      <div className={s.sliderBlock}>
        <span>{minCardsCount}</span>
        <Slider
          getAriaLabel={() => 'Count of cards'}
          value={value}
          onChange={handleChange}
          // onChangeCommitted={props.handleChange}
          valueLabelDisplay="auto"
          step={1}
          min={minCardsCount}
          max={maxCardsCount}
          className={styleMU.slider}
        />
        <span>{maxCardsCount}</span>
      </div>
    </div>
  )
}
