import * as React from "react";
import s from './PacksTable/PacksTable.module.css'
import {useEffect} from "react";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell, {tableCellClasses} from "@mui/material/TableCell";
import {useAppDispatch, useAppSelector} from "../../../app/store";
import {selectCardPacks, selectCardPacksTotalCount, selectPacksCountOfPages, selectPacksPage, selectPacksPageCount} from "./selectors";
import {setPacksPageAC, setPacksPageCountAC} from "./actions";
import {FormControl, MenuItem, Pagination, Select, SelectChangeEvent, styled, TableHead} from "@mui/material";
import {getPacksTC} from "./packs-reducer";
import {ActionsCell} from "./PacksTable/ActionsCell/ActionsCell";

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
        // backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));



export const PacksTable = () => {

    const dispatch = useAppDispatch()
    const cardPacks = useAppSelector(selectCardPacks)
    const cardPacksTotalCount = useAppSelector(selectCardPacksTotalCount)
    const page = useAppSelector(selectPacksPage)
    const pageCount = useAppSelector(selectPacksPageCount)
    const count = useAppSelector(selectPacksCountOfPages)

    useEffect(() => {
        dispatch(getPacksTC())
    }, [dispatch, page, pageCount])


    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? pageCount - cardPacks.length : 0;

    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        dispatch(setPacksPageAC(value))
    }
    const handlePageCountChange = (event: SelectChangeEvent) => {
        dispatch(setPacksPageCountAC(+event.target.value))
    };
    return (
        <div className={s.table}>
            <TableContainer component={Paper}>
                <Table aria-label="custom pagination table" stickyHeader>
                    <TableHead>
                        <StyledTableRow>
                            <StyledTableCell>
                                Name
                            </StyledTableCell>
                            <StyledTableCell>
                                Cards
                            </StyledTableCell>
                            <StyledTableCell>
                                Last Updated
                            </StyledTableCell>
                            <StyledTableCell>
                                Created by
                            </StyledTableCell>
                            <StyledTableCell sx={{}}>
                                Actions
                            </StyledTableCell>
                        </StyledTableRow>
                    </TableHead>
                    <TableBody>
                        {cardPacks.map((cardPack, index) => (
                            <StyledTableRow key={index} hover>
                                <StyledTableCell component="th" scope="row">
                                    {cardPack.name}
                                </StyledTableCell>
                                <StyledTableCell>
                                    {cardPack.cardsCount}
                                </StyledTableCell>
                                <StyledTableCell>
                                    {cardPack.updated}
                                </StyledTableCell>
                                <StyledTableCell>
                                    {cardPack.user_name}
                                </StyledTableCell>
                                <StyledTableCell>
                                    <ActionsCell packOwnerId={cardPack.user_id}/>
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
                Packs per Page
            </div>
        </div>
    );
}


