import { config } from "@fortawesome/fontawesome-svg-core";
import axios from "axios";
import { setAlert } from "./alert";
import { ADD_COMMENT, ADD_POST, DELETE_POST, GET_POST, GET_POSTS,POST_ERROR, REMOVE_COMMENT, SET_ALERT, UPDATE_LIKES } from "./constants";

export const getPosts = () => async dispatch => {
    try {
        const res = await axios.get('/posts')
        dispatch({
            type:GET_POSTS,
            payload:res.data
        })
    } catch (error) {
        dispatch({
            type:POST_ERROR,
            payload:{msg:error.response.statusText}
        })
    }
}

export const addLike = (postId) => async dispatch => {
    try {
        console.log(postId)
        const res = await axios.put(`/posts/like/${postId}`)
        dispatch({
            type:UPDATE_LIKES,
            payload: {postId, likes: res.data.likes}
        })
    } catch (error) {
        if(error.response.status === 400 ){
            dispatch(setAlert('Post already liked!','danger'))
        }

        dispatch({
            type:POST_ERROR,
            payload:{msg:error.response.statusText}
        })
    }
}

export const removeLike = (postId) => async dispatch => {
    try {
        const res = await axios.put(`/posts/unlike/${postId}`)
        dispatch({
            type:UPDATE_LIKES,
            payload: {postId, likes: res.data.likes}
        })
    } catch (error) {
        console.log(error)
        dispatch({
            type:POST_ERROR,
            payload:{msg:error.response.statusText}
        })
    }
}


export const deletePost = (postId) => async dispatch => {
    try {
        const res = await axios.delete(`/posts/${postId}`)
        dispatch({
            type:DELETE_POST,
            payload: postId
        })
        dispatch(setAlert('Post Deleted!','success'))
    } catch (error) {
        console.log(error)
        dispatch({
            type:POST_ERROR,
            payload:{msg:error.response.statusText}
        })
    }
}

export const addPost = (formData) => async dispatch => {
    const config = {
        headers : {
            'Content-Type':'application/json'
        }
    }
    try {
        const res = await axios.post(`/posts/`,formData,config)

        dispatch({
            type:ADD_POST,
            payload: res.data
        })
        dispatch(setAlert('Post Added!','success'))
    } catch (error) {
        dispatch({
            type:POST_ERROR,
            payload:{msg:error.response.statusText}
        })
    }
}

export const getPost = (id) => async dispatch => {
    try {
        const res = await axios.get(`/posts/${id}`)
        dispatch({
            type:GET_POST,
            payload: res.data
        })
    } catch (error) {
        dispatch({
            type:POST_ERROR,
            payload:{msg:error.response.statusText}
        })
    }
}

export const addComment = (id,formData) => async dispatch => {
    try {
        const cofig = {
            headers:{
                'Content-Type':'application/json'
            }
        }
        const res = await axios.post(`/posts/comment/${id}`,formData,config)
        dispatch({
            type:ADD_COMMENT,
            payload: res.data
        })
        dispatch(setAlert('Comment added','success'))
    } catch (error) {
        dispatch({
            type:POST_ERROR,
            payload:{msg:error.response.statusText}
        })
    }
}

export const deleteComment = (id,commentId) => async dispatch => {
    try {
        const res = await axios.delete(`/posts/comment/${id}/${commentId}`)
        dispatch({
            type:REMOVE_COMMENT,
            payload:  commentId
        })
        dispatch(setAlert('Comment Deleted','success'))
    } catch (error) {
        dispatch({
            type:POST_ERROR,
            payload:{msg:error.response.statusText}
        })
    }
}

