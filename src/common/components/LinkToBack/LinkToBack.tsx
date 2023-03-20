import React from 'react'

import { NavLink } from 'react-router-dom'

import { useAppDispatch } from '../../../app/store'
import arrow from '../../../features/images/Group 240.svg'
import s from '../../../features/profile/Profile.module.css'

type ProfileLinkToBackPropsType = {
  title: string
  linkPage: string
}

export const LinkToBack = (props: ProfileLinkToBackPropsType) => {
  const dispatch = useAppDispatch()

  return (
    <NavLink to={props.linkPage} className={s.navLink}>
      <img src={arrow} alt={'arrow'} />
      <span>{props.title}</span>
    </NavLink>
  )
}
