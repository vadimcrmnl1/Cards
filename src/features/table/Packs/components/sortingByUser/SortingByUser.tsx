import {Button} from "@mui/material";
import {useStyles} from "../../../../styleMU/styleMU";
import s from './SortingByUser.module.css'

type SortingByUserPropsType={
    handleSortByMyPacks:()=>void
    handleSortByAllPacks:()=>void
    disabled: boolean
}
export const SortingByUser = (props:SortingByUserPropsType) => {
    const style=useStyles()

    return (
        <div className={s.wrapper}>
            <div>Show packs cards</div>
            <div>
                <Button variant="contained"
                        onClick={props.handleSortByMyPacks}
                        disabled={props.disabled}
                        className={style.buttonSave}>My</Button>
                <Button variant="contained"
                        onClick={props.handleSortByAllPacks}
                        disabled={!props.disabled}
                        className={style.buttonSave}>All</Button>
            </div>
        </div>
    )
}