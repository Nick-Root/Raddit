import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { thunkGetAllPosts } from "../../redux/post"
import { thunkGetAllCommunities } from "../../redux/community"
import { NavLink } from "react-router-dom"
import './MainPage.css'
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem"
import CreateCommunityModal from "../CreateCommunity/CreateCommunity"
const MainPage = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    let user = useSelector((state) => state.session.user)
    let statePosts = useSelector((state) => Object.values(state.post))
    let communities = useSelector((state) => Object.values(state.community))

    const [showMenu, setShowMenu] = useState(false);
    const ulRef = useRef()

    useEffect(() => {
        dispatch(thunkGetAllPosts())
        dispatch(thunkGetAllCommunities())
    }, [dispatch])

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

    if (!user || !statePosts || !communities) return null

    const closeMenu = () => setShowMenu(false);


    // let communityArr = Object.values(communities)

    const navToCreatePost = () => {
        navigate(`/posts/new`)
    }

    const openCreateCommunityModal = () => {
        setShowMenu(false);
    }

    let usercheck = false
    if (user) usercheck = true

    return (
        <>
            <div className="mainpage">
                <div className='posts'>
                    <div className='createPostText'>
                        <i className="fas fa-user-circle" />
                        <input
                            type='text'
                        />
                    </div>
                    {statePosts.map((statePost) => {
                        return (
                            <>
                                {statePost && statePost.body && <div className='singlePost' key={statePost.id}>
                                    <NavLink to={`/communities/${statePost?.communityId}`}>{statePost.community && statePost.community?.community} </NavLink>
                                    <NavLink to={`/posts/${statePost.id}`}>
                                        <p>{statePost.title}</p>
                                        <p>{statePost.body}</p>
                                        {statePost.imageUrl && <img src={statePost.imageUrl} className="awsImg"></img>}
                                    </NavLink>
                                </div>}
                            </>
                        )
                    })}
                </div>
                <div className='sideMain'>
                    <h2>Home</h2>
                    <button onClick={navToCreatePost}>
                        Create Post
                    </button>

                    <OpenModalMenuItem
                        itemText='Create Community'
                        onItemClick={openCreateCommunityModal}
                        className='communityModal'
                        modalComponent={<CreateCommunityModal closeModal={closeMenu} />}
                    />
                </div>
            </div>
        </>
    )
}

export default MainPage
