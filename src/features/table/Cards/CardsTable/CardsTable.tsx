import * as React from "react";
import {useEffect} from "react";
import s from './CardsTable.module.css'
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import {FormControl, MenuItem, Pagination, Select, SelectChangeEvent, TableHead} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../../../app/store";
import {getCardsTC} from "../cards-reducer";
import {
    selectCards,
    selectCardsCountOfPages,
    selectCardsPage,
    selectCardsPageCount, selectCardsSort,
    selectPackUserId
} from "../selectors";
import {ActionsCell} from "../../Packs/PacksTable/ActionsCell/ActionsCell";

import {StyledTableCell, StyledTableRow} from "./styles";
import {Grade} from "./Grade/Grade";
import {TableTextCell} from "../../TableTextCell/TableTextCell";
import {setCardsPageAC, setCardsPageCountAC, setCardsSortAC} from "../actions";
import {selectMyID} from "../../../profile/selectors";
import {SortCell} from "../../Packs/PacksTable/SortCell/SortCell";
import {useSearchParams} from "react-router-dom";


export const CardsTable = () => {

    const dispatch = useAppDispatch()
    const cards = useAppSelector(selectCards)
    const page = useAppSelector(selectCardsPage)
    const pageCount = useAppSelector(selectCardsPageCount)
    const count = useAppSelector(selectCardsCountOfPages)
    const packUserId = useAppSelector(selectPackUserId)
    const myId = useAppSelector(selectMyID)
    const cardsSort = useAppSelector(selectCardsSort)

    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        dispatch(getCardsTC())
    }, [dispatch, page, pageCount, cardsSort])


    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? pageCount - cards.length : 0;
    const emptyRowsStyle = {height: 75 * emptyRows}

    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        dispatch(setCardsPageAC(value))
    }
    const handlePageCountChange = (event: SelectChangeEvent) => {
        dispatch(setCardsPageCountAC(+event.target.value))
    };

    const handleSort = (sort: string | null) => {
        dispatch(setCardsSortAC(sort))
        if (sort !== null) {
            setSearchParams({...searchParams, sortPacks: sort})
        } else {
            searchParams.delete('sortPacks')
            setSearchParams(searchParams)
        }
    }

    return (
        <div>
            <TableContainer component={Paper}>
                <Table aria-label="custom table" stickyHeader>
                    <TableHead>
                        <StyledTableRow>
                            <StyledTableCell>
                                <SortCell label={"Question"} sorter={'question'} sort={cardsSort}
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
                                        packOwnerId={card.user_id}/>
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
            <div className={s.pagination}>
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
            </div>
        </div>
    );
}


