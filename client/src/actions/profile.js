import axios from 'axios'
import { setAlert } from './alert'
import { CLEAR_PROFILE, GET_PROFILE,PROFILE_ERROR, UPDATE_PROFILE, ACCOUNT_DELETED, GET_PROFILES, GET_REPOS } from './constants'

export const getCurrentProfile = () => async dispatch => {
    try {
        const res = await axios.get('/profile/me')
        dispatch({
            type:GET_PROFILE,
            payload:res.data
        })
    } catch (error) {
        console.log(error)
        dispatch({
            type:PROFILE_ERROR,
            payload: {msg: error.response.statusText, status: error.response.status}
        })
    }
}

export const createProfile = (formData, edit = false) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type':'application/json'
            }
        }
        const res = await axios.post('/profile/addprofile',formData,config)
        console.log(res)
        dispatch({
            type:GET_PROFILE,
            payload:res.data
        })
        dispatch(setAlert(edit ? 'Profile updated' : 'Profile created','success'))

    } catch (error) {
        dispatch({
            type:PROFILE_ERROR,
            payload: {msg: error.response.statusTExt, status: error.response.status}
        })
    }
}

export const addExperience = (formData) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type':'application/json'
            }
        }
        console.log(formData)
        const res = await axios.post('/profile/experience',formData,config)
        console.log(res)
        dispatch({
            type:UPDATE_PROFILE,
            payload:res.data
        })
        dispatch(setAlert('Experience added','success'))

    } catch (error) {
        dispatch({
            type:PROFILE_ERROR,
            payload: {msg: error.response.statusTExt, status: error.response.status}
        })
    }
}



export const addEducation = (formData) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type':'application/json'
            }
        }
        const res = await axios.post('/profile/education',formData,config)
        console.log(res)
        dispatch({
            type:UPDATE_PROFILE,
            payload:res.data
        })
        dispatch(setAlert('Education added','success'))

    } catch (error) {
        dispatch({
            type:PROFILE_ERROR,
            payload: {msg: error.response.statusTExt, status: error.response.status}
        })
    }
}

export const deleteExperience = id => async dispatch => {
    try {
        const res = await axios.delete(`/profile/experience/${id}`)
        console.log(res)
        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        })
        dispatch(setAlert('Experience Deleted','success'))
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: err.response.statusText, status:err.response.statusCode}
        })
    }
}

export const deleteEducation = id => async dispatch => {
    try {
        const res = await axios.delete(`/profile/education/${id}`)
        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        })
        dispatch(setAlert('Education Deleted','success'))
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: err.response.statusText, status:err.response.statusCode}
        })
    }
}

export const deleteAccount = () => async dispatch => {
    if(window.confirm('Are you sure? This cannot be undone!')){
        try {
            const res = await axios.delete("/profile")

            dispatch({type:CLEAR_PROFILE})
            dispatch({type:ACCOUNT_DELETED})
            dispatch(setAlert('Your account has been deleted!','danger'))
        } catch (error) {
            
        }
    }
}

export const getProfiles = () => async dispatch => {
    try {
        const res = await axios.get('/profile')
        console.log(res)
        dispatch({
            type:GET_PROFILES,
            payload:res.data
        })
    } catch (error) {
        console.log(error)
        dispatch({
            type:PROFILE_ERROR,
            payload: {msg: error.response.statusText, status: error.response.status}
        })
    }
}

export const getProfileById = (id) => async dispatch => {
    try {
        console.log(id)
        const res = await axios.get(`/profile/${id}`)
        console.log(res)
        dispatch({
            type:GET_PROFILE,
            payload:res.data
        })
    } catch (error) {
        console.log(error)
        dispatch({
            type:PROFILE_ERROR,
            payload: {msg: error.response.statusText, status: error.response.status}
        })
    }
}


export const getRepos = (username) => async dispatch => {
    try {
        const res = await axios.get(`/profile/github/${username}`)
        dispatch({
            type:GET_REPOS,
            payload:res.data
        })
        console.log(res)
    } catch (error) {
        console.log(error)
        dispatch({
            type:PROFILE_ERROR,
            payload: {msg: error.response.statusText, status: error.response.status}
        })
    }
}