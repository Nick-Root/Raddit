import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { thunkGetSinglePost } from "../../redux/post";
import { NavLink, useParams } from "react-router-dom";
import { thunkGetSingleCommunity } from "../../redux/community";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import DeletePostModal from "../DeletePost/DeletePost";
import './ViewPost.css';
import { thunkLoadPostComments, thunkPostComment } from "../../redux/comment";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import DeleteComment from "../DeleteComment/DeleteComment";
import UpdateCommentModal from "../UpdateComment/UpdateCommentModal";

const ViewPost = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [comment, setComment] = useState("")
    const postInfo = useSelector((state) => state.post);
    const user = useSelector((state) => state.session.user);
    const community = useSelector((state) => state.community);
    const comments = useSelector((state) => Object.values(state.comment))
    const communityId = postInfo.communityId;



    useEffect(() => {
        const fetchData = async () => {
            await dispatch(thunkGetSinglePost(id));
            await dispatch(thunkGetSingleCommunity(communityId));
            await dispatch(thunkLoadPostComments(id))
            setIsLoading(false);
        };

        fetchData();
    }, [dispatch, id, communityId]);

    const handleSubmit = async (e) => {
        e.preventDefault()
        const commentInfo = {
            comment: comment
        }
        await dispatch(thunkPostComment(id, commentInfo))
        await dispatch(thunkLoadPostComments(id))
        setComment("")
    }

    if (isLoading || !postInfo || !postInfo.communityId || !user.id || !community) {
        return (
            <div className="spinner-container">
                <div className="spinner"></div>
            </div>
        );
    }

    let usercheck = false;
    if (user.id === postInfo.ownerId) {
        usercheck = true;
    }
    console.log("COMMENTS", comments)

    return (
        <div className='postpage'>
            <div className='postCont'>
                <div className='singlePost'>
                    <div className="commPoster">
                        <NavLink to={`/communities/${postInfo?.communityId}`} className='postComm'>
                            <p>c/{postInfo.community && postInfo.community} </p>
                        </NavLink>
                        <p className="postedBy">Posted by {postInfo && postInfo.poster}</p>
                    </div>
                    <h1 className="postTitle">{postInfo.title}</h1>
                    <h3 className='postBody'>{postInfo.body}</h3>
                    {postInfo.imageUrl && <img src={postInfo.imageUrl} className="awsImg" alt="Post"></img>}
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
                <div className="comments">
                    <div className='postcommbutton'>
                        <form onSubmit={handleSubmit} className="commform">
                            <input
                                type='text'
                                name='comment'
                                placeholder="Share your thoughts..."
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                maxLength={255}
                                className="comminput"
                            />
                            <button type='submit' disabled={comment.length === 0} className="submitcomm">
                                Post Comment
                            </button>
                        </form>
                    </div>
                    <div className='commentcont'>
                    {comments.map((comment) => {
                        return (
                            <div className="comment" key={comment.id}>
                                <div className="commheader">
                                  <p>{comment.owner}</p>  
                                  <p>{comment.createdAt}</p> 
                                  </div>
                                <div className="bottomcomm"> 
                                <p className="commentText">{comment.comment}</p>
                                <div className='commentbuttons'>
                                {user && user.id === comment.ownerId && <OpenModalButton 
                                buttonText={<><i className="fa-solid fa-pen-to-square"></i>Update</>}
                                modalComponent={<UpdateCommentModal comment={comment} />}
                                className='updatecomment' />}
                                {user && user.id === comment.ownerId && <OpenModalButton
                                    buttonText={<><i className="fa-solid fa-trash-can"></i> Delete</>} modalComponent={<DeleteComment comment={comment} />}
                                    className='deletecomment'
                                    />}
                                    </div>
                                </div>
                            </div>
                        )
                    }).reverse()}
                    </div>
                </div>
                            </div>
            <div className="communityInfo">
                <h2>c/{postInfo.community}</h2>
                <p className='side2'>{community[0] && community[0].description}</p>
                <NavLink to={`/communities/${postInfo.communityId}`}>
                    <p className='visitComm'>Visit Community</p>
                </NavLink>
            </div>
        </div>
    );
};

export default ViewPost;
