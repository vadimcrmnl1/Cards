import * as React from "react";
import s from './PacksTable.module.css'
import {useEffect} from "react";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import {useAppDispatch, useAppSelector} from "../../../../app/store";
import {
    selectCardPacks,
    selectCardPacksTotalCount,
    selectPacksCountOfPages, selectPacksMaxCards, selectPacksMinCards, selectPacksName,
    selectPacksPage,
    selectPacksPageCount, selectPacksUserId
} from "../selectors";
import {setPacksPageAC, setPacksPageCountAC} from "../actions";
import {FormControl, MenuItem, Pagination, Select, SelectChangeEvent, TableHead} from "@mui/material";
import {getPacksTC} from "../packs-reducer";
import {ActionsCell} from "./ActionsCell/ActionsCell";
import {NavLink} from "react-router-dom";
import {PATH} from "../../../../common/utils/routes/Routes";

import {StyledTableCell, StyledTableRow} from "./styles";
import {TableTextCell} from "../../TableTextCell";
import {setCardsPackIdAC} from "../../Cards/actions";


export const PacksTable = () => {

    const dispatch = useAppDispatch()
    const cardPacks = useAppSelector(selectCardPacks)
    const packName=useAppSelector(selectPacksName)
    const userId=useAppSelector(selectPacksUserId)
    const minCards=useAppSelector(selectPacksMinCards)
    const maxCards=useAppSelector(selectPacksMaxCards)
    const cardPacksTotalCount = useAppSelector(selectCardPacksTotalCount)
    const page = useAppSelector(selectPacksPage)
    const pageCount = useAppSelector(selectPacksPageCount)
    const count = useAppSelector(selectPacksCountOfPages)

    useEffect(() => {

        dispatch(getPacksTC())
    }, [dispatch, page, pageCount, packName, userId, minCards, maxCards])


    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? pageCount - cardPacks.length : 0;
    const emptyRowsStyle = {height: 53 * emptyRows}

    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        dispatch(setPacksPageAC(value))
    }
    const handlePageCountChange = (event: SelectChangeEvent) => {
        dispatch(setPacksPageCountAC(+event.target.value))
    };

    return (
        <div className={s.table}>
            <TableContainer component={Paper}>
                <Table aria-label="custom table" stickyHeader>
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
                            <StyledTableCell>
                                Actions
                            </StyledTableCell>
                        </StyledTableRow>
                    </TableHead>
                    <TableBody>
                        {cardPacks.map((cardPack, index) => {
                            const handleLinkToCards = () => {
                                dispatch(setCardsPackIdAC(cardPack._id))
                            }
                            return <StyledTableRow key={index} hover>
                                <StyledTableCell scope="row">
                                    <NavLink to={PATH.cards}
                                             onClick={handleLinkToCards}
                                             className={s.link}
                                    >
                                        <TableTextCell text={cardPack.name}/>
                                    </NavLink>
                                </StyledTableCell>
                                <StyledTableCell>
                                    {cardPack.cardsCount}
                                </StyledTableCell>
                                <StyledTableCell>
                                    {cardPack.updated}
                                </StyledTableCell>
                                <StyledTableCell>
                                    <TableTextCell text={cardPack.user_name}/>
                                </StyledTableCell>
                                <StyledTableCell>
                                    <ActionsCell
                                        packs
                                        packOwnerId={cardPack.user_id}/>
                                </StyledTableCell>
                            </StyledTableRow>
                        })}
                        {emptyRows > 0 && (
                            <StyledTableRow style={emptyRowsStyle}>
                                <StyledTableCell colSpan={5}/>
                            </StyledTableRow>
                        )}

                    </TableBody>
                </Table>

            </TableContainer>
            {/*<div className={s.pagination}>
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
            </div>*/}
        </div>
    );
}


