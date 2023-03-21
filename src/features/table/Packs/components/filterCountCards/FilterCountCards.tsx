import Slider from '@mui/material/Slider'

import { useAppSelector } from '../../../../../app/store'
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

  return (
    <div className={s.wrapper}>
      <div>Number of cards</div>
      <div className={s.sliderBlock}>
        <span>{minCards}</span>
        <Slider
          getAriaLabel={() => 'Temperature range'}
          value={[minCards, maxCards === 0 ? maxCardsCount : maxCards]}
          onChangeCommitted={props.handleChange}
          valueLabelDisplay="auto"
          step={1}
          min={minCardsCount}
          max={maxCardsCount}
          className={styleMU.slider}
        />
        <span>{maxCards === 0 ? maxCardsCount : maxCards}</span>
      </div>
    </div>
  )
}
