import Box from "@material-ui/core/Box";
import * as React from "react";
import {Star} from "../../../common/icons/Star";
import s from './Grage.module.css'
import {Rating} from "@mui/material";

type GradePropsType = {
    grade: number
}
export const Grade: React.FC<GradePropsType> = ({grade}) => {
   /* const percent = +grade.toFixed(2) * 100 / 5


    const mappedStars = 1*/
    console.log(grade)
    return (
        <div className={s.grade}>
            {/* <span className={s.percent} style={{right: `calc(100% - ${percent}% - 21px)`}}>*/}
            {/*        {percent}%*/}
            {/*        <b className={s.arrow}></b>*/}
            {/*    </span>*/}
            {/*{mappedStars}*/}
            {/*<Star />*/}
            {/*<Star/>
            <Star/>
            <Star/>
            <Star/>*/}
            <Box component="fieldset" mb={3} borderColor="transparent">
                <Rating name="read-only" value={grade} precision={0.1} readOnly />
            </Box>
        </div>
    )
}