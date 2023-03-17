import React, {DetailedHTMLProps, InputHTMLAttributes, ReactNode, useState} from 'react'
import SuperInput from "../SuperInput/SuperInput";
import {useStyles} from '../../../features/styleMU/styleMU'
import {useAppDispatch} from "../../../app/store";
import {setAppErrorAC} from "../../../app/actions";

type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement>
export type SuperDebouncedInputPropsType = Omit<DefaultInputPropsType, 'type'> & {
    onChangeText?: (value: string) => void
    onEnter?: () => void

    spanClassName?: string
}
    & {
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
    const dispatch = useAppDispatch()
    const styleMU = useStyles();
    const handleOnChangeText = (value: string) => {

        onChangeText?.(value)
        if (onDebouncedChange) {
            clearTimeout(timerId)
            setTimerId(+(setTimeout(() => {
                onDebouncedChange(value)
                dispatch(setAppErrorAC(null))
            }, 1500)));
        }
    }
    return (
        <SuperInput onChangeText={handleOnChangeText}
                    className={styleMU.textField}
                    {...restProps}/>
    )
}


