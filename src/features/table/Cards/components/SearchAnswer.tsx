import React, {useState} from "react";
import {setCardsSearchByAnswerAC} from "../actions";
import {useAppDispatch} from "../../../../app/store";
import {SuperDebouncedInput} from "../../../../common/components/SuperDebouncedInput/SuperDebouncedInput";
import s from "./SearchAnswer.module.css";
import close from "../../../images/close.png";

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
        <div className={s.searchAnswerBlock}>
            <SuperDebouncedInput
                value={value}
                onChangeText={handleOnChangeText}
                onDebouncedChange={props.handleSearchAnswer}
                placeholder={'Provide your text'}
            />
            <div className={s.iconsFilter}>
                <img alt={'icon'} src={close} className={s.iconClose} onClick={handleDeleteFilter}/>
            </div>
        </div>
    )
}

