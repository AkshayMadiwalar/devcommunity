import React,{Fragment,useEffect} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getPosts } from '../../actions/post'
import PostItem from './PostItem'
import PostForm from './PostForm'

const Post = props => {
    useEffect(()=>{
        props.getPosts()
    },[])

    let posts = []
    if(props.post !=null){
        if(props.post.posts != null){
            posts = props.post.posts
        }
    }

    return (
        <Fragment>
            <h1 className="large text-primary">Posts</h1>
            <p className="lead">
                <i className="fas fa-user"/>Welcome to the Community
            </p>
            <PostForm />
            {posts.map(post => (
                <PostItem post={post}/>
            ))}
            
        </Fragment>
    )
}

Post.propTypes = {

}

const mapStateToProps = state => ({
    post : state.post    
})
export default connect(mapStateToProps,{getPosts})(Post)
