import React, {useState} from "react";
import {setCardsSearchByAnswerAC} from "../actions";
import {useAppDispatch} from "../../../../app/store";
import {SuperDebouncedInput} from "../../../../common/components/SuperDebouncedInput/SuperDebouncedInput";
import s from "../../Packs/components/noFilters/NoFilters.module.css";
import filterIcon from "../../../images/Group 1496.png";

export const SearchByCardsName = () => {
    const [value, setValue] = useState('')
    const dispatch = useAppDispatch()
    const handleSendQuery = (value: string) => {
        dispatch(setCardsSearchByAnswerAC(value))
    }
    const handleOnChangeText = (value: string) => {
        setValue(value)
    }
    const handleDeleteFilter = () => {
        dispatch(setCardsSearchByAnswerAC(''))
        setValue('')
    }

    return (
        <div>
            <SuperDebouncedInput
                value={value}
                onChangeText={handleOnChangeText}
                onDebouncedChange={handleSendQuery}
                placeholder={'Provide your text'}
            />
            <div className={s.iconsFilter}>
                <img alt={'icon'} src={filterIcon} className={'icon'} onClick={handleDeleteFilter}/>
            </div>
        </div>
    )
}

