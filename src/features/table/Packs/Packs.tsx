import * as React from 'react'
import { useEffect, useState } from 'react'

import { Button, SelectChangeEvent } from '@mui/material'
import { Navigate, useSearchParams } from 'react-router-dom'

import { selectIsAppMakeRequest } from '../../../app/selectors'
import { useAppDispatch, useAppSelector } from '../../../app/store'
import { EmptySearch } from '../../../common/components/EmptySearch/EmptySearch'
import { ErrorSnackbar } from '../../../common/components/ErrorSnackbar/ErrorSnackbar'
import { AddEditPackModal } from '../../../common/components/modals/Modal/components/AddEditPack/AddEditPackModal'
import { PATH } from '../../../common/utils/routes/Routes'
import { selectIsLoggedIn } from '../../auth/selectors'
import { selectUserId } from '../../profile/selectors'
import { useStyles } from '../../styleMU/styleMU'
import { AddPackRequestDataType } from '../table-api'

import {
  setMyPacksAC,
  setMinMaxCardsAC,
  setPackNameAC,
  setPacksPageAC,
  setPacksPageCountAC,
  setPacksSortAC,
} from './actions'
import { FilterCountCards } from './components/filterCountCards/FilterCountCards'
import { NoFilters } from './components/noFilters/NoFilters'
import { PaginationComponent } from './components/pagination/PaginationComponent'
import { SearchTitleCards } from './components/searchTitleCards/SearchTitleCards'
import { SortingByUser } from './components/sortingByUser/SortingByUser'
import { addPackTC, getPacksTC } from './packs-reducer'
import s from './Packs.module.css'
import { PacksTable } from './PacksTable/PacksTable'
import {
  selectCardPacks,
  selectMaxCardsCount,
  selectMinCardsCount,
  selectPacksUserId,
  selectCardPacksTotalCount,
  selectPacksMaxCards,
  selectPacksMinCards,
  selectPacksName,
  selectPacksPage,
  selectPacksPageCount,
  selectPacksSort,
} from './selectors'

export const Packs = () => {
  const dispatch = useAppDispatch()
  const totalCount = useAppSelector(selectCardPacksTotalCount)
  const pageCount = useAppSelector(selectPacksPageCount)
  const maxCardsCount = useAppSelector(selectMaxCardsCount)
  const minCards = useAppSelector(selectPacksMinCards)
  const maxCards = useAppSelector(selectPacksMaxCards)
  const sortPacks = useAppSelector(selectPacksSort)
  const page = useAppSelector(selectPacksPage)
  const packName = useAppSelector(selectPacksName)
  const packsUser_id = useAppSelector(selectPacksUserId)
  const isAppMakeRequest = useAppSelector(selectIsAppMakeRequest)
  const [searchParams, setSearchParams] = useSearchParams()
  const isLoggedIn = useAppSelector(selectIsLoggedIn)
  const cardPacks = useAppSelector(selectCardPacks)
  const styleMU = useStyles()
  const [isFirstLoading, setIsFirstLoading] = useState(true)
  const params = Object.fromEntries(searchParams)

  useEffect(() => {
    if (isLoggedIn && !isFirstLoading) {
      dispatch(getPacksTC())
    }
  }, [
    isFirstLoading,
    dispatch,
    page,
    pageCount,
    packName,
    sortPacks,
    packsUser_id,
    minCards,
    maxCards,
  ])

  useEffect(() => {
    if (isFirstLoading) {
      dispatch(setPacksPageCountAC(+params.pageCount || 5))
      dispatch(setPacksPageAC(+params.page || 1))
      dispatch(setMinMaxCardsAC(+params.min || 0, +params.max || 0))
      dispatch(setPackNameAC(params.packName || ''))
      dispatch(setMyPacksAC(params.user_id || null))
      dispatch(setPacksSortAC(params.sortPacks || null))
      setIsFirstLoading(false)
    }
  }, [])

  // const handleAddPack = () => {
  //   const cardPack: AddPackRequestDataType = {
  //     cardsPack: {
  //       name: 'Pack Name',
  //       deckCover: '',
  //       private: false,
  //     },
  //   }
  //
  //   dispatch(addPackTC(cardPack))
  // }

  //Change pagination
  const handleChangePage = (event: React.ChangeEvent<unknown>, page: number) => {
    dispatch(setPacksPageAC(page + 1))
    setSearchParams({ ...params, page: (page + 1).toString() })
  }
  const handleChangeRowsPerPage = (event: SelectChangeEvent) => {
    dispatch(setPacksPageCountAC(+event.target.value))
    dispatch(setPacksPageAC(1))
    setSearchParams({
      ...params,
      page: '1',
      pageCount: event.target.value,
    })
  }

  const handleChangeCountCards = (event: any, newValue: number | number[]) => {
    const counts = newValue as number[]
    const min = counts[0]
    const max = counts[1]

    dispatch(setMinMaxCardsAC(min, max))
    if (min === 0) {
      searchParams.delete('min')
    } else {
      searchParams.append('min', min.toString())
    }
    if (max === maxCardsCount) {
      searchParams.delete('max')
    } else {
      searchParams.append('max', max.toString())
    }
    setSearchParams({
      ...Object.fromEntries(searchParams),
    })
  }

  const handleSearchTitleCards = (value: string) => {
    if (value !== '') {
      setSearchParams({ ...params, packName: value })
    } else if (value === '') {
      searchParams.delete('packName')
      setSearchParams({ ...Object.fromEntries(searchParams) })
    }
    dispatch(setPackNameAC(value))
  }

  if (!isLoggedIn) {
    return <Navigate to={PATH.login} />
  }

  return (
    <div className={s.container}>
      <div className={s.packsHeader}>
        <h3>Packs list</h3>
        {/*<Button*/}
        {/*  className={styleMU.button}*/}
        {/*  onClick={handleAddPack}*/}
        {/*  variant={'contained'}*/}
        {/*  disabled={isAppMakeRequest}*/}
        {/*>*/}
        {/*  Add new pack*/}
        {/*</Button>*/}
        <AddEditPackModal type={'create'} title={'Add new pack'} titleButton={'Add'} />
      </div>
      <div className={s.packsBlock}>
        <SearchTitleCards handleSendQuery={handleSearchTitleCards} />
        <SortingByUser />
        <FilterCountCards handleChange={handleChangeCountCards} />
        <NoFilters />
      </div>
      {cardPacks.length !== 0 ? (
        <div>
          <PacksTable />
          <PaginationComponent
            totalCount={totalCount}
            pageNumber={page}
            pageCount={pageCount}
            handleChangePage={handleChangePage}
            handleChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </div>
      ) : (
        <EmptySearch />
      )}

      {/*<ErrorSnackbar />*/}
    </div>
  )
}
