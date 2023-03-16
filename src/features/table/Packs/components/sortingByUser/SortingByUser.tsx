import {Button} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../../../../app/store";
import { selectUserId} from "../../../../profile/selectors";
import {setMyPacksAC} from "../../actions";
import {selectPacksLoadingStatus} from "../../selectors";


export const SortComponent = () => {
    const dispatch = useAppDispatch()
    const myID = useAppSelector(selectUserId)
    const packsLoadingStatus = useAppSelector(selectPacksLoadingStatus)
    const handleSortByMyPacks = () => {
        dispatch(setMyPacksAC(myID))
    }
    const handleSortByAllPacks = () => {
        dispatch(setMyPacksAC(''))
    }
    return (
        <div>
            <Button variant="contained"
                    onClick={handleSortByMyPacks}
                    disabled={packsLoadingStatus}>My</Button>
            <Button variant="contained"
                    onClick={handleSortByAllPacks}
                    disabled={packsLoadingStatus}>All</Button>
        </div>
    )
}