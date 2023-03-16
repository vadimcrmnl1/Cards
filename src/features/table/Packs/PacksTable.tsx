import * as React from "react";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import {useAppDispatch, useAppSelector} from "../../../app/store";
import {
    selectCardPacks,
    selectCardPacksTotalCount,
    selectPacksCountOfPages,
    selectPacksPage,
    selectPacksPageCount
} from "./selectors";
import {setPacksPageAC, setPacksPageCountAC} from "./actions";
import { Pagination, Select, SelectChangeEvent, TableHead} from "@mui/material";
import {useEffect} from "react";
import {getPacksTC} from "./packs-reducer";


export const PacksTable = () => {

    const dispatch = useAppDispatch()
    const cardPacks = useAppSelector(selectCardPacks)
    const packName=useAppSelector(state=>state.packs.packName)
   // const cardPacksTotalCount = useAppSelector(selectCardPacksTotalCount)
    const page = useAppSelector(selectPacksPage)
    const pageCount = useAppSelector(selectPacksPageCount)
  //  const count = useAppSelector(selectPacksCountOfPages)
    console.log('page: ', page)
    console.log(packName)
    useEffect(() => {

        dispatch(getPacksTC())
    }, [dispatch, page, pageCount, packName])


    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? pageCount - cardPacks.length : 0;
    // page > 0 ? Math.max(0, (1 + page) * pageCount - cardPacksTotalCount) : 0;

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
        </TableContainer>
    );
}