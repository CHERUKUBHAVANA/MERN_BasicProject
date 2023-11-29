import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import App from './App'
import Signup from './auth-components/Signup'
import Signin from './auth-components/Signin'
import Activate from './auth-components/Activate'

const MyRoutes = () => {
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" exact Component={App}/>
                <Route path="/signin" exact element={<Signin/>}/>
                <Route path="/signup" exact element={<Signup/>}/>
                <Route path="/auth/activate/:token" exact element={<Activate/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default MyRoutes