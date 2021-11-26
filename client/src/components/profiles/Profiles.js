import React, {Fragment, useEffect} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Spinner from '../layouts/Spinner'
import { getProfiles } from '../../actions/profile'
import ProfileItem from './ProfileItem'

const Profiles = props => {
    useEffect(()=>{
        props.getProfiles()
    },[])
    return (
        <Fragment>
            <h1 className="large text-primary">Developers</h1>
                    <p className="lead">
                        <i className="fab fa-connectdevelop"></i>
                        Browse and connect with Developers
                    </p>  
                    <div className="profiles">
                        {props.profiles.length > 0 ? (
                                props.profiles.map(profile => (
                                    <ProfileItem key={profile._id} profile={profile}/>
                                ))
                            ) : (
                            <h4>No Profiles found.!</h4>
                        )}
                    </div>
        </Fragment>
    )
}

Profiles.propTypes = {

}

const mapStateToProps = state => ({
    profiles: state.profile.profiles,
    loading: state.profile.loading
})

export default connect(mapStateToProps,{getProfiles})(Profiles)
