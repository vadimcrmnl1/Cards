import * as React from "react";
import s from './PacksTable/PacksTable.module.css'
import {useEffect} from "react";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell, {tableCellClasses} from "@mui/material/TableCell";
import {FormControl, MenuItem, Pagination, Select, SelectChangeEvent, styled, TableHead} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../../../app/store";
import {getCardsTC} from "../cards-reducer";
import {selectCards, selectCardsCountOfPages, selectCardsPage, selectCardsPageCount} from "../selectors";
import {ActionsCell} from "../../Packs/PacksTable/ActionsCell/ActionsCell";
import {setPageAC, setPageCountAC} from "../actions";


const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));


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

    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        dispatch(setPageAC(value))
    }
    const handlePageCountChange = (event: SelectChangeEvent) => {
        dispatch(setPageCountAC(+event.target.value))
    };
    return (
        <div>
            <TableContainer component={Paper}>
                <Table aria-label="custom customized table" stickyHeader >
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
                            <TableCell>
                                Actions
                            </TableCell>
                        </StyledTableRow>
                    </TableHead>
                    <TableBody>
                        {cards.map((card, index) => (
                            <StyledTableRow key={index}>
                                <StyledTableCell component="th" scope="row">
                                    {card.question}
                                </StyledTableCell>
                                <StyledTableCell>
                                    {card.answer}
                                </StyledTableCell>
                                <StyledTableCell>
                                    {card.updated}
                                </StyledTableCell>
                                <StyledTableCell>
                                    {card.grade}
                                </StyledTableCell>
                                <StyledTableCell>
                                    <ActionsCell packOwnerId={card.user_id}/>
                                </StyledTableCell>
                            </StyledTableRow>
                        ))}
                        {emptyRows > 0 && (
                            <StyledTableRow style={{height: 53 * emptyRows}}>
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


