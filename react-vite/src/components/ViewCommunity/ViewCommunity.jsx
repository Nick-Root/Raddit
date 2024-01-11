import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams, NavLink } from "react-router-dom"
import { thunkGetSingleCommunity } from "../../redux/community"
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem"
import DeleteCommunityModal from "../DeleteCommunity/DeleteCommunity"
import UpdateCommunityModal from "../UpdateCommunity/UpdateCommunity"
import './ViewCommunity.css'

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
        <div className="communitypage">
            <div className="postCont">

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
                <div className="updateCommunity">
                    {user && ownercheck && (
                        <>
                            <OpenModalMenuItem
                                itemText={'Update'}
                                modalComponent={<UpdateCommunityModal />}
                            />
                        </>
                    )}
                </div>
                {statePosts.map((statePost) => {
                    return (
                        <div className='singlePost' key={statePost.id}>
                            <div>{statePost.community && statePost.community?.community} </div>
                            <NavLink to={`/posts/${statePost.id}`}>
                                <h1 className='postTitle1'>{statePost.title}</h1>
                                <h3 className='postBody1'>{statePost.body}</h3>
                                {statePost.imageUrl && <img src={statePost.imageUrl} className="awsImg"></img>}
                            </NavLink>
                        </div>
                    )
                }).reverse()}
            </div>

        </div>
    )

}

export default ViewCommunity
