import { useDispatch } from "react-redux"
import { useModal } from "../../context/Modal"
import { useParams } from "react-router-dom"
import { thunkDeleteComment, thunkLoadPostComments } from "../../redux/comment"
import { thunkGetSinglePost } from "../../redux/post"
import './DeleteComment.css'

const DeleteComment = ({ comment }) => {
    const { closeModal } = useModal()
    const dispatch = useDispatch()
    const { id } = useParams()

    const deleteComment = async (e) => {
        e.preventDefault()
        await dispatch(thunkDeleteComment(comment.id))
        // await dispatch(thunkGetSinglePost())
        await dispatch(thunkLoadPostComments(id))
        closeModal()
    }
    return (
        <>
            <div id='delete_comment_container' className="delcommcont">
                <h2 className='delcomm'>Delete comment?</h2>
                <div className='commconfirm'>Are you sure you want to delete this comment?</div>
                <div className='modal-buttons'>
                    <button onClick={deleteComment} className='commdel'>Delete</button>
                    <button onClick={closeModal}>Cancel</button>
                </div>
            </div>
        </>
    )
}

export default DeleteComment
