import * as React from "react";
import {Star} from "../../../icons/Star";

type GradePropsType = {
    grade: number
}
export const Grade: React.FC<GradePropsType> = ({grade}) => {
    return (
        <div>
            <Star/>
            <Star/>
            <Star/>
            <Star/>
            <Star/>
        </div>
    )
}