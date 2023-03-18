import React from 'react'

import TablePagination from '@material-ui/core/TablePagination'

type PaginationPropsType = {
  totalCount: number
  pageNumber: number
  pageCount: number
  handleChangePage: (e: any, newPage: number) => void
  handleChangeRowsPerPage: (e: any) => void
}

export const PaginationComponent = (props: PaginationPropsType) => {
  const countPages = Math.ceil(props.totalCount / props.pageCount)

  return (
    <TablePagination
      component="div"
      count={props.totalCount}
      page={props.pageNumber - 1}
      onPageChange={props.handleChangePage}
      rowsPerPage={props.pageCount}
      rowsPerPageOptions={[5, 10, 15]}
      onRowsPerPageChange={props.handleChangeRowsPerPage}
    />
  )
}
