import * as React from "react";
import s from './SortCell.module.css'
import { useAppSelector} from "../../../../../app/store";
import SortIcon from '@mui/icons-material/Sort';
import FilterListIcon from '@mui/icons-material/FilterList';
import {selectAppStatus} from "../../../../../app/selectors";

type SortCellPropsType = {
    label: string
    sorter: string
    sort: string | null
    toggleSort: (sort: string | null) => void
}
export const SortCell: React.FC<SortCellPropsType> = ({label, sorter, sort, toggleSort}) => {
    let appStatus = useAppSelector(selectAppStatus)


    const handleClick = () => {
        if (sort === null) {
            sort = 1 + sorter
        } else if (sort[0] === '1') {
            sort = 0 + sorter
        } else {
            sort = null
        }
        toggleSort(sort)
    }
    const icon = sort !== null && sort.slice(1) === sorter
        ? sort === '1' + sorter
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