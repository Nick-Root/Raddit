import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { useModal } from "../../context/Modal"
import { thunkGetSingleCommunity, updateCommunityThunk } from "../../redux/community"




const UpdateCommunityModal = () => {
    const { communityId } = useParams()
    const dispatch = useDispatch()
    const [errors, setErrors] = useState([])
    const [community, setCommunity] = useState("")
    const [description, setDescription] = useState("")
    const { closeModal } = useModal()
    const communityById = useSelector((state) => state.community)

    useEffect(() => {
        dispatch(thunkGetSingleCommunity(communityId))
    }, [dispatch, communityId])
    useEffect(() => {
        setDescription(communityById[0].description)
        setCommunity(communityById[0].community)
    }, [communityId])

    const handleSubmit = async (e) => {
        e.preventDefault()

        const serverResponse = await dispatch(
            updateCommunityThunk(communityId, community, description)
        )

        await dispatch(thunkGetSingleCommunity(communityId))

        if (serverResponse) {
            setErrors(serverResponse)
        } else {
            closeModal()
        }
        closeModal()
    }
    console.log("communityById", communityById)
    if (!communityById) return null

    return (
        <div className="updateCommunityModal">
            <h1 className="">Update Your Community</h1>
            <form onSubmit={handleSubmit} className="commupform">
                <label>
                    <input
                        type='text'
                        value={community}
                        onChange={(e) => setCommunity(e.target.value)}
                        required
                        placeholder="Community Name"
                        className="commupname"
                    />
                </label>
                <label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                        placeholder="Community Description"
                        className="commupdesc"
                    />
                </label>
                <button type='submit' disabled={community.length === 0 || description.length === 0} className='commupbutton'>Update Community</button>
            </form>
        </div>
    )

}

export default UpdateCommunityModal
