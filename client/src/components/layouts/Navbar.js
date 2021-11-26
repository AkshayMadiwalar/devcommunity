import React, { Fragment } from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import { logout } from '../../actions/auth'

function Navbar(props) {
    const authLinks = (
        <ul>
            <li><Link to="/profiles">Developers</Link></li>
            <li><Link to="/posts">Posts</Link></li>
        <li><a onClick={props.logout}>
            <i className="fas fa-sign-out-alt">LogOut</i></a></li>
        
        </ul>
    )
    const guestLinks = (
        <ul>
        <li><Link to="/profiles">Developers</Link></li>
        <li><Link to="/register">Register</Link></li>
        <li><Link to="/login">Login</Link></li>
        </ul>
    )
    return (
        <nav class="navbar bg-dark">
            <h1>
                <Link to="/"><i class="fas fa-code"></i> DevConnector</Link>
            </h1>
            {!props.auth.loading && !props.auth.isAuthenticated  && guestLinks}
            {!props.auth.loading && props.auth.isAuthenticated && authLinks}
            
                </nav>
    )
}

const mapStateToProps = state => ({
    auth : state.auth
})

export default connect(mapStateToProps,{logout})(Navbar)
