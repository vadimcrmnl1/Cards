import React, {DetailedHTMLProps, InputHTMLAttributes, ReactNode, useState} from 'react'
import SuperInput from "../SuperInput/SuperInput";
import {useStyles} from '../../../features/styleMU/styleMU'
import {TextField} from "@mui/material";

// тип пропсов обычного инпута
type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement>

// здесь мы говорим что у нашего инпута будут такие же пропсы как у обычного инпута, кроме type
// (чтоб не писать value: string, onChange: ...; они уже все описаны в DefaultInputPropsType)
export type SuperDebouncedInputPropsType = Omit<DefaultInputPropsType, 'type'> & {
    // и + ещё пропсы которых нет в стандартном инпуте
    onChangeText?: (value: string) => void
    onEnter?: () => void
    error?: ReactNode
    spanClassName?: string
} // илм экспортировать тип SuperInputTextPropsType
    & { // плюс специальный пропс SuperPagination
    onDebouncedChange?: (value: string) => void
}

export const SuperDebouncedInput: React.FC<SuperDebouncedInputPropsType> = (
    {
        onChangeText,
        onDebouncedChange,
        ...restProps
    }
) => {
    const [timerId, setTimerId] = useState<number | undefined>(undefined)
    const styleMU = useStyles();
    const handleOnChangeText = (value: string) => {
        onChangeText?.(value)
        if (onDebouncedChange) {
            clearTimeout(timerId)
            setTimerId(+(setTimeout(() => {onDebouncedChange(value) }, 1500))) ;
        }
    }

    return (
       /* <TextField
            id="filled-search"
            label="Search field"
            type="search"
            variant="filled"

        />*/
        <SuperInput onChangeText={handleOnChangeText}
                    className={styleMU.textField}
                    {...restProps}/>
    )
}


