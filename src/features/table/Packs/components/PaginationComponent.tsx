import React, {useState} from 'react';
import TablePagination from '@material-ui/core/TablePagination';
import {selectCardPacksTotalCount, selectPage, selectPageCount} from "../selectors";
import {useAppDispatch, useAppSelector} from "../../../../app/store";
import {useParams} from "react-router-dom";
import {getPacksTC} from "../packs-reducer";
import {setPacksPageAC, setPacksPageCountAC} from "../actions";

export const PaginationComponent=()=> {
    const [page, setPage] = useState(2);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const packsTotalCount=useAppSelector(selectCardPacksTotalCount)
    const pageNumber= useAppSelector(selectPage)
    const pageCount= useAppSelector(selectPageCount)
    const dispatch = useAppDispatch()

    const handleChangePage = (e:any, newPage:number) => {
         dispatch(setPacksPageAC(newPage))
    };

    const handleChangeRowsPerPage = (e:any) => {
         dispatch(setPacksPageCountAC(+e.target.value));

    };
    const countPages=Math.ceil(packsTotalCount/pageCount)
    console.log('packsTotalCount=', packsTotalCount)
    console.log('pageNumber=', pageNumber)
    console.log('pageCount=', pageCount)

    return (
        <TablePagination
            //component="div"
            count={countPages}
            page={pageNumber}
            onPageChange={handleChangePage}
            rowsPerPage={pageCount}
            rowsPerPageOptions={[5,10,15]}
            onRowsPerPageChange={handleChangeRowsPerPage}
        />
    );
}