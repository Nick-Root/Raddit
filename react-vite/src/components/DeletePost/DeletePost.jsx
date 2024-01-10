import { useDispatch } from "react-redux"
import { useModal } from "../../context/Modal"
import { useNavigate, useParams } from "react-router-dom"
import { deletePostThunk, thunkGetAllPosts } from "../../redux/post"


const DeletePostModal = () => {
    const { closeModal } = useModal()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { id } = useParams()

    const deletePost = async (e) => {
        e.preventDefault()

        await dispatch(deletePostThunk(id))
        // await dispatch(thunkGetAllPosts())
        navigate('/home')
        closeModal()
    }

    return (
        <div className='deletePostModal'>
            <h1 className='delPost'>Delete This Post?</h1>
            <div className='postDelConfirm'>
                Are you sure you want to delete this post?
                You cannot undo this action.
            </div>
            <button onClick={deletePost}>Delete</button>
            <button onClick={closeModal}>Cancel</button>
        </div>
    )

}

export default DeletePostModal
