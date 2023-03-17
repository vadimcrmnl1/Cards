import React, {useEffect} from 'react';
import s from './../Packs/Packs.module.css'
import {useAppDispatch, useAppSelector} from "../../../app/store";
import {CardsTable} from "./CardsTable/CardsTable";
import {selectIsLoggedIn} from "../../auth/selectors";
import {Navigate, useSearchParams} from 'react-router-dom';
import {PATH} from "../../../common/utils/routes/Routes";
import {LinkToBack} from "../../../common/components/LinkToBack/LinkToBack";
import {PaginationComponent} from "../Packs/components/pagination/PaginationComponent";
import {selectCards, selectCardsPage, selectCardsPageCount, selectCardsTotalCount, selectPackName} from "./selectors";
import {setCardsPageAC, setCardsPageCountAC, setCardsSearchByQuestionAC} from "./actions";
import {useStyles} from "../../styleMU/styleMU";
import {addCardTC} from "./cards-reducer";
import {AddCardRequestType} from "../table-api";
import {selectCardPacks} from "../Packs/selectors";
import Button from '@mui/material/Button';
import {selectIsAppMakeRequest} from "../../../app/selectors";
import {ErrorSnackbar} from "../../../common/components/ErrorSnackbar/ErrorSnackbar";
import {SearchQuestion} from './components/SearchQuestion';
import {SelectChangeEvent} from "@mui/material";
import {EmptySearch} from "../../../common/components/EmptySearch/EmptySearch";
import {EmptyList} from "../../../common/components/EmptyList/EmptyList";
import {NoFilters} from "../Packs/components/noFilters/NoFilters";


export const Cards = () => {
    const totalCount = useAppSelector(selectCardsTotalCount)
    const pageNumber = useAppSelector(selectCardsPage)
    const pageCount = useAppSelector(selectCardsPageCount)
    const cardsPack_id = useAppSelector(selectCardPacks)
    const packName = useAppSelector(selectPackName)
    const dispatch = useAppDispatch()
    const isLoggedIn = useAppSelector(selectIsLoggedIn)
    const isAppMakeRequest = useAppSelector(selectIsAppMakeRequest)
    const cards = useAppSelector(selectCards)
    const styleMU = useStyles();
    const [searchParams, setSearchParams] = useSearchParams()

    useEffect(()=>{
        const params = Object.fromEntries(searchParams)
        dispatch(setCardsSearchByQuestionAC(params.question || ''))
     },[])
    if (!isLoggedIn) {
        return <Navigate to={PATH.login}/>
    }
    //Change pagination
    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        dispatch(setCardsPageAC(value))
        setSearchParams({...searchParams, page:value.toString()})
    }
    const handlePageCountChange = (event: SelectChangeEvent) => {
        dispatch(setCardsPageCountAC(+event.target.value))
        dispatch(setCardsPageAC(1))
        setSearchParams({...searchParams, page: '1', pageCount: event.target.value})
    };
    const handleSearchQuestion = (value: string) => {
        dispatch(setCardsSearchByQuestionAC(value))
        setSearchParams({...searchParams, question:value})
    }

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
    console.log('totalCount', totalCount, 'cards', cards.length)
    return (
        <div className={s.container}>

            <LinkToBack linkPage={PATH.packs} title={'Back to Packs List'}/>
            <h2>{packName}</h2>
            <SearchQuestion handleSearchQuestion={handleSearchQuestion}/>


            <div className={s.packsHeader}>
                <h3>Cards list</h3>
                <Button className={styleMU.button}
                        onClick={handleAddCard}
                        variant={'contained'}
                        disabled={isAppMakeRequest}
                >Add new card</Button>
            </div>

            <CardsTable/>
            <PaginationComponent totalCount={totalCount}
                                 pageNumber={pageNumber}
                                 pageCount={pageCount}
                                 handleChangePage={handlePageChange}
                                 handleChangeRowsPerPage={handlePageCountChange}/>
            <ErrorSnackbar/>
        </div>
    );
};



