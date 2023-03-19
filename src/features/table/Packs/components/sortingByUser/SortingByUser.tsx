import { Button } from '@mui/material'

import { useAppSelector } from '../../../../../app/store'
import { useStyles } from '../../../../styleMU/styleMU'
import { selectPacksUserId } from '../../selectors'

import s from './SortingByUser.module.css'

type SortingByUserPropsType = {
  handleSortByMyPacks: () => void
  handleSortByAllPacks: () => void
  // disabled: boolean
  packsUser_id: string | null
}
export const SortingByUser = (props: SortingByUserPropsType) => {
  const style = useStyles()
  // const packsUser_id = useAppSelector(selectPacksUserId)

  return (
    <div className={s.wrapper}>
      <div>Show packs cards</div>
      <div>
        <Button
          variant="contained"
          onClick={props.handleSortByMyPacks}
          disabled={!!props.packsUser_id}
          className={style.buttonSave}
        >
          My
        </Button>
        <Button
          variant="contained"
          onClick={props.handleSortByAllPacks}
          disabled={!props.packsUser_id}
          className={style.buttonSave}
        >
          All
        </Button>
      </div>
    </div>
  )
}
