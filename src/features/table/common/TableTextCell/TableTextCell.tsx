import * as React from 'react'

import s from './TableTextCell.module.css'

type TableTextCellPropsType = {
  text: string
  imageQuestion?: string
  imageAnswer?: string
  type?: 'question' | 'answer'
}
export const TableTextCell: React.FC<TableTextCellPropsType> = ({
  text,
  imageQuestion,
  imageAnswer,
  type,
}) => {
  // const textStyle = {
  //     display: '-webkit-box',
  //     WebkitLineClamp: '3',
  //     webkitBoxOrient: 'vertical',
  //     overflow: 'hidden',
  // }
  console.log(imageQuestion)

  return (
    <div>
      {/* eslint-disable-next-line no-nested-ternary */}
      {imageQuestion !== '' && type === 'question' ? (
        <div className={s.img} style={{ backgroundImage: `url(${imageQuestion})` }}></div>
      ) : imageAnswer !== '' && type === 'answer' ? (
        <div className={s.img} style={{ backgroundImage: `url(${imageAnswer})` }}></div>
      ) : (
        <p className={s.name}>{text}</p>
      )}
    </div>
  )
}
