import * as React from 'react';
import s from './../Packs/Packs.module.css'
import {useAppDispatch, useAppSelector} from "../../../app/store";
import {CardsTable} from "./CardsTable/CardsTable";
import {selectIsLoggedIn} from "../../auth/selectors";
import {Navigate} from 'react-router-dom';
import {PATH} from "../../../common/utils/routes/Routes";
import {SearchByCardsName} from "./components/SearchByCardsName";
import {LinkToBack} from "../../../common/components/LinkToBack/LinkToBack";
import {PaginationComponent} from "../Packs/components/pagination/PaginationComponent";
import {selectCards, selectCardsPage, selectCardsPageCount, selectCardsTotalCount} from "./selectors";
import {setCardsPageAC, setCardsPageCountAC} from "./actions";
import {Button} from "@mui/material";
import {useStyles} from "../../styleMU/styleMU";
import {addCardTC, deleteCardTC, updateCardTC} from "./cards-reducer";
import {AddCardRequestType, UpdateCardRequestDataType} from "../table-api";
import {selectCardPacks} from "../Packs/selectors";


export const Cards = () => {
    const totalCount=useAppSelector(selectCardsTotalCount)
    const pageNumber= useAppSelector(selectCardsPage)
    const pageCount= useAppSelector(selectCardsPageCount)
    const cardsPack_id = useAppSelector(selectCardPacks)
    const cards = useAppSelector(selectCards)
    const dispatch=useAppDispatch()
    const isLoggedIn = useAppSelector(selectIsLoggedIn)
    const styleMU = useStyles();
    if (!isLoggedIn) {
        return <Navigate to={PATH.login}/>
    }
    const handleChangePage = (e:any, newPage:number) => {
        dispatch(setCardsPageAC(newPage))
    };
    const handleChangeRowsPerPage = (e:any) => {
        dispatch(setCardsPageCountAC(+e.target.value));

    };
    const handleAddCard = () => {
        const data: AddCardRequestType = {
            card: {
                cardsPack_id: cardsPack_id[0]._id,
                question: 'How I meet your mother?',
                answer: 'No way'
            }
        }
        dispatch(addCardTC(data))
    }
    const handleDeleteCard = () => {
        dispatch(deleteCardTC(cards[0]._id))
    }
    const handleUpdateCard = () => {
        const data: UpdateCardRequestDataType = {
            card: {
                _id: cards[0]._id,
                question: 'How do i become a developer?'
            }
        }
        dispatch(updateCardTC(data))
    }
    return (
        <div className={s.container}>

            <LinkToBack linkPage={PATH.packs} title={'Back to Packs List'}/>
            <div className={s.packsHeader}>
                <h3>Cards list</h3>
                <Button className={styleMU.button}
                        onClick={handleAddCard}
                        variant={'contained'}>Add card</Button>
                <Button color={'primary'}
                        className={styleMU.button}
                        variant={'contained'}
                        onClick={handleDeleteCard}
                >Delete card</Button>
                <Button color={'primary'}
                        className={styleMU.button}
                        variant={'contained'}
                        onClick={handleUpdateCard}
                >Update card</Button>
            </div>
            <SearchByCardsName/>
            <CardsTable/>
            <PaginationComponent totalCount={totalCount}
                                  pageNumber={pageNumber}
                                  pageCount={pageCount}
                                  handleChangePage={handleChangePage}
                                  handleChangeRowsPerPage={handleChangeRowsPerPage}/>
        </div>
    );
};



