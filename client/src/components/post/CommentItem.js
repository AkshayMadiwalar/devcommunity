import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Moment from 'react-moment'
import { deleteComment } from '../../actions/post'

const CommentItem = props => {
    return (
        <Fragment>
        <div class="post bg-white p-1 my-1">
            <div>
                <a href="profile.html">
                    <img
                        class="round-img"
                        src={props.comment.avatar}
                        alt=""
                    />
                    <h4>{props.comment.name}</h4>
                </a>
            </div>
            <div>
                <p class="my-1">
                    {props.comment.text}
                </p>
                <p class="post-date">
                    <Moment format="YYYY/MM/DD">{props.comment.date}</Moment>
                </p>
                {!props.auth.loading && props.auth.user._id == props.comment.user && (
                    <button onClick={(e) => props.deleteComment(props.postId, props.comment._id)} type="button" className="btn
                    btn-danger">
                            <i className="fas fa-times"/>
                        </button>
                )}
            </div>
        </div>
        </Fragment>
    )
}

CommentItem.propTypes = {

}

const mapStateToProps = state => ({
    auth: state.auth,
    postId: state.post.post._id
})
export default connect(mapStateToProps, {deleteComment})(CommentItem)
