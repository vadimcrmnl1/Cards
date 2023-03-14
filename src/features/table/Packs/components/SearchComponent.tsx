import React, {useEffect, useState} from "react";
import {useSearchParams} from "react-router-dom";
import {useAppDispatch} from "../../../../app/store";
import {SuperDebouncedInput} from "../../../../common/components/SuperDebouncedInput/SuperDebouncedInput";
import {setPacksTitleTC} from "../packs-reducer";


export const SearchComponent=()=>{
    const [find, setFind] = useState('')
    const [searchParams, setSearchParams] = useSearchParams()
    const dispatch = useAppDispatch()

    const sendQuery = (value: string)=> {
         dispatch(setPacksTitleTC(value))
    }
    const onChangeText = (value: string) => {
        setFind(value)
        setSearchParams({find})
    }

    useEffect(() => {
        const params = Object.fromEntries(searchParams)
    }, [])
    return(
        <div>
            <SuperDebouncedInput
                value={find}
                onChangeText={onChangeText}
                onDebouncedChange={sendQuery}
                placeholder={'Provide your text'}
            />
        </div>
    )
}

