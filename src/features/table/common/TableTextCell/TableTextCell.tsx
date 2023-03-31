import * as React from 'react'

import s from './TableTextCell.module.css'

type TableTextCellPropsType = {
  text: string
  image?: string
}
export const TableTextCell: React.FC<TableTextCellPropsType> = ({ text, image }) => {
  // const textStyle = {
  //     display: '-webkit-box',
  //     WebkitLineClamp: '3',
  //     webkitBoxOrient: 'vertical',
  //     overflow: 'hidden',
  // }

  return (
    <div>
      {image ? (
        <div className={s.img} style={{ backgroundImage: `url(${image})` }}></div>
      ) : (
        <p className={s.name}>{text}</p>
      )}
    </div>
  )
}
