import { useDispatch } from "react-redux"
import { useModal } from "../../context/Modal"
import { useNavigate, useParams } from "react-router-dom"
import { deleteCommunityThunk, thunkGetAllCommunities } from "../../redux/community"
import './DeleteCommunity.css'

const DeleteCommunityModal = () => {
    const { closeModal } = useModal()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { communityId } = useParams()


    const deleteCommunity = async (e) => {
        e.preventDefault()

        await dispatch(deleteCommunityThunk(communityId))
        navigate('/home')
        await dispatch(thunkGetAllCommunities())

        closeModal()

    }

    return (
        <div className='deleteCommunityModal'>
            <h2 className='delCommunity'>Delete This Community?</h2>
            <div className="confirmCommunityDel">
                Are you sure you want to delete this community?
                All associated comments and posts will subsequently be deleted.
                You cannot undo this action.
            </div>
            <button onClick={deleteCommunity} className='commdel'>Delete</button>
            <button onClick={closeModal} className="commcancel">Cancel</button>
        </div>
    )

}

export default DeleteCommunityModal
