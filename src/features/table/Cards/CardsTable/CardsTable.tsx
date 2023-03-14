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
import {selectCards, selectCardsCountOfPages, selectCardsPage, selectCardsPageCount} from "../selectors";
import {ActionsCell} from "../../Packs/PacksTable/ActionsCell/ActionsCell";

import {StyledTableCell, StyledTableRow} from "./styles";
import {Grade} from "./Grade/Grade";
import {TableTextCell} from "../../TableTextCell";
import {setCardsPageAC, setCardsPageCountAC} from "../actions";


export const CardsTable = () => {

    const dispatch = useAppDispatch()
    const cards = useAppSelector(selectCards)
    const page = useAppSelector(selectCardsPage)
    const pageCount = useAppSelector(selectCardsPageCount)
    const count = useAppSelector(selectCardsCountOfPages)


    useEffect(() => {
        dispatch(getCardsTC())
    }, [dispatch])


    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? pageCount - cards.length : 0;
    const emptyRowsStyle = {height: 53 * emptyRows}

    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        dispatch(setCardsPageAC(value))
    }
    const handlePageCountChange = (event: SelectChangeEvent) => {
        dispatch(setCardsPageCountAC(+event.target.value))
    };
    return (
        <div>
            <TableContainer component={Paper}>
                <Table aria-label="custom customized table" stickyHeader>
                    <TableHead>
                        <StyledTableRow>
                            <StyledTableCell>
                                Question
                            </StyledTableCell>
                            <StyledTableCell>
                                Answer
                            </StyledTableCell>
                            <StyledTableCell>
                                Last Updated
                            </StyledTableCell>
                            <StyledTableCell>
                                Grade
                            </StyledTableCell>
                            <StyledTableCell>
                                Actions
                            </StyledTableCell>
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
                                <StyledTableCell>
                                    <ActionsCell packOwnerId={card.user_id}/>
                                </StyledTableCell>
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


