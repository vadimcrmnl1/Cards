import React, {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../../../../app/store";
import {SuperDebouncedInput} from "../../../../../common/components/SuperDebouncedInput/SuperDebouncedInput";
import {setPackNameAC} from "../../actions";
import {selectPacksName} from "../../selectors";

type SearchTitleCardsPropsType={
    handleSendQuery:(value: string)=>void
}
export const SearchTitleCards = (props:SearchTitleCardsPropsType) => {
    const packName = useAppSelector(selectPacksName) as string
    const [value, setValue] = useState('')
    //const dispatch = useAppDispatch()
   /* const handleSearchTitleCards = (value: string) => {
        dispatch(setPackNameAC(value))
    }*/
    const handleOnChangeText = (value: string) => {
        setValue(value)
    }

    // useEffect(() => {
    //     setValue('')
    // }, [packName === ''])
    return (
        <div>
            <SuperDebouncedInput
                value={value}
                onChangeText={handleOnChangeText}
                onDebouncedChange={props.handleSendQuery}
                placeholder={'Provide your text'}
            />
        </div>
    )
}

