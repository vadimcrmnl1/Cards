import Slider from "@mui/material/Slider";
import {useAppDispatch, useAppSelector} from "../../../../../app/store";
import {selectMaxCardsCount,
    selectMinCardsCount, selectPacksMaxCards, selectPacksMinCards,
} from "../../selectors";
import s from './FilterCountCards.module.css'
import {useStyles} from "../../../../styleMU/styleMU";
import {setMinMaxCardsAC} from "../../actions";

export const FilterCountCards=()=>{
    const styleMU = useStyles();
    const dispatch = useAppDispatch()
    const minCardsCount= useAppSelector(selectMinCardsCount)
    const maxCardsCount= useAppSelector(selectMaxCardsCount)
    const minCards=useAppSelector(selectPacksMinCards)
    const maxCards=useAppSelector(selectPacksMaxCards)

    const handleChange = (event:any, newValue:number | number[]) => {
          dispatch(setMinMaxCardsAC(newValue as number[]))
    };

    return(
        <div>
            <div className={s.wrapper}>
                <span >{minCards}</span>
                <Slider
                    getAriaLabel={() => 'Temperature range'}
                    value={[minCards, (maxCards===0?maxCardsCount:maxCards)]}
                    onChangeCommitted={handleChange}
                    valueLabelDisplay="auto"
                    step={1}
                    min={minCardsCount}
                    max={maxCardsCount}
                    className={styleMU.slider}
                />
                <span >{(maxCards===0?maxCardsCount:maxCards)}</span>
            </div>
        </div>
    )
}