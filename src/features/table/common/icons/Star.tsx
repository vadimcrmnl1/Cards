import * as React from 'react'

type StarPropsType = {}

export const Star = (props: StarPropsType) => (
  <svg width={14} height={13} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      d="M6.524.464a.5.5 0 0 1 .952 0l1.208 3.718a.5.5 0 0 0 .475.346h3.91a.5.5 0 0 1 .294.904L10.2 7.731a.5.5 0 0 0-.182.559l1.209 3.719a.5.5 0 0 1-.77.559l-3.163-2.299a.5.5 0 0 0-.588 0l-3.163 2.299a.5.5 0 0 1-.77-.56L3.982 8.29a.5.5 0 0 0-.182-.56L.636 5.433a.5.5 0 0 1 .294-.904h3.91a.5.5 0 0 0 .476-.346L6.524.464Z"
      fill="#FFC700"
    />
  </svg>
)
