import React, {useState} from 'react'
import { connect } from 'react-redux'
import { loginAction } from '../../actions/auth'
import { loadUser} from '../../actions/auth'
import {Navigate} from 'react-router-dom'

function Login(props) {
    const [formData,setFormData] = useState({
        email:"",
        password:""
    })
    const {email,password} = formData

    function onChangeData(e){
        setFormData({...formData,[e.target.name]:e.target.value})
    }

    function onSubmitData(e){
        e.preventDefault()
        props.loginAction(email,password)
    }

    if(props.isAuthenticated){
        return <Navigate to="/dashboard"/>
    }

    return (
        <div>
            <section class="container">
                <div class="alert alert-danger">
                    Invalid credentials
                </div>
                <h1 class="large text-primary">Sign In</h1>
                <p class="lead"><i class="fas fa-user"></i> Sign into Your Account</p>
                <form class="form" action="dashboard.html" onSubmit={(e)=>{onSubmitData(e)}}>
                    <div class="form-group">
                        <input
                            type="email"
                            placeholder="Email Address"
                            name="email"
                            value={email}
                            onChange={(e)=>{onChangeData(e)}}
                            required
                        />
                    </div>
                    <div class="form-group">
                        <input
                            type="password"
                            placeholder="Password"
                            name="password"
                            value={password}
                            onChange={(e)=>{onChangeData(e)}}
                        />
                    </div>
                    <input type="submit" class="btn btn-primary" value="Login" />
                </form>
                <p class="my-1">
                    Don't have an account? <a href="register.html">Sign Up</a>
                </p>
            </section>
        </div>
    )
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps,{loginAction})(Login)
