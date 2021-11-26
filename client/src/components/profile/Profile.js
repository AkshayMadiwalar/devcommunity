import React, { Fragment, useEffect } from 'react'
import { useParams } from 'react-router'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Spinner from '../layouts/Spinner'
import { getProfileById } from '../../actions/profile'
import { Link } from 'react-router-dom'
import auth from '../../reducers/auth'
import ProfileTop from './ProfileTop'
import ProfileAbout from './ProfileAbout'
import ProfileExperience from './ProfileExperience'
import Moment from 'react-moment'
import ProfileEducation from './ProfleEducation'
import ProfileGithub from './ProfileGithub'

const Profile = props => {
    const params = useParams()
    useEffect(() => {
        props.getProfileById(params.id)
    }, [props.getProfileById])

    const experiences = () => {
        const exps = []
        if (props.profile != null) {
            if (props.profile.experience != null) {
                if (props.profile.experience.length > 0) {
                    exps = props.profile.experience.length
                }
            }
        }
    }
    return (
        <Fragment>
            <Link to='/profiles' className="btn bn-light">
                Back to profiles
            </Link>
            {/* {!props.loading && props.auth.isAuthenticated && props.auth.user._id === props.profile.user._id
                && (<Link to="/edit-profile" className="btn btn-dark">Edit Profile</Link>)} */}
            {!props.loading && props.profile != null && (
                <Fragment>
                    <div className="profile-grid my-1">
                        <ProfileTop profile={props.profile} />
                        <ProfileAbout profile={props.profile} />
                        <div class="profile-exp bg-white p-2">
                        <h2 class="text-primary">Experience</h2>
                        {props.profile.experience.map(exp => (
                            <ProfileExperience exp={exp} />
                        ))}
                    </div>
                    <div class="profile-edu bg-white p-2">
                        <h2 class="text-primary">Education</h2>
                        {props.profile.education.map(edu =>(
                            <ProfileEducation edu={edu}/>
                        ))}
                    </div>
      
                    { props.profile.githubusername &&
                        (<ProfileGithub username={props.profile.githubusername}/> )
                    }
                    </div>


                </Fragment>
            )}
        </Fragment>
    )
}

Profile.propTypes = {

}

const mapStateToProps = state => ({
    profile: state.profile.profile,
    loading: state.profile.loading,
    auth: state.auth
})

export default connect(mapStateToProps, { getProfileById })(Profile)
