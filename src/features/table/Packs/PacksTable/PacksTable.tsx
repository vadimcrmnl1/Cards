import * as React from "react";
import s from './PacksTable.module.css'
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import {useAppDispatch, useAppSelector} from "../../../../app/store";
import {
    selectCardPacks,
    selectPacksPage,
    selectPacksSort,
    selectPacksPageCount
} from "../selectors";
import {setPacksSortAC} from "../actions";
import {TableHead} from "@mui/material";
import {ActionsCell} from "../../common/ActionsCell/ActionsCell";
import {NavLink} from "react-router-dom";
import {PATH} from "../../../../common/utils/routes/Routes";

import {StyledTableCell, StyledTableRow} from "../../common/styles";
import {setCardsPackIdAC, setCardsPackNameAC, setCardsPackUserIdAC, setCardsPageAC} from "../../Cards/actions";
import {SortCell} from "../../common/SortCell/SortCell";
import {TableTextCell} from "../../common/TableTextCell/TableTextCell";


export const PacksTable = () => {

    const dispatch = useAppDispatch()
    const cardPacks = useAppSelector(selectCardPacks)
    const page = useAppSelector(selectPacksPage)
    const pageCount = useAppSelector(selectPacksPageCount)
    const sortPacks = useAppSelector(selectPacksSort)


// Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? pageCount - cardPacks.length : 0;
    const emptyRowsStyle = {height: 75 * emptyRows}

    return (
        <div className={s.table}>
            <TableContainer component={Paper}>
                <Table aria-label="custom table" stickyHeader>
                    <TableHead>
                        <StyledTableRow>
                            <StyledTableCell>
                                <SortCell label={"Name"}
                                          sorter={'name'}
                                          sort={sortPacks}
                                          packs
                                         />
                            </StyledTableCell>
                            <StyledTableCell>
                                <SortCell label={'Cards'}
                                          sorter={'cardsCount'}
                                          sort={sortPacks}
                                          packs
                                         />
                            </StyledTableCell>
                            <StyledTableCell>
                                <SortCell label={'Last Updated'}
                                          sorter={'updated'}
                                          sort={sortPacks}
                                          packs
                                         />
                            </StyledTableCell>
                            <StyledTableCell>
                                <SortCell label={'Created by'}
                                          sorter={'user_name'}
                                          sort={sortPacks}
                                          packs
                                       />
                            </StyledTableCell>
                            <StyledTableCell>
                                Actions
                            </StyledTableCell>
                        </StyledTableRow>
                    </TableHead>
                    <TableBody>
                        {cardPacks.map((cardPack, index) => {
                            const handleLinkToCards = () => {
                                //указать какую колоду открываем и её владельца
                                dispatch(setCardsPackIdAC(cardPack._id))
                                dispatch(setCardsPackUserIdAC(cardPack.user_id))
                                dispatch(setCardsPackNameAC(cardPack.name))
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
                                        packOwnerId={cardPack.user_id}
                                        itemId={cardPack._id}
                                    />
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
        </div>
    );
}


