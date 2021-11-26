import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

const ProfileAbout = props => {
    return (
        <Fragment>
            <div class="profile-about bg-light p-2">
                <h2 class="text-primary">{props.profile.bio}</h2>
                <p>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sed
                    doloremque nesciunt, repellendus nostrum deleniti recusandae nobis
                    neque modi perspiciatis similique?
                </p>
                <div class="line"></div>
                <h2 class="text-primary">Skill Set</h2>
                <div class="skills">
                    {props.profile.skills.length > 0 && props.profile.skills.map(skill =>(
                        <div class="p-1"><i class="fa fa-check"></i> {skill}</div>
                    ))}
                    
                </div>
            </div>
        </Fragment>
    )
}

ProfileAbout.propTypes = {

}

export default ProfileAbout
