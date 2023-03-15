import React, {useEffect, useState} from "react";
import {setCardsSearchByAnswerAC} from "../actions";
import {useAppDispatch} from "../../../../app/store";
import {SuperDebouncedInput} from "../../../../common/components/SuperDebouncedInput/SuperDebouncedInput";

export const SearchByCardsName = () => {
   // const packName = useAppSelector(selectPacksName) as string
    const [value, setValue] = useState('')
    const dispatch = useAppDispatch()
    const handleSendQuery = (value: string) => {
        dispatch(setCardsSearchByAnswerAC(value))
    }
    const handleOnChangeText = (value: string) => {
        setValue(value)
    }

  /*  useEffect(() => {
        setValue('')
    }, [packName === ''])*/
    return (
        <div>
            <SuperDebouncedInput
                value={value}
                onChangeText={handleOnChangeText}
                onDebouncedChange={handleSendQuery}
                placeholder={'Provide your text'}
            />
        </div>
    )
}

