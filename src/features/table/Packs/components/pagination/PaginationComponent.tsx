import React from 'react';
import TablePagination from '@material-ui/core/TablePagination';
import {selectCardPacksTotalCount, selectPacksPage, selectPacksPageCount} from "../../selectors";
import {useAppDispatch, useAppSelector} from "../../../../../app/store";
import {setPacksPageAC, setPacksPageCountAC} from "../../actions";

export const PaginationComponent=()=> {
    const packsTotalCount=useAppSelector(selectCardPacksTotalCount)
    const pageNumber= useAppSelector(selectPacksPage)
    const pageCount= useAppSelector(selectPacksPageCount)
    const dispatch = useAppDispatch()

    const handleChangePage = (e:any, newPage:number) => {
         dispatch(setPacksPageAC(newPage))
    };

    const handleChangeRowsPerPage = (e:any) => {
         dispatch(setPacksPageCountAC(+e.target.value));

    };
    const countPages=Math.ceil(packsTotalCount/pageCount)

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