import { useDispatch } from "react-redux"
import { useModal } from "../../context/Modal"
import { useState } from "react"
import { thunkLoadPostComments, thunkUpdateComment } from "../../redux/comment"

const UpdateCommentModal = ({comment}) => {
    const dispatch = useDispatch()
    const { closeModal } = useModal()
    const [commText, setCommText] = useState(comment.comment)
    // const [errors, setErrors] = useState([])
    const commentId = comment.id
    const postId = comment.postId
    console.log("In Modal Comment", comment)

    const handleSubmit = async (e) => {
        e.preventDefault()
        await dispatch(thunkUpdateComment(commentId, commText)) 
        await dispatch(thunkLoadPostComments(postId))
        closeModal()
    }
    return (
        <div className='updateCommentModal'>
            <h1>Update Your Comment</h1>
            <form onSubmit={handleSubmit} className='commentupdate'>
                <label>
                    <textarea 
                    type='text'
                    value={commText}
                    onChange={(e) => setCommText(e.target.value)}
                    placeholder="Share your thoughts..."
                    maxLength={255}
                    className='upcomminput'
                    />
                </label>
                <button type='submit' disabled={commText.length === 0} className='commentupbutton'>Update Comment</button>
            </form>
        </div>
    )
}

export default UpdateCommentModal