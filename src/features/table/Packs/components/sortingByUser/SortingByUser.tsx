import {Button} from "@mui/material";
import {useStyles} from "../../../../styleMU/styleMU";

type SortingByUserPropsType={
    handleSortByMyPacks:()=>void
    handleSortByAllPacks:()=>void
}
export const SortComponent = (props:SortingByUserPropsType) => {
    const style=useStyles()
    //const packsLoadingStatus = useAppSelector(selectPacksLoadingStatus)
    return (
        <div>
            <Button variant="contained"
                    onClick={props.handleSortByMyPacks}
                    //disabled={packsLoadingStatus}
                    className={style.buttonSave}>My</Button>
            <Button variant="contained"
                    onClick={props.handleSortByAllPacks}
                    //disabled={packsLoadingStatus}
                    className={style.buttonSave}>All</Button>
        </div>
    )
}