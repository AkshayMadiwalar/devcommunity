import React from 'react'
import PropTypes from 'prop-types'
import moment from 'react-moment'
import Moment from 'react-moment'

const ProfileExperience = props => {
    return (
        <div>
            <h3 class="text-dark">{props.exp.company}</h3>
            <p><Moment format="YYYY/MM/DD">{props.exp.from}</Moment> - {props.exp.current ? 'Current' : <Moment format="YYYY/MM/DD">{props.exp.to}</Moment>}</p>
            <p><strong>Position: </strong>{props.exp.title}</p>
            <p>
                <strong>Description: </strong>  {props.exp.description}
            </p>
        </div>
    )
}

ProfileExperience.propTypes = {

}

export default ProfileExperience
