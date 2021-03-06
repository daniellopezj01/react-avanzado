import React, { useContext, Suspense } from 'react'
import { GlobalStyle } from './styles/GlobalStyles'
import { Logo } from './components/Logo'
import { NavBar } from './components/NavBar'

import { Home } from './pages/Home'
// import { User } from './pages/User'
// import { Favs } from './pages/Favs'
// import { NotFound } from './pages/NotFound'
// import { NotRegisteredUser } from './pages/NotRegisteredUser'
// import { Detail } from './pages/Detail'
import { Redirect, Router } from '@reach/router'
import { Context } from './Context'

const Favs = React.lazy(() => import('./pages/Favs'))
const User = React.lazy(() => import('./pages/User'))
// const Home = React.lazy(() => import('./pages/Home'))

const Detail = React.lazy(() => import('./pages/Detail'))
const NotRegisteredUser = React.lazy(() => import('./pages/NotRegisteredUser'))
const NotFound = React.lazy(() => import('./pages/NotFound'))

export const App = () => {
  const { isAuth } = useContext(Context)
  return (
    <Suspense fallback={<div />}>
      <GlobalStyle />
      <Logo />
      <Router>
        <NotFound default />
        <Home path='/' />
        <Home path='/pet/:categoryId' />
        <Detail path='/detail/:detailId' />
        {!isAuth && <NotRegisteredUser path='/login' />}
        {!isAuth && <Redirect from='/favs' to='/login' />}
        {!isAuth && <Redirect from='/user' to='/login' />}
        {isAuth && <Redirect from='/login' to='/' />}
        <Favs path='/favs' />
        <User path='/user' />
      </Router>
      <NavBar />
    </Suspense>
  )
}
