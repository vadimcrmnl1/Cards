import * as React from 'react'

import mask from '../../../../../common/images/Mask.png'

import s from './PacksTableTextCell.module.css'

type PacksTableTextCellPropsType = {
  text: string
  deckCover: string
}
export const PacksTableTextCell: React.FC<PacksTableTextCellPropsType> = ({ text, deckCover }) => {
  const imageQuestion1 = deckCover ? deckCover : mask

  return (
    <div className={s.cell}>
      <div className={s.img} style={{ backgroundImage: `url(${imageQuestion1})` }} />
      <p className={s.name}>{text}</p>
    </div>
  )
}
