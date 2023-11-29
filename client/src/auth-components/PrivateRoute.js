import React, { Component } from 'react'
import { Route, Navigate } from 'react-router-dom'
import { isAuth } from './helpers'

const PrivateRoute = ({ children }) => {
    
    if (!isAuth()) {
        return <Navigate to="/signin" />
    }
    return children;
}
export default PrivateRoute