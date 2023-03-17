import React, {useState} from "react";
import {setCardsSearchByAnswerAC} from "../actions";
import {useAppDispatch} from "../../../../app/store";
import {SuperDebouncedInput} from "../../../../common/components/SuperDebouncedInput/SuperDebouncedInput";
import s from "../../Packs/components/noFilters/NoFilters.module.css";
import filterIcon from "../../../images/Group 1496.png";

type SearchByCardsNamePropsType={
    handleSearchAnswer:(value: string)=>void
}
export const SearchAnswer = (props:SearchByCardsNamePropsType) => {
    const [value, setValue] = useState('')
    const dispatch = useAppDispatch()

    const handleDeleteFilter = () => {
        dispatch(setCardsSearchByAnswerAC(''))
        setValue('')
    }
    const handleOnChangeText = (value: string) => {
        setValue(value)
    }
    return (
        <div>
            <SuperDebouncedInput
                value={value}
                onChangeText={handleOnChangeText}
                onDebouncedChange={props.handleSearchAnswer}
                placeholder={'Provide your text'}
            />
            <div className={s.iconsFilter}>
                <img alt={'icon'} src={filterIcon} className={'icon'} onClick={handleDeleteFilter}/>
            </div>
        </div>
    )
}

