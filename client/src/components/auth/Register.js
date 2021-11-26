import { set } from 'mongoose'
import React, {useState} from 'react'
import {connect} from 'react-redux'
import { setAlert } from '../../actions/alert'
import { register } from '../../actions/auth'
import PropTypes from 'prop-types'
import { Navigate } from 'react-router'

function Register(props) {
    const [formData, setFormData] = useState({
        name:"",
        email:"",
        password:"",
        confirmPasswrod:""
    })

    const {name,email,password,confirmPasswrod} = formData

    function onChangeData(e){
        setFormData({...formData,[e.target.name]:e.target.value})
    } 

    function onSubmitData(e){
        e.preventDefault()
        if(password !== confirmPasswrod){
            props.setAlert("Passwords doesn't match!","danger",3000)
        }else{
            props.register({name,email,password})
        }
    }


    if(props.isAuthenticated){
        return <Navigate to="/dashboard"/>
    }

    return (
        <div>
            <section class="container">
                <h1 class="large text-primary">Sign Up</h1>
                <p class="lead"><i class="fas fa-user"></i> Create Your Account</p>
                <form class="form" action="create-profile.html" onSubmit={(e)=>{onSubmitData(e)}}>
                    <div class="form-group">
                        <input type="text" placeholder="Name" name="name" value={name} onChange={(e) => {onChangeData(e)} }  />
                    </div>
                    <div class="form-group">
                        <input type="email" placeholder="Email Address" name="email" value={email} onChange={(e) =>{ onChangeData(e)}}/>
                        <small class="form-text"
                        >This site uses Gravatar so if you want a profile image, use a
                            Gravatar email</small
                        >
                    </div>
                    <div class="form-group">
                        <input
                            type="password"
                            placeholder="Password"
                            name="password"
                            minLength="6"
                            value={password}
                            onChange={(e)=>{onChangeData(e)}}
                        />
                    </div>
                    <div class="form-group">
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            name="confirmPasswrod"
                            minLength="6"
                            value={confirmPasswrod}
                            onChange= {e=>onChangeData(e)}
                        />
                    </div>
                    <input type="submit" class="btn btn-primary" value="Register" />
                </form>
                <p class="my-1">
                    Already have an account? <a href="login.html">Sign In</a>
                </p>
            </section>
        </div>
    )
}

Register.propTypes = {
    setAlert: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    isAuthenticated : state.auth.isAuthenticated
})

export default connect(mapStateToProps,{setAlert,register})(Register)
