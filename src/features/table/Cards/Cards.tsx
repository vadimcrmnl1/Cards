import * as React from 'react';
import s from './Cards.module.css'
import {useAppDispatch, useAppSelector} from "../../../app/store";
import {CardsTable} from "./CardsTable/CardsTable";
import {selectIsLoggedIn} from "../../auth/selectors";
import {Navigate} from 'react-router-dom';
import {PATH} from "../../../common/utils/routes/Routes";
import {SearchByCardsName} from "./components/SearchByCardsName";
import {LinkToBack} from "../../../common/components/LinkToBack/LinkToBack";
import {PaginationComponent} from "../Packs/components/pagination/PaginationComponent";
import {selectCardsPage, selectCardsPageCount, selectCardsTotalCount} from "./selectors";
import {setCardsPageAC, setCardsPageCountAC} from "./actions";

export const Cards = () => {
    const totalCount=useAppSelector(selectCardsTotalCount)
    const pageNumber= useAppSelector(selectCardsPage)
    const pageCount= useAppSelector(selectCardsPageCount)
    const dispatch=useAppDispatch()
    const isLoggedIn = useAppSelector(selectIsLoggedIn)

    if (!isLoggedIn) {
        return <Navigate to={PATH.login}/>
    }
    const handleChangePage = (e:any, newPage:number) => {
        dispatch(setCardsPageAC(newPage))
    };

    const handleChangeRowsPerPage = (e:any) => {
        dispatch(setCardsPageCountAC(+e.target.value));

    };
    return (
        <div className={s.container}>
            <LinkToBack linkPage={PATH.packs} title={'Back to Packs List'}/>
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



