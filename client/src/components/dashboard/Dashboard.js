import React, {Fragment, useEffect} from 'react'
import PropTypes from 'prop-types'
import {connect } from 'react-redux'
import { getCurrentProfile } from '../../actions/profile'
import Spinner from '../layouts/Spinner'
import {Link} from 'react-router-dom'
import DashboardActions from './DashboardActions'
import Experience from './Experience'
import Education from './Education'
import { deleteAccount } from '../../actions/profile'

const Dashboard = props => {
    useEffect(()=>{
        props.getCurrentProfile()
    },[])

    return props.auth.loading && props.profile == null ? <Spinner /> : <Fragment>
        <h1 className="large text-primary">Dashboard</h1>
        <p className="lead"><i className="fas fa-user"></i>&nbsp;&nbsp;&nbsp;Welcome {props.auth.user && props.auth.user.name}</p>

        {props.profile.profile !== null ? 
        (<Fragment> 
            <DashboardActions/> 
            <Experience experience = {props.profile.profile.experience}/>
            <Education education = {props.profile.profile.education} />
            <div className="my-2">
                <button className="btn btn-danger" onClick={()=>props.deleteAccount()}>
                    <i className="fas fa-user-minus"></i>Delete Account
                </button>
            </div>
        </Fragment>) :
        (<Fragment>
            <p>You have not yet setup profile, please add some info</p>
            <Link to="/create-profile" className="btn btn-primary my-1">Create Profile</Link>
        </Fragment>)
        }
    </Fragment>
}

Dashboard.propTypes = {

}

const mapStateToProps = state => ({
    profile:state.profile,
    auth: state.auth
})

export default connect(mapStateToProps,{getCurrentProfile,deleteAccount})(Dashboard)
