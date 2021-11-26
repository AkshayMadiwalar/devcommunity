import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { addComment } from '../../actions/post'


const CommentForm = props => {
    const [text,setComment] = useState('')

    const onSubmitData = (e) => {
        e.preventDefault()
        props.addComment(props.post._id,{text})
    }
    return (
        <div class="post-form">
            <div class="bg-primary p">
                <h3>Leave A Comment</h3>
            </div>
            <form class="form my-1" onSubmit={(e)=>onSubmitData(e)}>
                <textarea
                    name="text"
                    cols="30"
                    rows="5"
                    value={text}
                    onChange= {(e)=>setComment(e.target.value)}
                    placeholder="Comment on this post"
                    required
                ></textarea>
                <input type="submit" class="btn btn-dark my-1" value="Submit" />
            </form>
        </div>
    )
}

CommentForm.propTypes = {

}

export default connect(null, { addComment })(CommentForm)
