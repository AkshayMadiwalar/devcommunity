import React, { Fragment, useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { addEducation } from '../../actions/profile'
import { Link } from 'react-router-dom'

const AddEducation = props => {
    const [formData,setFormData] = useState({
        school:'',
        degree:'',
        fieldofstudy:'',
        from:'',
        to:'',
        current:false,
        description:''
    })
    const [toDateDisabled,toggleDisabled] = useState(false)
    const {school,degree,fieldofstudy,from,to,current,description} = formData
    const onChangeData = (e) =>{
        setFormData({...formData,[e.target.name]:e.target.value})
    }

    const onSubmitData = (e) => {
        e.preventDefault()
        console.log('exp')
        props.addEducation(formData)
    }

    return (
        <Fragment>
            <h1 class="large text-primary">
                Add Education
            </h1>
            <p class="lead">
                <i class="fas fa-code-branch"></i> Add any school/bootcamp
                 that you have attended in the past
            </p>
            <small>* = required field</small>
            <form class="form" onSubmit={(e)=>onSubmitData(e)}>
                <div class="form-group">
                    <input type="text" placeholder="* School" name="school" value={school} onChange={(e)=>onChangeData(e)} required />
                </div>
                <div class="form-group">
                    <input type="text" placeholder="* Degree" name="degree" value={degree} onChange={(e)=>onChangeData(e)} required />
                </div>
                <div class="form-group">
                    <input type="text" placeholder="Field of Study" name="fieldofstudy" value={fieldofstudy} onChange={(e)=>onChangeData(e)} />
                </div>
                <div class="form-group">
                    <h4>From Date</h4>
                    <input type="date" name="from" value={from} onChange={(e)=>onChangeData(e)} />
                </div>
                <div class="form-group">
                    <p><input type="checkbox" name="current" value={current} checked={current} 
                     onChange={(e)=>{
                         setFormData({...formData,current:!current})
                         toggleDisabled(!toggleDisabled)
                     }}
                    /> &nbsp;Current School</p>
                </div>
                <div class="form-group">
                    <h4>To Date</h4>
                    <input type="date" name="to" 
                    disabled={toDateDisabled ? 'disabled' : ''}
                    value={to} onChange={(e)=>onChangeData(e)} />
                </div>
                <div class="form-group">
                    <textarea
                        name="description"
                        cols="30"
                        rows="5"
                        placeholder="Program Description"
                        value={description} onChange={(e)=>onChangeData(e)}
                    ></textarea>
                </div>
                <input type="submit" class="btn btn-primary my-1" />
                <Link class="btn btn-light my-1" to="/dashboard">Go Back</Link>
            </form>
        </Fragment>
    )
}

AddEducation.propTypes = {

}

export default connect(null, { addEducation })(AddEducation)
