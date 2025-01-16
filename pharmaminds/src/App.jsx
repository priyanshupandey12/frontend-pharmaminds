import React from 'react'
import Body from './components/Body'
import HomePage from './components/Home'
import SignInPage from './components/Signup'
import LoginPage from './components/login'
import {  Routes, Route, BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store/store'


const App = () => {
  return (
    <Provider store={store}>
     <BrowserRouter basename="/">
      
      <Routes>
      <Route path="/" element={<Body />} >
      <Route index element={<HomePage />} />
       
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/login" element={<LoginPage />} />
        
        </Route>
      </Routes>



     </BrowserRouter>
     </Provider>
  )
}

export default App