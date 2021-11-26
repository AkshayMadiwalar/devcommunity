import { config } from '@fortawesome/fontawesome-svg-core'
import axios from 'axios'
import { LOGIN_FAIL, LOGIN_SUCCESS, REGISTER_FAIL,REGISTER_SUCCESS, USER_LOADED, AUTH_ERROR, LOGOUT, CLEAR_PROFILE } from './constants'
import { setAlert } from './alert'
import  setAuthToken  from '../utils/setAuthToken'

//RegisterUSer
export const register = ({name,email,password}) => async dispatch => {
     console.log("jds")
    const config = {
        headers :{
            'Content-Type':'application/json'
        }
    }

    const body = JSON.stringify({name,email,password})
    console.log(body)
    try {
        console.log("try")
        const res = await axios.post('/users/register',body,config)
        console.log(res)
        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        })
        dispatch(loadUser)
        dispatch(setAlert("Registered!",'success'))
    } catch (error) {
        console.log(error)
        dispatch(setAlert("Failed to register",'danger'))
        dispatch({
            type:REGISTER_FAIL
        })
    }
}

export const loginAction = (email,password) => async dispatch => {
    const config = {
        headers : {
            'Content-Type':'application/json'
        }
    }
    const body = JSON.stringify({email,password})
    console.log(email)
    console.log(password)
    console.log(body)
    try {
        const res = await axios.post('/auth/login',body,config)
        console.log(res)
        dispatch({
            type:LOGIN_SUCCESS,
            payload: res.data
        })
        dispatch(loadUser())
    } catch (error) {
        console.log(error)
        dispatch({
            type:LOGIN_FAIL
        })
    }
}

export const loadUser = () => async dispatch => {
    if(localStorage.token){
        setAuthToken(localStorage.token)
    }
    try {
        const res = await axios.get('/auth')
        dispatch({
            type:USER_LOADED,
            payload:res.data
        })

    } catch (error) {
        dispatch({
            type:AUTH_ERROR
        })
    }
}

export const logout = () => dispatch => {
    dispatch({type:LOGOUT})
    dispatch({type:CLEAR_PROFILE})
}