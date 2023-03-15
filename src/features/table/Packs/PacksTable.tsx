import * as React from "react";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import {useAppDispatch, useAppSelector} from "../../../app/store";
import {selectCardPacks, selectCardPacksTotalCount, selectCountOfPages, selectPage, selectPageCount} from "./selectors";
import {setPacksPageAC, setPacksPageCountAC} from "./actions";
import { Pagination, Select, SelectChangeEvent, TableHead} from "@mui/material";
import {useEffect} from "react";
import {getPacksTC} from "./packs-reducer";


export const PacksTable = () => {

    const dispatch = useAppDispatch()
    const cardPacks = useAppSelector(selectCardPacks)
    const cardPacksTotalCount = useAppSelector(selectCardPacksTotalCount)
    const page = useAppSelector(selectPage)
    const pageCount = useAppSelector(selectPageCount)
    const count = useAppSelector(selectCountOfPages)
    console.log('page: ', page)

    useEffect(() => {
        dispatch(getPacksTC())
    }, [dispatch, page, pageCount])


    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? pageCount - cardPacks.length : 0;
    // page > 0 ? Math.max(0, (1 + page) * pageCount - cardPacksTotalCount) : 0;

    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        dispatch(setPacksPageAC(value))
    }
    const handlePageCountChange = (event: SelectChangeEvent) => {
        dispatch(setPacksPageCountAC(+event.target.value))
    };
    console.log(cardPacks)
    return (
        <TableContainer component={Paper}>
            <Table sx={{minWidth: 1024}} aria-label="custom pagination table" stickyHeader>
                <TableHead>
                    <TableRow>
                        <TableCell align="center">
                            Name
                        </TableCell>
                        <TableCell align="center">
                            Cards
                        </TableCell>
                        <TableCell align="center">
                            Last Updated
                        </TableCell>
                        <TableCell align="center">
                            Created by
                        </TableCell>
                        <TableCell align="center">
                            Actions
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {(pageCount > 0
                            ? cardPacks
                            // .slice(page * pageCount, page * pageCount + pageCount)
                            : cardPacks
                    ).map((cardPack, index) => (
                        <TableRow key={index}>
                            <TableCell component="th" scope="row">
                                {cardPack.name}
                            </TableCell>
                            <TableCell style={{width: 160}} align="center">
                                {cardPack.cardsCount}
                            </TableCell>
                            <TableCell style={{width: 160}} align="center">
                                {cardPack.updated}
                            </TableCell>
                            <TableCell style={{width: 160}} align="center">
                                {cardPack.user_name}
                            </TableCell>
                        </TableRow>
                    ))}
                    {emptyRows > 0 && (
                        <TableRow style={{height: 53 * emptyRows}}>
                            <TableCell colSpan={5}/>
                        </TableRow>
                    )}

                </TableBody>
            </Table>
            <Pagination
                count={count}
                page={page}
                onChange={handlePageChange}
                shape="rounded"
                showFirstButton
                showLastButton
            />
            Show
            <Select
                native
                size={'small'}
                defaultValue={'' + pageCount}
                // value={''+pageCount}
                // label="Age"
                onChange={handlePageCountChange}
            >
                <option>5</option>
                <option>10</option>
                <option>15</option>
            </Select>
            Cards per Page
        </TableContainer>
    );
}