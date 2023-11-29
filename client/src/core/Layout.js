import React, {Fragment} from 'react'
import {Link} from 'react-router-dom'
import withRouter from './WithRouter'
const Layout = ({children, router}) =>{
    const {location} = router

    const pathname = location.pathname

    const isActive = (path) => {
        if(path===pathname){
            return {color: "black"}
        }
        else{
            return {color: "white"}
        }
    }
    const nav = () => {
        return (<ul className='nav nav-tabs bg-primary'>
            <li className='nav-item'>
                <Link to='/' className=' nav-link' style={isActive('/')}>
                    Home
                </Link>
            </li>
            <li className='nav-item'>
                <Link to='/signin' className=' nav-link' style={isActive('/signin')}>
                    Signin
                </Link>
            </li>
            <li className='nav-item'>
                <Link to='/signup' className=' nav-link' style={isActive('/signup')}>
                    Signup
                </Link>
            </li>
            
        </ul>)
    }
    return(
        <Fragment>
            {nav()}
            <div className='container'>
                {children}
            </div>
        </Fragment>
    )
}
export default withRouter(Layout);