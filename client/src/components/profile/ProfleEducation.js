import React from 'react'
import PropTypes from 'prop-types'
import moment from 'react-moment'
import Moment from 'react-moment'

const ProfileEducation = props => {
    return (
        <div>
            <h3 class="text-dark">{props.edu.school}</h3>
            <p><Moment format="YYYY/MM/DD">{props.edu.from}</Moment> - {props.edu.current ? 'Current' : <Moment format="YYYY/MM/DD">{props.edu.to}</Moment>}</p>
            <p><strong>Position: </strong>{props.edu.degree}</p>
            <p><strong>Field of Study: </strong>{props.edu.fieldofstudy}</p> 
            <p>
                <strong>Description: </strong>  {props.edu.description}
            </p>
        </div>
    )
}



export default ProfileEducation
