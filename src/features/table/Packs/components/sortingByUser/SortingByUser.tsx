import {Button} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../../../../app/store";
import { selectUserId} from "../../../../profile/selectors";
import {setMyPacksAC} from "../../actions";
import {selectIsAppMakeRequest} from "../../../../../app/selectors";


export const SortComponent = () => {
    const dispatch = useAppDispatch()
    const myID = useAppSelector(selectUserId)
    const isAppMakeRequest = useAppSelector(selectIsAppMakeRequest)

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
                    disabled={isAppMakeRequest}>My</Button>
            <Button variant="contained"
                    onClick={handleSortByAllPacks}
                    disabled={isAppMakeRequest}>All</Button>
        </div>
    )
}