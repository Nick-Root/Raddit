import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { createCommunityThunk, thunkGetAllCommunities } from "../../redux/community";
import './CreateCommunity.css'


function CreateCommunityModal() {
    const dispatch = useDispatch()
    const [community, setCommunity] = useState("")
    const [description, setDescription] = useState("")
    const [errors, setErrors] = useState([])
    const { closeModal } = useModal()

    const existingCommunities = useSelector(state => Object.values(state.community) || [])

    useEffect(() => {
        dispatch(thunkGetAllCommunities())
    }, [dispatch])

    const handleSubmit = async (e) => {
        e.preventDefault()

        console.log("existing communities", existingCommunities)
        const isDuplicate = existingCommunities.some(existingCommunity => existingCommunity.name.toLowerCase() === community.toLowerCase());

        if (isDuplicate) {
            setErrors(["Community already exists"]);
            return;
        }
        const serverResponse = await dispatch(
            createCommunityThunk({
                community,
                description
            })
        )
        await dispatch(thunkGetAllCommunities())

        if (serverResponse) {
            setErrors(serverResponse)
        } else {
            closeModal()
        }
    }

    return (
        <div className='communitymodalcont'>
            <h1>Create a Community</h1>
            <form onSubmit={handleSubmit} className='communityform'>
                <label>
                    <input
                        type='text'
                        value={community}
                        onChange={(e) => setCommunity(e.target.value)}
                        required
                        placeholder="Community Name"
                        className='communityName'
                    />
                </label>
                <label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Community Description"
                        className='communityDescription'
                    />
                </label>
                {<p className="error">{errors}</p>}
                <button type='submit' disabled={community.length === 0 && description.length === 0} className='topbutton'>Create Topic</button>
            </form>
        </div>
    )
}

export default CreateCommunityModal
