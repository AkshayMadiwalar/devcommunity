import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { addPost } from '../../actions/post'

const PostForm = props => {

    const [text, setText] = useState('')

    const onSubmitData = (e) => {
        e.preventDefault()
        props.addPost({text})
        setText('')
    }
    return (
        <div class="post-form">
            <div class="bg-primary p">
                <h3>Say Something...</h3>
            </div>
            <form class="form my-1" onSubmit={(e)=>onSubmitData(e)}>
                <textarea
                    name="text"
                    cols="30"
                    rows="5"
                    value = {text}
                    onChange = {(e)=>setText(e.target.value)}
                    placeholder="Create a post"
                    required
                ></textarea>
                <input type="submit" class="btn btn-dark my-1" value="Submit" />
            </form>
        </div>
    )
}

PostForm.propTypes = {

}

const mapStateToProps = state => ({

})

export default connect(null, { addPost })(PostForm)
