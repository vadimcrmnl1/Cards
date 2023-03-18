import * as React from 'react'

import { TableHead } from '@mui/material'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableContainer from '@mui/material/TableContainer'

import { useAppDispatch, useAppSelector } from '../../../../app/store'
import { selectUserId } from '../../../profile/selectors'
import { ActionsCell } from '../../common/ActionsCell/ActionsCell'
import { SortCell } from '../../common/SortCell/SortCell'
import { TableTextCell } from '../../common/TableTextCell/TableTextCell'
import {
  selectCards,
  selectCardsPage,
  selectCardsPageCount,
  selectCardsSort,
  selectPackUserId,
} from '../selectors'

import { Grade } from './Grade/Grade'
import { StyledTableCell, StyledTableRow } from './styles'

export const CardsTable = () => {
  const dispatch = useAppDispatch()
  const cards = useAppSelector(selectCards)
  const pageCount = useAppSelector(selectCardsPageCount)
  const packUserId = useAppSelector(selectPackUserId)
  const myId = useAppSelector(selectUserId)
  const page = useAppSelector(selectCardsPage)
  const cardsSort = useAppSelector(selectCardsSort)

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 0 ? pageCount - cards.length : 0
  const emptyRowsStyle = { height: 75 * emptyRows }

  return (
    <div>
      <TableContainer component={Paper}>
        <Table aria-label="custom table" stickyHeader>
          <TableHead>
            <StyledTableRow>
              <StyledTableCell>
                <SortCell label={'Question'} sorter={'question'} sort={cardsSort} />
              </StyledTableCell>
              <StyledTableCell>
                <SortCell label={'Answer'} sorter={'answer'} sort={cardsSort} />
              </StyledTableCell>
              <StyledTableCell>
                <SortCell label={'Last Updated'} sorter={'updated'} sort={cardsSort} />
              </StyledTableCell>
              <StyledTableCell>
                <SortCell label={'Grade'} sorter={'grade'} sort={cardsSort} />
              </StyledTableCell>
              {packUserId === myId && <StyledTableCell>Actions</StyledTableCell>}
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {cards.map((card, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell scope="row">
                  <TableTextCell text={card.question} />
                </StyledTableCell>
                <StyledTableCell>
                  <TableTextCell text={card.answer} />
                </StyledTableCell>
                <StyledTableCell>{card.updated}</StyledTableCell>
                <StyledTableCell>
                  <Grade grade={card.grade} />
                </StyledTableCell>
                {packUserId === myId && (
                  <StyledTableCell>
                    <ActionsCell packOwnerId={card.user_id} itemId={card._id} />
                  </StyledTableCell>
                )}
              </StyledTableRow>
            ))}
            {emptyRows > 0 && (
              <StyledTableRow style={emptyRowsStyle}>
                <StyledTableCell colSpan={5} />
              </StyledTableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      {/* <div className={s.pagination}>
                <Pagination
                    count={count}
                    page={page}
                    onChange={handlePageChange}
                    shape="rounded"
                    showFirstButton
                    showLastButton
                />
                Show
                <FormControl sx={{m: 1}} variant="outlined" size={'small'}>
                    <Select
                        value={'' + pageCount}
                        onChange={handlePageCountChange}
                    >
                        <MenuItem value={5}>5</MenuItem>
                        <MenuItem value={10}>10</MenuItem>
                        <MenuItem value={15}>15</MenuItem>
                    </Select>
                </FormControl>
                Cards per Page
            </div>*/}
    </div>
  )
}
