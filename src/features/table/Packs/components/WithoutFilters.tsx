import filterIcon from '../../../images/Group 1496.png'
import s from './WithoutFilter.module.css'
import {useAppDispatch} from "../../../../app/store";
import {getPacksTC} from "../packs-reducer";

export const WithoutFilters = ()=>{
    const dispatch = useAppDispatch()
    const handleDeleteAllFilters=()=>{
        dispatch(getPacksTC())
    }
    return(
        <div className={s.iconsFilter}>
            <img alt={'icon'} src={filterIcon} className={'icon'} onClick={handleDeleteAllFilters}/>
        </div>
    )
}