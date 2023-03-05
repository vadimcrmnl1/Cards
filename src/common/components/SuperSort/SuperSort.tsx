import React from 'react'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import UnfoldMoreIcon from '@material-ui/icons/UnfoldMore';

// добавить в проект иконки и импортировать
const downIcon = <ArrowDropDownIcon/>
const upIcon = <ArrowDropUpIcon/>
const noneIcon = <UnfoldMoreIcon/>

export type SuperSortPropsType = {
    id?: string
    sort: string
    value: string
    onChange: (newSort: string) => void
}

export const pureChange = (sort: string, down: string, up: string) => {
    return sort === '' ? down : sort === down ? up : sort === up ? '' : down
    // if (sort === '') {
    //     return up
    // }
    // if (sort === down) {
    //     return ''
    // }
    // if (sort === up) {
    //     return down
    // }
    // if (sort !== down && sort !== up) {
    //     return up
    // }
    // return ''

}

const SuperSort: React.FC<SuperSortPropsType> = (
    {
        sort, value, onChange, id = 'hw15',
    }
) => {
    const up = '0' + value // по возрастанию
    const down = '1' + value // по убыванию

    const onChangeCallback = () => {

        onChange(pureChange(sort, down, up))
    }

    const icon = sort === down
        ? downIcon
        : sort === up
            ? upIcon
            : noneIcon

    return (
        <span
            id={id + '-sort-' + value}
            onClick={onChangeCallback}
        >
            {/*сделать иконку*/}
            {/*<img*/}
            {/*    id={id + '-icon-' + sort}*/}
            {/*    src={icon}*/}
            {/*/>*/}

            {icon} {/*а это убрать*/}
        </span>
    )
}

export default SuperSort
