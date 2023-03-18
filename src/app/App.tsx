import React, { useEffect } from 'react'

import { Outlet } from 'react-router-dom'

import { Header } from '../common/components/Header/Header'
import { Spinner } from '../common/components/Spinner'

import { initializeAppTC } from './app-reducer'
import s from './App.module.css'
import { selectIsAppInitialized } from './selectors'
import { useAppDispatch, useAppSelector } from './store'

function App() {
  const isAppInitialized = useAppSelector(selectIsAppInitialized)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(initializeAppTC())
  }, [])

  if (!isAppInitialized) {
    return <Spinner />
  }

  return (
    <div className={s.App}>
      <Header />
      <div className={s.appWrapper}>
        <Outlet />
      </div>
    </div>
  )
}

export default App
