import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { thunkGetSinglePost } from "../../redux/post"
import { NavLink, useParams } from "react-router-dom"
import { thunkGetAllCommunities, thunkGetSingleCommunity } from "../../redux/community"
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem"
import DeletePostModal from "../DeletePost/DeletePost"
import './ViewPost.css'

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
        <div className='postpage'>

            <div className='postCont'>

                <div className='singlePost'>
                    <div className="commPoster">
                        <NavLink to={`/communities/${postInfo?.communityId}`} className='postComm'><p>c/{postInfo.community && postInfo.community} </p> </NavLink>
                        <p className="postedBy">Posted by {postInfo && postInfo.poster}</p>
                    </div>

                    <h1 className="postTitle">{postInfo.title}</h1>
                    <h3 className='postBody'>{postInfo.body}</h3>
                    {postInfo.imageUrl && <img src={postInfo.imageUrl} className="awsImg"></img>}
                    <div className='deletePost'>
                        {user && usercheck && (
                            <div className='postButtons'>
                                <NavLink to={`/posts/${postInfo.id}/update`}>
                                    <button>Update</button>
                                </NavLink>
                                <OpenModalMenuItem
                                    itemText={'Delete'}
                                    className='deletePostModal'
                                    modalComponent={<DeletePostModal />}
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div className="communityInfo">
                <h2>c/{postInfo.community}</h2>
                <p className='side2'>{community[0] && community[0].description}</p>
                <NavLink to={`/communities/${postInfo.communityId}`}><p className='visitComm'>Visit Community</p></NavLink>
            </div>
        </div>
    )
}

export default ViewPost
