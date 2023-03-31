import * as React from 'react'

import mask from './../../../../images/Mask.png'
import s from './PacksTableTextCell.module.css'

type PacksTableTextCellPropsType = {
  text: string
  imageQuestion?: string
  imageAnswer?: string
  type?: 'question' | 'answer'
}
export const PacksTableTextCell: React.FC<PacksTableTextCellPropsType> = ({
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
  const imageQuestion1 = imageQuestion ? imageQuestion : mask

  return (
    <div className={s.cell}>
      <div className={s.img} style={{ backgroundImage: `url(${imageQuestion1})` }} />
      <p className={s.name}>{text}</p>
    </div>
  )
}
