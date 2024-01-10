import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { thunkGetSingleCommunity } from "../../redux/community"
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem"
import DeleteCommunityModal from "../DeleteCommunity/DeleteCommunity"


const ViewCommunity = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { communityId } = useParams()
    const community = useSelector((state) => state.community)
    const user = useSelector((state) => state.session.user)

    useEffect(() => {
        dispatch(thunkGetSingleCommunity(communityId))
    }, [dispatch, communityId])

    if (!community) return null
    const statePosts = community[0].posts
    if (!statePosts) return null
    if (!user) return null

    console.log("statePosts", statePosts)
    let ownercheck = false
    if (user.id === community[0].ownerId) {
        ownercheck = true
    }


    return (
        <div className="communityPage">
            <h1 className='communityName'>{community[0].community}</h1>
            <h2 className="communityDesc">{community[0].description}</h2>
            <div className='deleteCommunity'>
                {user && ownercheck && (
                    <>
                        <OpenModalMenuItem
                            itemText={'Delete'}
                            modalComponent={<DeleteCommunityModal />}
                        />
                    </>
                )}
            </div>
            {statePosts.map((statePost) => {
                return (
                    <div className='singlePost' key={statePost.id}>
                        <div>{statePost.community && statePost.community?.community} </div>
                        <div>
                            <p>{statePost.title}</p>
                            <p>{statePost.body}</p>
                            {statePost.imageUrl && <img src={statePost.imageUrl} className="awsImg"></img>}
                        </div>
                    </div>
                )
            })}
        </div>

    )

}

export default ViewCommunity