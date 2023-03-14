import React, {useState} from 'react';
import TablePagination from '@material-ui/core/TablePagination';
import {selectCardPacksTotalCount, selectPacksPage, selectPacksPageCount} from "../selectors";
import {useAppDispatch, useAppSelector} from "../../../../app/store";

export const PaginationComponent=()=> {
    const [page, setPage] = useState(2);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const packsTotalCount=useAppSelector(selectCardPacksTotalCount)
    const pageNumber= useAppSelector(selectPacksPage)
    const pageCount= useAppSelector(selectPacksPageCount)
    const dispatch = useAppDispatch()
    const handleChangePage = (e:any, newPage:number) => {
        // dispatch(getPacksPaginTC(newPage, pageCount))
    };

   /* const handleChangeRowsPerPage = (e:any) => {
        setRowsPerPage(parseInt(e.target.value, 10));
        setPage(0);
    };*/
    const countPages=Math.ceil(packsTotalCount/pageCount)
    return (
        <TablePagination
            component="div"
            count={countPages}
            page={pageNumber+1}
            onPageChange={handleChangePage}
            rowsPerPage={pageCount}
            rowsPerPageOptions={[4,6,8,10]}
            //onRowsPerPageChange={handleChangeRowsPerPage}
        />
    );
}