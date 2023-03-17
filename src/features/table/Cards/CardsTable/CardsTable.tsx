import * as React from "react";
import {useEffect} from "react";
import s from './CardsTable.module.css'
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import {SelectChangeEvent, TableHead} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../../../app/store";
import { getCardsTC} from "../cards-reducer";
import {
    selectCards, selectCardsAnswer,
    selectCardsPage,
    selectCardsPageCount, selectCardsSort, selectCardsTotalCount,
    selectPackUserId
} from "../selectors";
import {ActionsCell} from "../../common/ActionsCell/ActionsCell";
import {StyledTableCell, StyledTableRow} from "./styles";
import {Grade} from "./Grade/Grade";
import {TableTextCell} from "../../common/TableTextCell/TableTextCell";
import {setCardsPageAC, setCardsPageCountAC, setCardsSortAC} from "../actions";
import { selectUserId} from "../../../profile/selectors";
import {SortCell} from "../../common/SortCell/SortCell";
import {useSearchParams} from "react-router-dom";
import {PaginationComponent} from "../../Packs/components/pagination/PaginationComponent";

export const CardsTable = () => {

    const dispatch = useAppDispatch()
    const cards = useAppSelector(selectCards)
    const page = useAppSelector(selectCardsPage)
    const pageCount = useAppSelector(selectCardsPageCount)
    const answer = useAppSelector(selectCardsAnswer)
    const packUserId = useAppSelector(selectPackUserId)
    const myId = useAppSelector(selectUserId)
    const cardsSort = useAppSelector(selectCardsSort)



    useEffect(() => {
        dispatch(getCardsTC())
    }, [dispatch, page, pageCount, cardsSort, answer])

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? pageCount - cards.length : 0;
    const emptyRowsStyle = {height: 75 * emptyRows}



    const handleSort = (sort: string | null) => {
        dispatch(setCardsSortAC(sort))
    }

    return (
        <div>
            <TableContainer component={Paper}>
                <Table aria-label="custom table" stickyHeader>
                    <TableHead>
                        <StyledTableRow>
                            <StyledTableCell>
                                <SortCell label={"Question"}
                                          sorter={'question'}
                                          sort={cardsSort}
                                          toggleSort={handleSort}/>
                            </StyledTableCell>
                            <StyledTableCell>
                                <SortCell label={"Answer"} sorter={'answer'} sort={cardsSort} toggleSort={handleSort}/>
                            </StyledTableCell>
                            <StyledTableCell>
                                <SortCell label={"Last Updated"} sorter={'updated'} sort={cardsSort}
                                          toggleSort={handleSort}/>
                            </StyledTableCell>
                            <StyledTableCell>
                                <SortCell label={"Grade"} sorter={'grade'} sort={cardsSort} toggleSort={handleSort}/>
                            </StyledTableCell>
                            {packUserId === myId && <StyledTableCell>
                                Actions
                            </StyledTableCell>}
                        </StyledTableRow>
                    </TableHead>
                    <TableBody>
                        {cards.map((card, index) => (
                            <StyledTableRow key={index}>
                                <StyledTableCell
                                    scope="row">
                                    <TableTextCell text={card.question}/>
                                </StyledTableCell>
                                <StyledTableCell>
                                    <TableTextCell text={card.answer}/>
                                </StyledTableCell>
                                <StyledTableCell>
                                    {card.updated}
                                </StyledTableCell>
                                <StyledTableCell>
                                    <Grade grade={card.grade}/>
                                </StyledTableCell>
                                {packUserId === myId && <StyledTableCell>
                                    <ActionsCell
                                        packOwnerId={card.user_id}
                                        itemId={card._id}
                                    />
                                </StyledTableCell>}
                            </StyledTableRow>
                        ))}
                        {emptyRows > 0 && (
                            <StyledTableRow style={emptyRowsStyle}>
                                <StyledTableCell colSpan={5}/>
                            </StyledTableRow>
                        )}

                    </TableBody>
                </Table>

            </TableContainer>
           {/* <PaginationComponent totalCount={totalCount}
                                 pageNumber={page}
                                 pageCount={pageCount}
                                 handleChangePage={handlePageChange}
                                 handleChangeRowsPerPage={handlePageCountChange}/>*/}
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
    );
}


