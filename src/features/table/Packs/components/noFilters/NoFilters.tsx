import filterIcon from '../../../../images/Group 1496.png'
import s from './NoFilters.module.css'
import {useAppDispatch, useAppSelector} from "../../../../../app/store";
import {setMinMaxCardsAC, setMyPacksAC, setPackNameAC} from "../../actions";
import {selectMaxCardsCount} from "../../selectors";

type NoFiltersPropsType={
    handleDeleteAllFilters:()=>void
}
export const NoFilters = (props:NoFiltersPropsType)=>{

    const dispatch = useAppDispatch()
    const maxCountCards=useAppSelector(selectMaxCardsCount)

   /* const handleDeleteAllFilters=()=>{
        dispatch(setPackNameAC(''))
        dispatch(setMyPacksAC(''))
        dispatch(setMinMaxCardsAC(0,maxCountCards))
    }*/
    return(
        <div className={s.iconsFilter}>
            <img alt={'icon'}
                 src={filterIcon}
                 onClick={props.handleDeleteAllFilters}/>
        </div>
    )
}