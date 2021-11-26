import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Navigate, Route , Routes, Outlet} from 'react-router'
import Dashboard from '../Dashboard'

const PrivateRoute = ({component: Component, auth: {isAuthenticated, loading}, ...rest}) => {
    if(!isAuthenticated && !loading){
        return <Navigate to="/login"/>
    }
    return <Outlet/>
}

PrivateRoute.propTypes = {
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
})
export default connect(mapStateToProps)(PrivateRoute)
