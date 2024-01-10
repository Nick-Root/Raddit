import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { thunkGetSinglePost } from "../../redux/post"
import { NavLink, useParams } from "react-router-dom"
import { thunkGetAllCommunities, thunkGetSingleCommunity } from "../../redux/community"
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem"
import DeletePostModal from "../DeletePost/DeletePost"


const ViewPost = () => {
    const dispatch = useDispatch()

    const { id } = useParams()
    const postInfo = useSelector((state) => state.post)
    const user = useSelector((state) => state.session.user)
    const community = useSelector((state) => state.community)
    const communityId = postInfo.communityId

    useEffect(() => {
        dispatch(thunkGetSinglePost(id))
        dispatch(thunkGetSingleCommunity(communityId))
    }, [dispatch, id, communityId])

    if (!postInfo || !postInfo.communityId || !user.id || !community) return null;
    console.log("postInfo", postInfo)
    let usercheck = false
    if (user.id === postInfo.ownerId) {
        usercheck = true
    }
    console.log("community", community)
    return (
        <div className='postContainer'>

            <h2> c/{postInfo.community && postInfo.community} </h2>
            <div className='postInfo'>
                <h3>{postInfo.title}</h3>
                <p>{postInfo.body}</p>
                {postInfo.imageUrl && <img src={postInfo.imageUrl} className="awsImg"></img>}
                <div className='deletePost'>
                    {user && usercheck && (
                        <>
                            <OpenModalMenuItem
                                itemText={'Delete'}
                                modalComponent={<DeletePostModal />}
                            />
                            <NavLink to={`/posts/${postInfo.id}/update`}>
                                <button>Update</button>
                            </NavLink>
                        </>
                    )}
                </div>
            </div>
            <div className="communityInfo">
                <h2>c/{postInfo.community}</h2>
                <p>{community[0] && community[0].description}</p>
                <NavLink to={`/communities/${postInfo.communityId}`}>Visit Community</NavLink>
            </div>
        </div>
    )
}

export default ViewPost
