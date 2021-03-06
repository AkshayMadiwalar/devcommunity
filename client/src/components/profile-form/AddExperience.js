import React, { Fragment, useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { addExperience } from '../../actions/profile'
import { Link } from 'react-router-dom'

const AddExperience = props => {
    const [formData,setFormData] = useState({
        company:'',
        title:'',
        location:'',
        from:'',
        to:'',
        current:false,
        description:''
    })
    const [toDateDisabled,toggleDisabled] = useState(false)
    const {company,title,location,from,to,current,description} = formData
    const onChangeData = (e) =>{
        setFormData({...formData,[e.target.name]:e.target.value})
    }

    const onSubmitData = (e) => {
        e.preventDefault()
        console.log('exp')
        props.addExperience(formData)
    }

    return (
        <Fragment>
            <h1 class="large text-primary">
                Add An Experience
            </h1>
            <p class="lead">
                <i class="fas fa-code-branch"></i> Add any developer/programming
                positions that you have had in the past
            </p>
            <small>* = required field</small>
            <form class="form" onSubmit={(e)=>onSubmitData(e)}>
                <div class="form-group">
                    <input type="text" placeholder="* Job Title" name="title" value={title} onChange={(e)=>onChangeData(e)} required />
                </div>
                <div class="form-group">
                    <input type="text" placeholder="* Company" name="company" value={company} onChange={(e)=>onChangeData(e)} required />
                </div>
                <div class="form-group">
                    <input type="text" placeholder="Location" name="location" value={location} onChange={(e)=>onChangeData(e)} />
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
                    /> &nbsp;Current Job</p>
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
                        placeholder="Job Description"
                        value={description} onChange={(e)=>onChangeData(e)}
                    ></textarea>
                </div>
                <input type="submit" class="btn btn-primary my-1" />
                <Link class="btn btn-light my-1" to="/dashboard">Go Back</Link>
            </form>
        </Fragment>
    )
}

AddExperience.propTypes = {

}

export default connect(null, { addExperience })(AddExperience)
