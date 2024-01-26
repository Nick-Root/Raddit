import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams, NavLink } from "react-router-dom";
import { thunkGetSingleCommunity } from "../../redux/community";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import DeleteCommunityModal from "../DeleteCommunity/DeleteCommunity";
import UpdateCommunityModal from "../UpdateCommunity/UpdateCommunity";
import './ViewCommunity.css';

const ViewCommunity = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { communityId } = useParams();
    const [isLoading, setIsLoading] = useState(true);

    const community = useSelector((state) => state.community);
    const user = useSelector((state) => state.session.user);

    useEffect(() => {
        const fetchData = async () => {
            await dispatch(thunkGetSingleCommunity(communityId));
            setIsLoading(false);
        };

        fetchData();
    }, [dispatch, communityId]);

    if (isLoading || !community) {
        return (
            <div className="spinner-container">
                <div className="spinner"></div>
            </div>
        );
    }

    const statePosts = community[0].posts;
    if (!statePosts) {
        return null;
    }

    let ownercheck = false;
    if (user && user.id === community[0].ownerId) {
        ownercheck = true;
    }

    return (
        <div className="communitypage">
            <div className="postCont">
                <div className="commHeade">
                    <h1 className='communityName1'>{community[0].community}</h1>
                    <h2 className="communityDesc">{community[0].description}</h2>

                    <div className='communityButtons'>
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
                    </div>
                </div>
                {statePosts.map((statePost) => (
                    <div className='singlePost' key={statePost.id}>
                        <div>{statePost.community && statePost.community?.community}</div>
                        <NavLink to={`/posts/${statePost.id}`}>
                            <h1 className='postTitle1'>{statePost.title}</h1>
                            <h3 className='postBody1'>{statePost.body}</h3>
                            {statePost.imageUrl && <img src={statePost.imageUrl} className="awsImg" alt="Post"></img>}
                        </NavLink>
                    </div>
                )).reverse()}
            </div>
        </div>
    );
};

export default ViewCommunity;
