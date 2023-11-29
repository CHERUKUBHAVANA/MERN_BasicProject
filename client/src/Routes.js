import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import App from './App'
import Signup from './auth-components/Signup'
import Signin from './auth-components/Signin'
import Activate from './auth-components/Activate'
import Private from './core/Private'
import PrivateRoute from './auth-components/PrivateRoute'
const MyRoutes = () => {
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" exact Component={App}/>
                <Route path="/signin" exact element={<Signin/>}/>
                <Route path="/signup" exact element={<Signup/>}/>
                <Route path="/auth/activate/:token" exact element={<Activate/>}/>
                <Route path="/private" element={<PrivateRoute><Private/></PrivateRoute>} />
            </Routes>
        </BrowserRouter>
    )
}

export default MyRoutes