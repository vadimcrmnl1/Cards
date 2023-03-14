import * as React from "react";

type TableTextCellPropsType = {
    text: string
}
export const TableTextCell: React.FC<TableTextCellPropsType> = ({text}) => {
    const textStyle = {
        display: '-webkit-box',
        webkitLineClamp: '3',
        webkitBoxOrient: 'vertical',
        overflow: 'hidden',
    }

    return (
        <p style={textStyle}>
            {text}
        </p>
    )
}