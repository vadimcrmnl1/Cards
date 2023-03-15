import {Button} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../../../../app/store";
import {getPacksTC} from "../../packs-reducer";
import {selectMyID} from "../../../../profile/selectors";
import {setMyPacksAC} from "../../actions";


export const SortComponent=()=>{
    const dispatch = useAppDispatch()
    const myID = useAppSelector(selectMyID)
    console.log(myID)
    const handleSortByMyPacks=()=>{
        debugger
        dispatch(setMyPacksAC(myID))
    }
    const handleSortByAllPacks=()=>{
        dispatch(setMyPacksAC(''))
    }
  return(
      <div>
          <Button variant="contained"
                   onClick={handleSortByMyPacks}>My</Button>
          <Button variant="contained"
                  onClick={handleSortByAllPacks}>All</Button>
      </div>
  )
}