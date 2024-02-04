import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { thunkGetAllPosts } from "../../redux/post";
import { thunkGetAllCommunities } from "../../redux/community";
import { NavLink } from "react-router-dom";
import './MainPage.css';
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import CreateCommunityModal from "../CreateCommunity/CreateCommunity";
import { thunkClearCommentsState } from "../../redux/comment";

const MainPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [showMenu, setShowMenu] = useState(false);
    const ulRef = useRef();

    useEffect(() => {
        const fetchData = async () => {
            await dispatch(thunkGetAllPosts());
            await dispatch(thunkGetAllCommunities());
            await dispatch(thunkClearCommentsState())
            setIsLoading(false);
        };

        fetchData();
    }, [dispatch]);

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = (e) => {
            if (ulRef.current && !ulRef.current.contains(e.target)) {
                setShowMenu(false);
            }
        };

        document.addEventListener("click", closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    const closeMenu = () => setShowMenu(false);

    const navToCreatePost = () => {
        navigate(`/posts/new`);
    };

    const openCreateCommunityModal = () => {
        setShowMenu(false);
    };

    const user = useSelector((state) => state.session.user);
    const statePosts = useSelector((state) => Object.values(state.post));
    const communities = useSelector((state) => Object.values(state.community));

    return (
        <>
            <div className="mainpage">
                {isLoading ? (
                    <div className="spinner-container">
                        <div className="spinner"></div>
                    </div>
                ) : (
                    <div className="postCont">
                        <div className='createPostText'>
                            <i className="fas fa-user-circle" id="createPostIcon" />
                            <div className="emptyBox" onClick={navToCreatePost}>
                                <p className='cpostText'>Create Post...</p>
                            </div>
                        </div>
                        <div className='posts'>
                            {statePosts.length === 0 ? (
                                <p>No posts available.</p>
                            ) : (
                                statePosts.map((statePost) => (
                                    <div className='singlePost' key={statePost.id}>
                                        <div className='commPoster'>
                                            <NavLink to={`/communities/${statePost?.communityId}`} className='postComm'><p>c/{statePost.community && statePost.community?.community} </p> </NavLink>
                                            <p className="postedBy">Posted by {statePost && statePost.poster}</p>
                                        </div>
                                        <NavLink to={`/posts/${statePost.id}`}>
                                            <h1 className='postTitle'>{statePost.title}</h1>
                                            <h3 className='postBody'>{statePost.body}</h3>
                                            {statePost.imageUrl && <img src={statePost.imageUrl} className="awsImg" alt="Post Image"></img>}
                                        </NavLink>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                )}
            </div>

            <div className="sideMainWrapper">
                <div className='sideMain'>
                    <div className='sideHome'>
                        <h2>Home</h2>
                        <p className='side1'>Welcome to the home page!</p>
                        <p className="side2">View posts and visit communities that interest you and have some good conversations!</p>
                        <button onClick={navToCreatePost} className='sideCreate'>
                            Create Post
                        </button>

                        <OpenModalMenuItem
                            itemText='Create Community'
                            onItemClick={openCreateCommunityModal}
                            className='communityModal'
                            modalComponent={<CreateCommunityModal closeModal={closeMenu} />}
                        />
                    </div>
                    <div className="devHome">
                        <h2>Dev Team</h2>
                        <div>
                            <i className="fa-brands fa-github" style={{ color: 'white' }}></i> <NavLink to='https://github.com/Nick-Root' className={'github'} style={{ color: 'white' }}>Nick Root</NavLink>
                        </div>
                    </div>
                    <div className='communitiesSide'>
                        <h2>Explore Communities</h2>
                        {isLoading ? (
                            <div className="spinner-container-explore">
                                <div className="spinner"></div>
                            </div>
                        ) : (
                            communities && communities.length === 0 ? (
                                <p>No communities available.</p>
                            ) : (
                                communities && communities.map((community) => (
                                    <div className='communityNav' key={community.id}>
                                        <NavLink className='commlink' to={`/communities/${community.id}`}>c/{community.name}</NavLink>
                                    </div>
                                ))
                            )
                        )}
                    </div>


                </div>
            </div>

        </>
    );
};

export default MainPage;
