import Slider from "@mui/material/Slider";
import {useAppDispatch, useAppSelector} from "../../../../app/store";
import {setFilterCardsTC} from "../packs-reducer";
import {selectMaxCardsCount, selectMinCardsCount} from "../selectors";
import s from './FilterCountCard.module.css'
import {useState} from "react";
import {useStyles} from "../../../styleMU/styleMU";

function valuetext(value: number) {
    return `${value}`;
}

export const FilterCountCardComponent=()=>{
    const styleMU = useStyles();
    const dispatch = useAppDispatch()
    const minCardsCount= useAppSelector(selectMinCardsCount)
    const maxCardsCount= useAppSelector(selectMaxCardsCount)

    const [value, setValue] = useState<number[]>([0, 100]);

    const handleChange = (event:any, newValue:number | number[]) => {
        setValue(newValue as number[]);
        dispatch(setFilterCardsTC(newValue as number[]))
    };
    return(
        <div>
            <div className={s.wrapper}>
                <span >{value[0]}</span>
                <Slider
                    getAriaLabel={() => 'Temperature range'}
                    value={value}
                    onChangeCommitted={handleChange}
                    valueLabelDisplay="auto"
                    step={1}
                    min={minCardsCount}
                    max={maxCardsCount}

                   // getAriaValueText={valuetext}
                    className={styleMU.slider}
                />
                <span >{value[1]}</span>
            </div>

        </div>
    )
}