import * as React from "react";
import s from './SortCell.module.css'
import SortIcon from '@mui/icons-material/Sort';
import FilterListIcon from '@mui/icons-material/FilterList';
import {useAppDispatch, useAppSelector} from "../../../../app/store";
import {selectIsAppMakeRequest} from "../../../../app/selectors";
import {setPacksSortAC} from "../../Packs/actions";
import {setCardsSortAC} from "../../Cards/actions";
import {useSearchParams} from "react-router-dom";

type SortCellPropsType = {
    label: string
    sorter: string
    sort: string | null
    packs?: boolean
}
export const SortCell: React.FC<SortCellPropsType> = ({label, sorter, sort,  packs}) => {

    const dispatch = useAppDispatch()

    const isAppMakeRequest = useAppSelector(selectIsAppMakeRequest)
    const [searchParams, setSearchParams] = useSearchParams()

    const handleClick = () => {
        if (sort === null) {
            sort = 1 + sorter
        } else if (sort[0] === '1') {
            sort = 0 + sorter
        } else {
            sort = null
        }
        if (packs) {
            dispatch(setPacksSortAC(sort))
            if (sort !== null) {
                setSearchParams({...Object.fromEntries(searchParams), sortPacks: sort})
            } else {
                searchParams.delete('sortPacks')
                setSearchParams({...Object.fromEntries(searchParams)})
            }
        } else {
            dispatch(setCardsSortAC(sort))
            if (sort !== null) {
                setSearchParams({...Object.fromEntries(searchParams), sortCards: sort})
            } else {
                searchParams.delete('sortCards')
                setSearchParams({...Object.fromEntries(searchParams)})
            }
        }
    }

    const icon = sort !== null && sort.slice(1) === sorter
        ? sort === '1' + sorter
            ? <FilterListIcon style={{rotate: '180deg'}}/>
            : <FilterListIcon/>
        : <SortIcon style={{opacity: '0.3'}}/>

    return (<div className={s.wrapper}>
            <p> {label}</p>
            <button onClick={handleClick}
                    disabled={isAppMakeRequest}
            >
                {icon}
            </button>
        </div>
    )
}