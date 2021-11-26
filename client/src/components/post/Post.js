import React, { Fragment, useEffect } from 'react'
import { useParams } from 'react-router'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getPost } from '../../actions/post'
import Moment from 'react-moment'
import CommentForm from './CommentForm'
import CommentItem from './CommentItem'
const Post = props => {
    const params = useParams()
    useEffect(() => {
        props.getPost(params.id)
    }, [])

    return (
        <Fragment>
            {props.post != null && (
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
                    </div>
                </div>

            )}

            {props.post != null && (
                <Fragment>
                    <CommentForm post={props.post} />
                    <div class="comments">
                        {props.post.comments.map(comment => (
                            <CommentItem comment={comment} />
                        ))}
                    </div>
                </Fragment>
            )}

        </Fragment>
    )
}

Post.propTypes = {

}

const mapStateToProps = state => ({
    post: state.post.post
})

export default connect(mapStateToProps, { getPost })(Post)
