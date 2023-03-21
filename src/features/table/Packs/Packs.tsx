import * as React from 'react'
import { useEffect, useState } from 'react'

import { Button, SelectChangeEvent } from '@mui/material'
import { Navigate, useSearchParams } from 'react-router-dom'

import { selectIsAppMakeRequest } from '../../../app/selectors'
import { EmptySearch } from '../../../common/components/EmptySearch/EmptySearch'
import { ErrorSnackbar } from '../../../common/components/ErrorSnackbar/ErrorSnackbar'
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

import { useAppDispatch, useAppSelector } from 'app/store'
import { PATH } from 'common/utils/routes/Routes'

export const Packs = () => {
  const dispatch = useAppDispatch()
  const myID = useAppSelector(selectUserId)
  const totalCount = useAppSelector(selectCardPacksTotalCount)
  const pageCount = useAppSelector(selectPacksPageCount)
  const minCardsCount = useAppSelector(selectMinCardsCount)
  const maxCardsCount = useAppSelector(selectMaxCardsCount)
  const minCards = useAppSelector(selectPacksMinCards)
  const maxCards = useAppSelector(selectPacksMaxCards)
  const sortPacks = useAppSelector(selectPacksSort)
  const page = useAppSelector(selectPacksPage)
  const packName = useAppSelector(selectPacksName)
  const userId = useAppSelector(selectPacksUserId)
  const isAppMakeRequest = useAppSelector(selectIsAppMakeRequest)
  const [searchParams, setSearchParams] = useSearchParams()
  const isLoggedIn = useAppSelector(selectIsLoggedIn)
  const [disabled, setDisabled] = useState(false)
  const cardPacks = useAppSelector(selectCardPacks)
  const styleMU = useStyles()
  const [isFirstLoading, setIsFirstLoading] = useState(true)

  useEffect(() => {
    if (isLoggedIn && !isFirstLoading) {
      dispatch(getPacksTC())
    }
  }, [isFirstLoading, dispatch, page, pageCount, packName, sortPacks, userId, minCards, maxCards])

  useEffect(() => {
    const params = Object.fromEntries(searchParams)

    if (isFirstLoading) {
      dispatch(setPacksPageCountAC(+params.pageCount || 5))
      dispatch(setPacksPageAC(+params.page || 1))
      dispatch(setMinMaxCardsAC(+params.min || 0, +params.max || 0))
      dispatch(setPackNameAC(params.packName || ''))
      dispatch(setMyPacksAC(params.user_id || ''))
      setIsFirstLoading(false)
    }
  }, [])
  const handleAddPack = () => {
    const cardPack: AddPackRequestDataType = {
      cardsPack: {
        name: 'Pack Name',
        deckCover: '',
        private: false,
      },
    }

    dispatch(addPackTC(cardPack))
  }

  //Change pagination
  const handleChangePage = (event: React.ChangeEvent<unknown>, newPage: number) => {
    dispatch(setPacksPageAC(newPage + 1))
    setSearchParams({ ...searchParams, page: (newPage + 1).toString() })
  }
  const handleChangeRowsPerPage = (event: SelectChangeEvent) => {
    dispatch(setPacksPageCountAC(+event.target.value))
    dispatch(setPacksPageAC(1))
    setSearchParams({
      ...searchParams,
      page: '1',
      pageCount: event.target.value,
    })
  }

  const handleChangeCountCards = (event: any, newValue: number | number[]) => {
    const counts = newValue as number[]

    dispatch(setMinMaxCardsAC(counts[0], counts[1]))
    setSearchParams({
      ...searchParams,
      min: counts[0].toString(),
      max: counts[1].toString(),
    })
  }
  const handleSearchTitleCards = (value: string) => {
    dispatch(setPackNameAC(value))
    setSearchParams({ ...searchParams, packName: value })
  }
  //Delete Filters
  const handleDeleteAllFilters = () => {
    dispatch(setPackNameAC(''))
    dispatch(setMyPacksAC(''))
    dispatch(setMinMaxCardsAC(0, maxCardsCount))
    setSearchParams({
      page: '1',
      pageCount: '5',
      min: minCardsCount.toString(),
      max: maxCardsCount.toString(),
      packName: '' as string,
      user_id: '' as string,
    })
  }

  //Sort by my packs
  const handleSortByMyPacks = () => {
    dispatch(setMyPacksAC(myID))
    setSearchParams({ ...searchParams, user_id: myID as string })
    setDisabled(true)
  }
  const handleSortByAllPacks = () => {
    dispatch(setMyPacksAC(''))
    setSearchParams({ ...searchParams, user_id: '' })
    setDisabled(false)
  }

  if (!isLoggedIn) {
    return <Navigate to={PATH.login} />
  }

  return (
    <div className={s.container}>
      <div className={s.packsHeader}>
        <h3>Packs list</h3>
        <Button
          className={styleMU.button}
          onClick={handleAddPack}
          variant={'contained'}
          disabled={isAppMakeRequest}
        >
          Add new pack
        </Button>
      </div>
      <div className={s.packsBlock}>
        <div className={s.packsSearchBlock}>
          <div className={s.packsSearchTitle}>Search by pack name</div>
          <SearchTitleCards handleSendQuery={handleSearchTitleCards} />
        </div>

        <SortingByUser
          handleSortByAllPacks={handleSortByAllPacks}
          handleSortByMyPacks={handleSortByMyPacks}
          disabled={disabled}
        />
        <FilterCountCards handleChange={handleChangeCountCards} />
        <NoFilters handleDeleteAllFilters={handleDeleteAllFilters} />
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
      <ErrorSnackbar />
    </div>
  )
}
