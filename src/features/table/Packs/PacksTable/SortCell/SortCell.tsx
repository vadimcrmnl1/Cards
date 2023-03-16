import * as React from "react";
import s from './SortCell.module.css'
import {useAppDispatch, useAppSelector} from "../../../../../app/store";
import SortIcon from '@mui/icons-material/Sort';
import FilterListIcon from '@mui/icons-material/FilterList';
import {selectAppStatus} from "../../../../../app/selectors";
import {selectPacksPage, selectPacksPageCount, selectPacksSort} from "../../selectors";
import {getPacksTC} from "../../packs-reducer";

type SortCellPropsType = {
    label: string
    sorter: string
    toggleSort: (sort: string) => void
}
export const SortCell: React.FC<SortCellPropsType> = ({label, sorter, toggleSort}) => {

    const dispatch = useAppDispatch()

    let appStatus = useAppSelector(selectAppStatus)
    let sortPacks = useAppSelector(selectPacksSort)
    const page = useAppSelector(selectPacksPage)
    const pageCount = useAppSelector(selectPacksPageCount)

    const handleClick = () => {
        if (sortPacks === 'off') {
            sortPacks = 1 + sorter
        } else if (sortPacks[0] === '1') {
            sortPacks = 0 + sorter
        } else {
            sortPacks = 'off'
        }
        dispatch(getPacksTC(undefined, undefined, sortPacks))
        // toggleSort(sortPacks)
    }
    const icon = sortPacks !== 'off' && sortPacks.slice(1) === sorter
        ? sortPacks === '1' + sorter
            ? <FilterListIcon style={{rotate: '180deg'}}/>
            : <FilterListIcon/>
        : <SortIcon style={{opacity: '0.3'}}/>

    return (<div className={s.wrapper}>
            <p> {label}</p>
            <button
                disabled={appStatus === 'loading'}
                onClick={handleClick}
            >
                {icon}
            </button>
        </div>
    )
}