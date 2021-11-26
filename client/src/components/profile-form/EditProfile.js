import React, {Fragment, useState, useEffect} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createProfile, getCurrentProfile } from '../../actions/profile'
import {Link} from 'react-router-dom'

const EditProfile = props => {
    useEffect(()=>{
        getCurrentProfile();
        setFormData({
            company: !props.loading && !props.profile.company ? '' : props.profile.company,
            website: !props.loading && !props.profile.website ? '' : props.profile.website,
            location: !props.loading && !props.profile.location ? '' : props.profile.location,
            status: !props.loading && !props.profile.status ? '' : props.profile.status,
            skills: !props.loading && !props.profile.skills ? '' : props.profile.skills,
            githubusername: !props.loading && !props.profile.githubusername ? '' : props.profile.githubusername,
            bio: !props.loading && !props.profile.bio ? '' : props.profile.bio,
            twitter: !props.loading && !props.profile.social && props.profile.social.twitter!=undefined && !props.profile.social.twitter ? '' : props.profile.social.twitter,
            facebook: !props.loading && !props.profile.social && !props.profile.social.facebook ? '' : props.profile.social.facebook,
            linkedin: !props.loading && !props.profile.social && !props.profile.social.linkedin ? '' : props.profile.social.linkedin,
            youtube: !props.loading && !props.profile.social && !props.profile.social.youtube ? '' : props.profile.social.youtube,
            instagram: !props.loading && !props.profile.social && !props.profile.social.instagram ? '' : props.profile.social.instagram
        })
    },[props.loading])
    const [formData, setFormData] = useState(
        {
            company: '',
            website: '',
            location: '',
            status: '',
            skills: '',
            githubusername: '',
            bio :'',
            twitter: '',
            facebook:'',
            linkedin:'',
            youtube: '',
            instagram: ''
        }
    )

    const [displaySocialInputs,toogleDisplaySocialInputs] = useState(false)

    const onChangeData = (e) => {
        setFormData({...formData,[e.target.name]:e.target.value})
    }

    const onSubmitData = (e) =>{
      e.preventDefault()
      console.log("sending data")
      props.createProfile(formData,true)
    }

    const {
        company,
        website,
        location,
        status,
        skills,
        githubusername,
        bio,
        twitter,
        facebook,
        linkedin,
        youtube,
        instagram
    } = formData
    return (
        <div>
              <h1 className="large text-primary">
        Create Your Profile
      </h1>
      <p className="lead">
        <i className="fas fa-user"></i> Let's get some information to make your
        profile stand out
      </p>
      <small>* = required field</small>
      <form className="form" onSubmit={(e)=>onSubmitData(e)}>
        <div className="form-group">
          <select name="status" value={status} onChange={(e)=>onChangeData(e)}>
            <option value="0">* Select Professional Status</option>
            <option value="Developer">Developer</option>
            <option value="Junior Developer">Junior Developer</option>
            <option value="Senior Developer">Senior Developer</option>
            <option value="Manager">Manager</option>
            <option value="Student or Learning">Student or Learning</option>
            <option value="Instructor">Instructor or Teacher</option>
            <option value="Intern">Intern</option>
            <option value="Other">Other</option>
          </select>
          <small className="form-text"
            >Give us an idea of where you are at in your career</small
          >
        </div>
        <div className="form-group">
          <input type="text" placeholder="Company" name="company" value={company} onChange={(e)=>onChangeData(e)} />
          <small className="form-text"
            >Could be your own company or one you work for</small
          >
        </div>
        <div className="form-group">
          <input type="text" placeholder="Website" name="website" value={website} onChange={(e)=>onChangeData(e)} />
          <small className="form-text"
            >Could be your own or a company website</small
          >
        </div>
        <div className="form-group">
          <input type="text" placeholder="Location" name="location" value={location} onChange={(e)=>onChangeData(e)}/>
          <small className="form-text"
            >City & state suggested (eg. Boston, MA)</small
          >
        </div>
        <div className="form-group">
          <input type="text" placeholder="* Skills" name="skills" value={skills} onChange={(e)=>onChangeData(e)}/>
          <small className="form-text"
            >Please use comma separated values (eg.
            HTML,CSS,JavaScript,PHP)</small
          >
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Github Username"
            name="githubusername"
            value={githubusername} onChange={(e)=>onChangeData(e)}
          />
          <small className="form-text"
            >If you want your latest repos and a Github link, include your
            username</small
          >
        </div>
        <div className="form-group">
          <textarea placeholder="A short bio of yourself" name="bio" value={bio} onChange={(e)=>onChangeData(e)}></textarea>
          <small className="form-text">Tell us a little about yourself</small>
        </div>

        <div className="my-2">
          <button onClick={()=>toogleDisplaySocialInputs(!displaySocialInputs)} type="button" className="btn btn-light">
            Add Social Network Links
          </button>
          <span>Optional</span>
        </div>

     { displaySocialInputs && <Fragment>
        <div className="form-group social-input">
          <i className="fab fa-twitter fa-2x"></i>
          <input type="text" placeholder="Twitter URL" name="twitter" value={twitter} onChange={(e)=>onChangeData(e)}/>
        </div>

        <div className="form-group social-input">
          <i className="fab fa-facebook fa-2x"></i>
          <input type="text" placeholder="Facebook URL" name="facebook" value={facebook} onChange={(e)=>onChangeData(e)} />
        </div>

        <div className="form-group social-input">
          <i className="fab fa-youtube fa-2x"></i>
          <input type="text" placeholder="YouTube URL" name="youtube" value={youtube} onChange={(e)=>onChangeData(e)}/>
        </div>

        <div className="form-group social-input">
          <i className="fab fa-linkedin fa-2x"></i>
          <input type="text" placeholder="Linkedin URL" name="linkedin" value={linkedin} onChange={(e)=>onChangeData(e)}/>
        </div>

        <div className="form-group social-input">
          <i className="fab fa-instagram fa-2x"></i>
          <input type="text" placeholder="Instagram URL" name="instagram" value={instagram} onChange={(e)=>onChangeData(e)}/>
        </div>
  
         </Fragment>}


      <input type="submit" className="btn btn-primary my-1" />
        <Link className="btn btn-light my-1" to="/dashboard">Go Back</Link>
      </form>

        </div>
    )
}


const mapStateToProps = state => ({
    profile:state.profile.profile,
    loading:state.auth.loading
})

export default connect(mapStateToProps,{createProfile,getCurrentProfile})(EditProfile)
