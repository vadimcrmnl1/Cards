import {Button} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../../../app/store";
import {getPacksTC, setMyPacksTC} from "../packs-reducer";
import {selectMyID} from "../../../profile/selectors";


export const SortComponent=()=>{
    const dispatch = useAppDispatch()
    const myID = useAppSelector(selectMyID)
    const handleSortByMyPacks=()=>{
        dispatch(setMyPacksTC(myID))
    }
    const handleSortByAllPacks=()=>{
        dispatch(getPacksTC())
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