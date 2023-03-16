import * as React from "react";
import {useEffect, useState} from "react";
import s from './PacksTable.module.css'
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
    selectPacksSort,
    selectPacksPageCount, selectPacksUserId
} from "../selectors";
import {setPacksPageAC, setPacksPageCountAC, setPacksSortAC} from "../actions";
import { TableHead} from "@mui/material";
import {getPacksTC} from "../packs-reducer";
import {ActionsCell} from "./ActionsCell/ActionsCell";
import {NavLink, useNavigate, useSearchParams} from "react-router-dom";
import {PATH} from "../../../../common/utils/routes/Routes";

import {StyledTableCell, StyledTableRow} from "./styles";
import {setCardsPackIdAC, setCardsPackUserIdAC, setCardsPageAC} from "../../Cards/actions";
import {SortCell} from "./SortCell/SortCell";
import {TableTextCell} from "../../TableTextCell/TableTextCell";


export const PacksTable = () => {
    console.log('Table')
    const dispatch = useAppDispatch()
    const cardPacks = useAppSelector(selectCardPacks)
    const packName = useAppSelector(selectPacksName)
    const userId = useAppSelector(selectPacksUserId)
    const minCards = useAppSelector(selectPacksMinCards)
    const maxCards = useAppSelector(selectPacksMaxCards)
    const page = useAppSelector(selectPacksPage)
    const pageCount = useAppSelector(selectPacksPageCount)
    const count = useAppSelector(selectPacksCountOfPages)
    const sortPacks = useAppSelector(selectPacksSort)

    const [isFirstLoading, setIsFirstLoading] = useState(true)

    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        if (isFirstLoading) {
            const sort = searchParams.get('sortPacks')
            if (sort) {
                dispatch(setPacksSortAC(sort))
            }
            // navigate(`?sortPacks=${sort}`)
            dispatch(getPacksTC())
            setIsFirstLoading(false)
        }
    }, [])

    useEffect(() => {
        if (!isFirstLoading) {
            dispatch(getPacksTC())
        }
    }, [dispatch, packName, userId, minCards, maxCards])


// Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? pageCount - cardPacks.length : 0;
    const emptyRowsStyle = {height: 75 * emptyRows}

// const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
//     dispatch(setPacksPageAC(value))
// }
// const handlePageCountChange = (event: SelectChangeEvent) => {
//     dispatch(setPacksPageCountAC(+event.target.value))
// };

    const handleSort = (sort: string) => {
        dispatch(getPacksTC(page, pageCount, sort))
        // dispatch(setPacksSortAC(sort))
        if (sort !== null) {
            setSearchParams({...searchParams, sortPacks: sort})
        } else {
            searchParams.delete('sortPacks')
            setSearchParams(searchParams)
        }
    }

    return (
        <div className={s.table}>
            <TableContainer component={Paper}>
                <Table aria-label="custom table" stickyHeader>
                    <TableHead>
                        <StyledTableRow>
                            <StyledTableCell>
                                <SortCell label={"Name"} sorter={'name'}  toggleSort={handleSort}/>
                            </StyledTableCell>
                            <StyledTableCell>
                                <SortCell label={'Cards'} sorter={'cardsCount'}
                                          toggleSort={handleSort}/>
                            </StyledTableCell>
                            <StyledTableCell>
                                <SortCell label={'Last Updated'} sorter={'updated'}
                                          toggleSort={handleSort}/>
                            </StyledTableCell>
                            <StyledTableCell>
                                <SortCell label={'Created by'} sorter={'user_name'}
                                          toggleSort={handleSort}/>
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
                                dispatch(setCardsPackUserIdAC(cardPack.user_id))
                                //чтобы при переходе с колод на карты всегда была первая страница
                                dispatch(setCardsPageAC(1))
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


