import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import Moment from 'react-moment'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { addLike } from '../../actions/post'
import { removeLike } from '../../actions/post'
import { deletePost } from '../../actions/post'

const PostItem = props => {
    return (
        <Fragment>
            <div class="post bg-white p-1 my-1">
                <div>
                    <a href="profile.html">
                        <img
                            class="round-img"
                            src={props.post.avatar}
                            alt=""
                        />
                        <h4>{props.post.name}</h4>
                    </a>
                </div>
                <div>
                    <p class="my-1">
                        {props.post.text}
                    </p>
                    <p class="post-date">
                        Posted on <Moment format="YYYY/MM/DD">{props.post.date}</Moment>
                    </p>
                    <button type="button" onClick={(e)=>props.addLike(props.post._id)} class="btn btn-light">
                        <i class="fas fa-thumbs-up"></i>
                        <span>{' '}{props.post.likes.length}</span>
                    </button>
                    <button onClick={(e)=>props.removeLike(props.post._id)} type="button" class="btn btn-light">
                        <i class="fas fa-thumbs-down"></i>
                    </button>
                    <Link to={`/posts/${props.post._id}`} class="btn btn-primary">
                        Discussion <span class='comment-count'>{props.post.comments.length}</span>
                    </Link>
                    {!props.post.loading && props.post.user === props.auth.user._id && (
                        <button
                            type="button"
                            onClick = {(e)=>props.deletePost(props.post._id)}
                            class="btn btn-danger"
                        >
                            <i class="fas fa-times"></i>
                        </button>
                    )}

                </div>
            </div>
        </Fragment>
    )
}

PostItem.propTypes = {

}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, {addLike,removeLike,deletePost})(PostItem)
