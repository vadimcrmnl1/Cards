import {Button} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../../../app/store";
import {getPacksTC, setMyPacksTC} from "../packs-reducer";
import {selectorMyID} from "../selectors";

export const SortComponent=()=>{
    const dispatch = useAppDispatch()
    const myID = useAppSelector(selectorMyID)
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